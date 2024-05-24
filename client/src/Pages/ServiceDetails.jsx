import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import Loader from "./../components/FunctionalComponents/Loader";

const ServiceDetails = () => {
    const id = useParams().id;
    console.log(id);

    const [service, setService] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        axiosSecure
            .get(`/services/${id}`)
            .then((res) => {
                setService(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <section className="bg-white pt-28 pb-10 mx-3 dark:bg-primary lg:px-20 lg:mx-auto transition duration-300">
            <div className="flex lg:flex-row flex-col justify-between gap-10">
                <img
                    src={service?.image}
                    className="w-full lg:max-w-[calc(100dvw/2)] lg:max-h-dvh object-cover object-center lg:rounded-none rounded-lg"
                />

                <div className="flex flex-col justify-center">
                    <h3 className="lg:text-6xl text-3xl font-extrabold mb-2 dark:text-gray-100">
                        {service?.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {service?.description}
                    </p>
                    <div className="mt-4 flex gap-5 flex-col lg:flex-row">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400  font-bold">
                                {service?.provider}
                            </p>
                            <p className="text-gray-400 dark:text-gray-300 flex items-center gap-3">
                                <FaLocationArrow />
                                {service?.area}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-primary dark:text-gray-300 flex items-center gap-3 font-semibold text-lg">
                            <IoPricetagsSharp />
                            {service?.price}
                        </p>
                    </div>
                    <Link
                        to={`/booking-confirmation/${id}`}
                        className="py-2 px-4 rounded-lg w-full bg-primary dark:bg-gray-50 dark:text-primary text-gray-50 text-center mt-10"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
