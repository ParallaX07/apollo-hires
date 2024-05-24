import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import Marquee from "react-fast-marquee";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BannerSlider from "../BannerSlider/BannerSlider";
import HighestRatedCard from "../HighestRated/HighestRatedCard";
import CardSkeleton from "../FunctionalComponents/CardSkeleton";
import PopularServices from "./../PopularServices";
import TestimonialCard from "../TestimonialCard";
import AccordionElement from "../AccordionElement";

const HomeBody = () => {
    useDocumentTitle("Home | Apollo Hires");
    const [highestRated, sethighestRated] = useState([]);
    const [popularServices, setPopularServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            axiosSecure.get("/randItems"),
            axiosSecure.get("/randItems"),
            axiosSecure.get("/testimonials"),
            axiosSecure.get("/faqs"),
        ])
            .then(([highestRatedRes, popularServicesRes, testimonialsRes, faqRes]) => {
                sethighestRated(highestRatedRes.data);
                setPopularServices(popularServicesRes.data);
                setTestimonials(testimonialsRes.data);
                setFaqs(faqRes.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <section className="bg-[url('https://i.ibb.co/vJFwbNs/white-pattern-background-309o7rbl649alir6-1.jpg')] bg-cover dark:bg-[url('https://i.ibb.co/SxmRrH0/image-1.png')] relative lg:h-dvh flex flex-col-reverse lg:flex-row justify-center items-center py-28 transition duration-500 gap-3 text-primary dark:text-gray-100">
                {/* Pseudo-element to overlay semi-transparent background */}
                <div className="absolute inset-0 bg-white dark:bg-black opacity-70"></div>

                {/* Content */}
                <div className="lg:w-1/2 z-10">
                    <h1 className="lg:text-6xl text-5xl text-center mx-auto font-extrabold">
                        We Enforce Justice
                    </h1>
                    <p className="transition duration-500 lg:pl-52 mr-10 py-2 rounded-r-full bg-black text-gray-100 dark:bg-white dark:text-primary pl-10 lg:text-3xl text-2xl font-bold mt-6">
                        Trust Our Professionals
                    </p>
                    <p className="text-2xl text-center mt-5 font-semibold dark:text-gray-100">
                        The legal landscape is complex. Navigate it with
                        confidence. Schedule your consultation today.
                    </p>
                    <Link to="/allservices" className="flex justify-center">
                        <button className="bg-primary dark:bg-gray-100 dark:text-primary text-white py-2 px-4 rounded-lg mt-5 font-bold text-center">
                            Book Consultation
                        </button>
                    </Link>
                </div>

                {/* BannerSlider */}
                <BannerSlider />
            </section>

            {/* popular Services section */}
            <section
                id="popular"
                className="bg-white dark:bg-primary lg:mx-auto mt-20 transition duration-300 mx-3"
            >
                <h1 className="text-4xl text-center font-bold dark:text-gray-100 mb-4">
                    Popular Services
                </h1>
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {isLoading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        popularServices.map((item) => {
                            return (
                                <PopularServices
                                    key={item._id}
                                    service={item}
                                />
                            );
                        })
                    )}
                </div>
            </section>

            {/* highest rated Services section */}
            <section
                id="highestRated"
                className="bg-white dark:bg-primary lg:mx-auto py-20 transition duration-300 mx-3"
            >
                <h1 className="text-4xl text-center font-bold dark:text-gray-100 mb-4">
                    Highest Rated Services
                </h1>
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {isLoading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        highestRated.map((item) => {
                            return (
                                <HighestRatedCard key={item._id} item={item} />
                            );
                        })
                    )}
                </div>
            </section>

            {/* testimonial section */}
            <section
                id="testimonial"
                className="bg-white dark:bg-primary lg:mx-auto transition duration-300 mx-3"
            >
                <h1 className="text-4xl text-center font-bold dark:text-gray-100 mb-4">
                    Testimonials
                </h1>
                <Marquee
                    className="flex justify-center gap-5 py-5"
                    pauseOnHover={true}
                >
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial._id}
                            testimonial={testimonial}
                        />
                    ))}
                </Marquee>
            </section>

            {/*FAQ section*/}
            <section id="faq" className="bg-white dark:bg-primary lg:mx-auto transition duration-300 mx-3 py-10">
                <h1 className="text-4xl text-center font-bold dark:text-gray-100 mb-4">
                    Frequently Asked Questions
                </h1>
                <Accordion allowZeroExpanded className="lg:w-[896px] lg:mx-auto text-primary dark:text-gray-100 mx-3 space-y-3">
                    {faqs.map((item, index) => (
                        <div key={index} className="flex gap-3 items-center">
                            <AccordionElement  item={item} />
                        </div>
                    ))}
                </Accordion>
            </section>
        </>
    );
};

export default HomeBody;
