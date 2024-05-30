import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import Loader from "./../components/FunctionalComponents/Loader";
import { PiStarBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../Auth/AuthProvider";
import ReviewCard from './../components/ReviewCard';

const ServiceDetails = () => {
    const id = useParams().id;
    console.log(id);

    const [service, setService] = useState(null);
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [serviceReviews, setServiceReviews] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        Promise.all([
            axiosSecure.get(`/services/${id}`),
            axiosSecure.get(`/reviews/${id}`)
        ]).then(([serviceRes, reviewsRes]) => {
            setService(serviceRes.data);
            const reviews = reviewsRes.data;
            setServiceReviews(reviews);
            const userReview = reviews.find((review) => {
                return review.userEmail === user?.email;
            });
            if (userReview) {
                setAlreadyReviewed(true);
            }
        }).catch(() => {
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    }, [id, user]);
    

    const handleReview = (e) => {
        e.preventDefault();
        const review = e.target.review.value;
        console.log(review, userRating);
        axiosSecure
            .post(`reviews`, {
                rating: userRating,
                review: review,
                serviceID: id,
                userEmail: user?.email,
                profileImage: user?.photoURL,
                name: user?.displayName,
                postDate: new Date().toISOString(),
            })
            .then((res) => {
                console.log(res.data);
                setAlreadyReviewed(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteReview = (reviewId) => {
        axiosSecure
            .delete(`/reviews/${reviewId}`)
            .then((res) => {
                console.log(res.data);
                setServiceReviews((prevReviews) => {
                    return prevReviews.filter((review) => {
                        return review._id !== reviewId;
                    });
                });
                setAlreadyReviewed(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            {/* user post reviw box */}
            <div className="animate__animated animate__fadeInUp w-full text-primary dark:text-white p-6 rounded-xl shadow-md mt-10 border-2 border-primary dark:border-white glass lg:max-w-5xl lg:mx-auto mx-3">
                <h2 className="text-2xl font-semibold mb-4">
                    Share Your Feedback
                </h2>
                <form
                    onSubmit={handleReview}
                    className={`${
                        alreadyReviewed ? "cursor-not-allowed opacity-30" : ""
                    }`}
                    title={`${alreadyReviewed ? "Already Reviewed" : ""}`}
                >
                    <ReactStars
                        count={5}
                        onChange={setUserRating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<PiStarBold />}
                        halfIcon={<PiStarHalfFill />}
                        fullIcon={<PiStarFill />}
                        activeColor="#ffd700"
                        edit={!alreadyReviewed}
                    />
                    <textarea
                        className={`w-full lg:h-24 p-2 border dark:border-white rounded-lg resize-none bg-opacity-35 bg-white text-primary dark:text-white ${
                            alreadyReviewed ? "cursor-not-allowed" : ""
                        }`}
                        name="review"
                        placeholder="Write your review..."
                        required
                        {...(alreadyReviewed ? { disabled: true } : {})}
                    />
                    <button
                        type="submit"
                        className={`submit text-white bg-black dark:bg-white dark:text-primary hover:bg-black/80 mt-2 ${
                            alreadyReviewed ? "cursor-not-allowed" : ""
                        }`}
                        {...(alreadyReviewed ? { disabled: true } : {})}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
            {/* product reviews */}
            <div className="grid grid-cols-1 gap-3 max-w-5xl lg:mx-auto mx-3 mt-10">
                    {serviceReviews.map((review, idx) => (
                        <ReviewCard
                            key={idx}
                            productReview={review}
                            currentUserEmail={user?.email}
                            handleDeleteReview={handleDeleteReview}
                        />
                    ))}
            </div>
        </section>
    );
};

export default ServiceDetails;
