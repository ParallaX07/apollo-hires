const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: [
            "https://apollo-hires.web.app",
            "https://apollo-hires.firebaseapp.com",
        ],
        credentials: true,
    })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apollohires.hp89wlm.mongodb.net/?retryWrites=true&w=majority&appName=ApolloHires`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});


async function run() {
    try {
        const services = client.db("ApolloHires").collection("services");
        const bookings = client.db("ApolloHires").collection("bookings");
        const testimonials = client.db("ApolloHires").collection("testimonials");
        const faqs = client.db("ApolloHires").collection("faqs");

        //get number of documents in services collection
        app.get("/servicesCount", async (req, res) => {
            const count = await services.estimatedDocumentCount();
            res.send({ count });
        });

        //get services that roughly match name
        app.get("/services/search", async (req, res) => {
            const name = req.query.name;
            const result = await services
                .find({ name: { $regex: name, $options: "i" } })
                .limit(8)
                .toArray();
            res.send(result);
        });

        //get all services
        app.get("/services", async (req, res) => {
            const page = parseInt(req.query._page);
            const size = parseInt(req.query._limit);

            console.log("pagination query", page, size);
            const result = await services
                .find()
                .skip(page * size)
                .limit(size)
                .toArray();
            res.send(result);
        });

        //get service by id
        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await services.findOne(query);
            res.send(result);
        });

        //get services by user email
        app.get("/services/user/:email", async (req, res) => {
            const providerEmail = req.params.email;
            const result = await services.find({ providerEmail }).toArray();
            res.send(result);
        });

        //get booked services by email
        app.get("/bookings/user/:email", async (req, res) => {
            const customerEmail = req.params.email;
            const result = await bookings.find({ customerEmail }).toArray();
            // find the service from the id in result
            const allBookedservices = await services
                .find({
                    _id: {
                        $in: result.map((r) =>
                            ObjectId.createFromHexString(r.serviceId)
                        ),
                    },
                })
                .toArray();

            // Create a map of services for easier lookup
            const serviceMap = allBookedservices.reduce((acc, service) => {
                acc[service._id] = service;
                return acc;
            }, {});

            // Merge bookings with their respective service details
            const bookingsWithServiceInfo = result.map((booking) => {
                const service = serviceMap[booking.serviceId];
                return {
                    ...booking,
                    serviceName: service.name,
                    serviceImage: service.image,
                    servicePrice: service.price,
                };
            });
            res.send(bookingsWithServiceInfo);
        });

        //randomly get 6 services
        app.get("/randItems", async (req, res) => {
            try {
                const randomItems = services.aggregate([{ $sample: { size: 6 } }])
                res.send(await randomItems.toArray());
            } catch (error) {
                console.error(error);
            }
        });

        //get testimonials
        app.get("/testimonials", async (req, res) => {
            const result = await testimonials.find().toArray();
            res.send(result);
        });

        //get faqs
        app.get("/faqs", async (req, res) => {
            const result = await faqs.find().toArray();
            res.send(result);
        });

        //get pending bookings by user email and 
        app.get("/bookings", async (req, res) => {
            const query = req.query;
            const userBookings = await bookings.find(query).toArray();
            const serviceIds = userBookings.map(booking => ObjectId.createFromHexString(booking.serviceId));
            const servicesForBookings = await services.find({ _id: { $in: serviceIds } }).toArray();
            //create new object with service name and service image
            const bookingsWithServiceInfo = userBookings.map(booking => {
                const service = servicesForBookings.find(service => service._id.toString() === booking.serviceId);
                return {
                    ...booking,
                    serviceName: service.name,
                    serviceImage: service.image,
                };
            });
            res.send(bookingsWithServiceInfo);
        });

        //add services, only by logged in user
        app.post("/services", async (req, res) => {
            const service = req.body;
            const result = await services.insertOne(service);
            res.send(result);
        });

        //add booking
        app.post("/bookings", async (req, res) => {
            const booking = req.body;
            const result = await bookings.insertOne(booking);
            res.send(result);
        });

        //update booking status
        app.put("/bookings/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const update = { $set: req.body };
            const result = await bookings.updateOne(query, update);
            res.send(result);
        });

        //update service by id, only by logged in user
        app.put("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const update = { $set: req.body };
            const result = await services.updateOne(query, update);
            res.send(result);
        });

        //delete service by id, only by logged in user
        app.delete("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await services.deleteOne(query);
            res.send(result);
        });

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Apollo Hire is running");
});

app.listen(port, () => {
    console.log(`Apollo Hire Server is running on port ${port}`);
});
