import useDocumentTitle from "../hooks/useDocumentTitle";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "./Root";
import { AuthContext } from "../Auth/AuthProvider";
import Loader from "../components/FunctionalComponents/Loader";
import { Typewriter } from "react-simple-typewriter";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddServices = () => {
    useDocumentTitle("Add Service | Apollo Hires");

    const { user } = useContext(AuthContext);
    const { notifyError, notifySuccess } = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleAddService = (e) => {
        e.preventDefault(); 
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const area = formData.get("area");
        const price = formData.get("price");
        const image = formData.get("image");
        const category = formData.get("category");
        const description = formData.get("description");
        const provider = user?.displayName;
        const providerImage = user?.photoURL;
        const providerEmail = user?.email;

        const service = {
            name,
            area,
            price,
            image,
            category,
            description,
            provider,
            providerImage,
            providerEmail,
        };

        setIsLoading(true);
        
        axiosSecure.post("/services", service)
        .then(() => {
            notifySuccess("Service added successfully");
            setIsLoading(false);
        })
        .catch((err) => {
            notifyError("Failed to add service");
            setIsLoading(false);
            console.log(err);
        })
        .finally(() => {
            e.target.reset();
            setIsLoading(false);
        });

        
    };

    return (
        <section className="min-h-dvh py-16 lg:mt-0 flex flex-col justify-center items-center mx-3">
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full bg-accent dark:bg-dark-brown bg-opacity-70 flex justify-center items-center z-50">
                    {<Loader />}
                </div>
            )}
            <h1 className="transition duration-300 text-3xl text-center py-10 font-bold dark:text-gray-100">
                List a{" "}
                <span className="underline underline-offset-4">
                    <Typewriter
                        words={[
                            "Litigation and Dispute Resolution Service",
                            "Corporate and Commercial Law Service",
                            "Real Estate Law Service",
                            "Intellectual Property Law Service",
                            "Family law Service",
                            "Estate Planning and Probate Service",
                            "Service",
                        ]}
                        loop={1}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
            <form
                onSubmit={handleAddService}
                className=" lg:mx-64 md:mx-20 p-10 border border-gray-300 rounded dark:bg-primary dark:border-gray-700 dark:text-primary"
            >
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Area
                        </label>
                        <input
                            type="text"
                            name="area"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Image
                        </label>
                        <input
                            type="text"
                            name="image"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Category
                        </label>
                        {/* circular selection option */}
                        <select
                            name="category"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-primary dark:text-gray-100"
                        >
                            <option value="">Select a category</option>
                            <option value="Litigation and Dispute Resolution">
                                Litigation and Dispute Resolution
                            </option>
                            <option value="Corporate and Commercial Law">
                                Corporate and Commercial Law
                            </option>
                            <option value="Real Estate Law">Real Estate Law</option>
                            <option value="Intellectual Property Law">
                                Intellectual Property Law
                            </option>
                            <option value="Family Law">Family Law</option>
                            <option value="Estate Planning and Probate">
                                Estate Planning and Probate
                            </option>
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Description
                        </label>
                        <textarea
                            name="description"
                            required
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white rounded-lg px-4 py-2 mt-4 w-full dark:bg-gray-100 dark:text-primary transition duration-300 hover:bg-gray-50 hover:text-primary font-bold"
                >
                    Add Service
                </button>
            </form>
        </section>
    );
};

export default AddServices;
