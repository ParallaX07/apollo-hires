import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./HighestRated.css";

const HighestRatedCard = ({ item }) => {
    return (
        <div className="max-h-[500px] button-container transition duration-300 rounded-2xl dark:border-gray-100 border-4  border-primary">
            <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="object-cover -z-10"
            />
            <div style={{ zIndex: 2 }}>
                <p className="lg:text-xl text-center w-full font-bold text-gray-100">
                    {item.name}
                </p>
                <Link to={`/services/${item._id}`}>
                    <button className="px-7 py-2 hover:bg-accent rounded-lg bg-primary bg-secondary border-2 border-white text-gray-100 font-bold">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

HighestRatedCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default HighestRatedCard;
