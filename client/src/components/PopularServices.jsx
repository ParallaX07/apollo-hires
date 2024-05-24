import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import PropTypes from "prop-types";

const PopularServices = ({ service }) => {
    return (
        <div className="bg-white pb-5 dark:bg-primary border border-gray-100 dark:text-gray-100 transition duration-300 shadow-lg rounded-lg overflow-hidden flex flex-col ">
            <img
                src={service.image}
                className=" object-cover object-center max-h-52"
            />
            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    {service.description.length > 100
                        ? `${service.description.substring(0, 99)}...`
                        : service.description}
                </p>
                <div className="mt-4 flex gap-5 flex-col ">
                    <div className="flex items-center gap-3">
                        <img
                            className="size-12 rounded-full"
                            src={service?.providerImage}
                            alt=""
                        />
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
                </div>
                <div>
                    <p className="text-primary dark:text-gray-300 flex items-center gap-3 font-semibold text-lg">
                        <IoPricetagsSharp />
                        {service?.price}
                    </p>
                </div>
            </div>
            <button className="mx-3">
                <Link
                    to={`/services/${service._id}`}
                    className="block py-2 px-4 rounded-lg bg-primary dark:bg-gray-50 dark:text-primary text-gray-50 text-center"
                >
                    View Details
                </Link>
            </button>
        </div>
    );
};

PopularServices.propTypes = {
    service: PropTypes.object.isRequired,
};

export default PopularServices;
