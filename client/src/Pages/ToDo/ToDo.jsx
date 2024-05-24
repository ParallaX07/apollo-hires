import { useContext, useEffect, useState } from "react";
import Loader from "../../components/FunctionalComponents/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Auth/AuthProvider";
import "./ToDo.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { MessageContext } from "../Root";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const ToDo = () => {
    const [todos, setTodos] = useState([]);
    const { user, loading } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const {notifySuccess, notifyError} = useContext(MessageContext);
    const axiosSecure = useAxiosSecure();

    useDocumentTitle("Pending Services | ");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            setIsLoading(true);
            Promise.all([
                axiosSecure.get(`/bookings?serviceStatus=pending&providerEmail=${user?.email}`),
                axiosSecure.get(`/bookings?serviceStatus=working&providerEmail=${user?.email}`),
            ])
                .then(([pendingRes, workingRes]) => {
                    setTodos([...pendingRes.data, ...workingRes.data]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
                
        }
    }, [user]);

    const handleStatusChange = (bookingId, newStatus) => {
        // Handle status change logic here, e.g., make an API call to update the status
        axiosSecure.put(`/bookings/${bookingId}`, { serviceStatus: newStatus }).then(() => {
            notifySuccess("Status updated successfully");
            if(newStatus === "completed"){
                setTodos((prevTodos) => {
                    return prevTodos.filter((todo) => todo._id !== bookingId);
                });
                return;
            }
            setTodos((prevTodos) => {
                return prevTodos.map((todo) => {
                    if (todo._id === bookingId) {
                        return { ...todo, serviceStatus: newStatus };
                    }
                    return todo;
                });
            });

        })
        .catch((error) => {
            console.error(error);
            notifyError("Status update failed");
        }
        );
    };

    if (todos.length === 0) {
        return (
            <section className="bg-white dark:bg-primary h-dvh flex flex-col justify-center items-center py-20 transition duration-300 gap-3">
                <h2 className="text-3xl text-center dark:text-gray-100 mt-4 font-bold">
                    <Typewriter
                        words={["No Pending Services Found!"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
                <Link
                    to="/"
                    className="bg-primary text-white dark:text-gray-100 dark:bg-primary py-2 px-4 rounded-lg"
                >
                    Go Back to Home
                </Link>
            </section>
        );
    }

    return isLoading || loading ? (
        <Loader />
    ) : (
        <section className="bg-white dark:bg-primary lg:mx-auto lg:max-w-6xl mx-3 py-20 transition duration-300">
            <h2 className="text-3xl font-semibold text-center dark:text-gray-100 mt-4">
                To Do / Pending Services
            </h2>
            {/* table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-8  rounded-lg border-2 border-primary dark:border-gray-100 ">
                    <thead className="hidden lg:table-header-group  rounded-lg">
                        <tr className="text-base font-semibold text-left border-b-2 border-primary dark:border-gray-100 dark:text-gray-100">
                            <th className="p-2">Image</th>
                            <th className="p-2">Customer Name</th>
                            <th className="p-2">Customer Email</th>
                            <th className="p-2">Service Name</th>
                            <th className="p-2">Appointment Date</th>
                            <th className="p-2">Appointment Time</th>
                            <th className="p-2">Special Instructions</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((booking) => (
                            <tr
                                key={booking?._id}
                                className="block lg:table-row border-b-2 border-primary dark:border-gray-100 dark:text-gray-100 py-4"
                            >
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label=""
                                >
                                    <img
                                        src={booking?.serviceImage}
                                        alt={booking?.serviceName}
                                        className="lg:w-20 lg:h-20 object-cover rounded-lg"
                                    />
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Customer Name"
                                >
                                    {booking?.customerName}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Customer Email"
                                >
                                    {booking?.customerEmail}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Service Name"
                                >
                                    {booking?.serviceName}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Appointment Date"
                                >
                                    {booking?.appointmentDate}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Appointment Time"
                                >
                                    {booking?.appointmentTime}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static capitalize"
                                    data-label="Special Instructions"
                                >
                                    {booking?.specialInstructions}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static capitalize"
                                    data-label="Status"
                                >
                                    {booking?.serviceStatus}
                                </td>
                                <td
                                    className="p-2 block lg:table-cell relative lg:static"
                                    data-label="Status"
                                >
                                    {/* pending (default) , working, completed dropdown*/}
                                    <select
                                        className="w-full lg:w-auto p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
                                        value={booking?.status}
                                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="working">Working</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ToDo;
