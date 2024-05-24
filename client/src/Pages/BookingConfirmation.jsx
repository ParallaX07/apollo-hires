import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MessageContext } from "./Root";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/FunctionalComponents/Loader";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { AuthContext } from "../Auth/AuthProvider";

const BookingConfirmation = () => {
    useDocumentTitle("Confirm Booking | Apollo Hires");
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const { notifyError, notifySuccess } = useContext(MessageContext);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        axiosSecure
            .get(`/services/${id}`)
            .then((res) => {
                setService(res.data);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleBooking = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const appointmentDate = formData.get("appointmentDate");
        const appointmentTime = formData.get("appointmentTime");
        const specialInstructions = formData.get("specialInstructions");
        const customerName = user?.displayName;
        const customerEmail = user?.email;
        const providerName = service?.provider;
        const providerEmail = service?.providerEmail;
        const serviceId = service?._id;
        const serviceStatus = "pending";

        const booking = {
            appointmentDate,
            appointmentTime,
            specialInstructions,
            customerName,
            customerEmail,
            providerName,
            providerEmail,
            serviceId,
            serviceStatus,
        };
        
        setLoading(true);
        axiosSecure
            .post("/bookings", booking)
            .then(() => {
                notifySuccess("Booking confirmed successfully");
                setLoading(false);
                e.target.reset();
                navigate("/allservices");
            })
            .catch((err) => {
                notifyError("Failed to confirm booking");
                console.log(err);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <section className="bg-white dark:bg-primary w-full mx-auto py-12 md:py-16 lg:py-20 transition duration-300">
            {loading && <Loader />}
            <h1 className="text-2xl text-center pt-10 dark:text-gray-100 font-bold mb-6">
                Confirm Booking for{" "}
                <span className="underline-offset-4 underline">
                    {service?.name}
                </span>
            </h1>
            <div className="flex lg:flex-row flex-col lg:mx-5 mx-3 gap-4 min-h-dvh">
                <img
                    src={service?.image}
                    className="lg:max-w-[50%] object-contain object-center"
                />
                <form
                    onSubmit={handleBooking}
                    className=" p-10 border border-gray-300 rounded dark:bg-primary dark:border-gray-700 dark:text-primary"
                >
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                        <h2 className="lg:col-span-2 dark:text-gray-100 text-center font-bold text-2xl underline underline-offset-4">
                            Service Information
                        </h2>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Service ID
                            </label>
                            <input
                                type="text"
                                name="name"
                                disabled
                                placeholder={service?._id}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 hover:cursor-not-allowed opacity-80"
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                disabled
                                placeholder={service?.name}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 hover:cursor-not-allowed opacity-80"
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Area
                            </label>
                            <input
                                type="text"
                                name="area"
                                disabled
                                placeholder={service?.area}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 hover:cursor-not-allowed opacity-80"
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Price
                            </label>
                            <input
                                type="text"
                                name="price"
                                disabled
                                placeholder={service?.price}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 hover:cursor-not-allowed opacity-80"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Category
                            </label>
                            <input
                                type="text"
                                name="price"
                                disabled
                                placeholder={service?.category}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 hover:cursor-not-allowed opacity-80"
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Description
                            </label>
                            <textarea
                                name="description"
                                disabled
                                placeholder={service?.description}
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100 cursor-not-allowed opacity-80"
                            ></textarea>
                        </div>
                        {/* disabled customer fields */}
                        <h2 className="lg:col-span-2 dark:text-gray-100 text-center font-bold text-2xl underline underline-offset-4">
                            Customer Information
                        </h2>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                name="provider"
                                placeholder={user?.displayName}
                                className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100 opacity-80"
                                disabled
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Customer Email
                            </label>
                            <input
                                type="text"
                                name="provider"
                                placeholder={user?.email}
                                className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100 opacity-80"
                                disabled
                            />
                        </div>
                                                {/* appointment date */}
                                                <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Appointment Date
                            </label>
                            <input
                                type="date"
                                name="appointmentDate"
                                required
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Appointment Time
                            </label>
                            <input
                                type="time"
                                name="appointmentTime"
                                required
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Special Instructions
                            </label>
                            <textarea
                                type="text"
                                name="specialInstructions"
                                placeholder="Any special instructions for the provider? (if any)"
                                className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                            />
                        </div>
                        <h2 className="lg:col-span-2 dark:text-gray-100 text-center font-bold text-2xl underline underline-offset-4">
                            Provider Information
                        </h2>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Provider Name
                            </label>
                            <input
                                type="text"
                                name="provider"
                                placeholder={service?.provider}
                                className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100 opacity-80"
                                disabled
                            />
                        </div>
                        <div>
                            <label className=" text-xl font-bold dark:text-gray-100">
                                Provider Email
                            </label>
                            <input
                                type="text"
                                name="provider"
                                placeholder={service?.providerEmail}
                                className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100 opacity-80"
                                disabled
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white rounded-lg px-4 py-2 mt-4 w-full dark:bg-gray-100 dark:text-primary transition duration-300 hover:bg-gray-50 hover:text-primary font-bold"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </section>
    );
};

export default BookingConfirmation;
