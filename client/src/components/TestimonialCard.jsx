import { FaQuoteLeft } from "react-icons/fa";
import PropTypes from "prop-types";

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-gray-100 dark:bg-primary flex flex-col justify-center rounded-3xl shadow-lg p-3 border-2 dark:text-gray-100 border-gray-100 max-w-[310px] lg:max-w-96 mx-12 lg:h-[300px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="imageContainer">
                        <img
                            width="100%"
                            height="100%"
                            style={{ borderRadius: "70%" }}
                            src={
                                testimonial?.userImage ||
                                "https://i.ibb.co/hYbbGyR/6596121-modified.png"
                            }
                            className=" size-20 object-cover rounded-full"
                            alt="krittibas"
                        />
                    </div>
                    <div className="nameContainer">
                        <h4 className="font-bold text-lg">{testimonial?.userName}</h4>
                        <p className="font-medium">{testimonial?.category}</p>
                    </div>
                </div>
                <div className="iconContainer ">
                    <FaQuoteLeft className="text-3xl" />
                </div>
            </div>
            <div className="testimonialBody">
                <p className="text-pretty">
                    &quot;{testimonial?.testimonial}&quot;
                </p>
            </div>
        </div>
    );
};

TestimonialCard.propTypes = {
    testimonial: PropTypes.object.isRequired,
};

export default TestimonialCard;
