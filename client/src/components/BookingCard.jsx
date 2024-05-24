import PropTypes from "prop-types";
import { Link } from "react-router-dom";



const BookingCard = ({ booking }) => {
    const {
        serviceId,
        serviceName,
        serviceImage,
        servicePrice,
        customerName,
        customerEmail,
        providerEmail,
        providerName,
        appointmentDate,
        appointmentTime,
        specialInstructions,
        serviceStatus,
    } = booking;

    const serviceStatusClass = (serviceStatus) => {
        if (serviceStatus === "pending") {
            return "bg-red-500 text-red-500";
        }

        if (serviceStatus === "working") {
            return "bg-yellow-500 text-yellow-500";
        }

        if (serviceStatus === "completed") {
            return "bg-green-500 text-green-500";
        }
    }


    return (
        <div className="bg-white dark:bg-primary border border-gray-100 dark:text-gray-100 transition duration-300 shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
            <img
                src={serviceImage}
                className="lg:w-52 object-cover object-center w-fit"
            />
            <div className="p-3">
                <h2 className="text-2xl font-bold">{serviceName}</h2>
                <div>
                    <p className="text-primary dark:text-gray-100  font-semibold">
                        Appointment Information
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Appointment Date: {appointmentDate}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Appointment Time: {appointmentTime}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Special Instructions: {specialInstructions}
                    </p>
                </div>
                <div className="py-4 grid lg:grid-cols-2 grid-cols-1 gap-3">
                    <div>
                        <p className="text-primary dark:text-gray-100   font-semibold">
                            Customer Information
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Name: {customerName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Email: {customerEmail}
                        </p>
                    </div>
                    <div>
                        <p className="text-primary dark:text-gray-100   font-semibold">
                            Provider Information
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Name: {providerName}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Email: {providerEmail}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-primary dark:text-gray-100   font-semibold">
                        Service Information
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                        Price: {servicePrice}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 flex gap-2 items-center font-bold">
                        Status: <span className={`${serviceStatusClass(serviceStatus)} bg-opacity-15 px-3 py-2 rounded-full font-semibold capitalize`}>{serviceStatus}</span>
                    </p>
                </div>
                <Link to={`/services/${serviceId}`}>
                    <button className=" mt-4 bg-primary text-white dark:text-primary dark:bg-gray-100 py-2 px-4 rounded-lg">
                        View Service Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

BookingCard.propTypes = {
    booking: PropTypes.object.isRequired,
};

export default BookingCard;
