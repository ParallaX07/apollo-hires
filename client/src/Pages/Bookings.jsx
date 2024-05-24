import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import Loader from "../components/FunctionalComponents/Loader";
import BookingCard from "../components/BookingCard";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useDocumentTitle("My Bookings | Apollo Hires");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            setLoading(true);
            axiosSecure
                .get(`/bookings/user/${user?.email}`)
                .then((response) => {
                    console.log(response.data);
                    setBookings(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    if (bookings.length === 0) {
        return loading ? (
            <Loader />
        ) : (
            <section className="bg-white dark:bg-primary h-dvh flex flex-col justify-center items-center py-20 transition duration-300 gap-3">
                <h2 className="text-3xl text-center dark:text-gray-100 mt-4 font-bold">
                    <Typewriter
                        words={["No Bookings Found!"]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
                <Link
                    to="/allservices"
                    className="bg-primary text-white dark:text-gray-100 dark:bg-primary py-2 px-4 rounded-lg"
                >
                    Book a service
                </Link>
            </section>
        );
    }

    return loading ? (
        <Loader />
    ) : (
        <section className="bg-white dark:bg-primary lg:mx-auto lg:max-w-4xl mx-3 py-20 transition duration-300">
            <h2 className="text-3xl font-semibold text-center dark:text-gray-100 mt-4">
                My Bookings
            </h2>
            <div className="flex flex-col gap-5 mt-8">
                {bookings.map((booking) => (
                    <BookingCard key={booking._id} booking={booking} />
                ))}
            </div>
        </section>
    );
};

export default Bookings;
