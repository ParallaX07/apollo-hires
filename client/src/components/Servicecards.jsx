import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Servicecards = ({ service, email, handleDelete }) => {

    return (
        <div className="bg-white dark:bg-primary border border-gray-100 dark:text-gray-100 transition duration-300 shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
            <img
                src={service.image}
                className="lg:w-52 object-cover object-center"
            />
            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    {service.description.length > 100
                        ? `${service.description.substring(0, 99)}...`
                        : service.description}
                </p>
                <div className="mt-4 flex gap-5 flex-col lg:flex-row">
                    <button>
                        <Link
                            to={`/services/${service._id}`}
                            className="py-2 px-4 rounded-lg w-full bg-primary dark:bg-gray-50 dark:text-primary text-gray-50 text-center"
                        >
                            View Details
                        </Link>
                    </button>
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
                {email && email === service?.providerEmail ? (
                    <div className="flex gap-4 lg:flex-row flex-col">
                        <Link
                            to={`/service/edit/${service._id}`}
                            className="py-2 px-4 rounded-lg w-full bg-primary dark:bg-gray-50 dark:text-primary text-gray-50 text-center"
                        >
                            Edit
                        </Link>
                        <button className="py-2 px-4 rounded-lg w-full bg-primary dark:bg-gray-50 dark:text-primary text-gray-50 text-center" 
                        onClick={() => handleDelete(service?._id)}>
                            Delete
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

Servicecards.propTypes = {
    service: PropTypes.object.isRequired,
    email: PropTypes.string,
    handleDelete: PropTypes.func,
};

export default Servicecards;
