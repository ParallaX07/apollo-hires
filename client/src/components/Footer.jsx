import {
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
    return (
        <footer className="bg-text-gray-100 dark:bg-primary w-full transition duration-300">
            <div className="py-8 lg:px-10 px-3 bg-gray-100 dark:bg-[#343A40] flex lg:flex-row flex-col justify-between">
                <p className="flex items-center dark:text-gray-100 text-lg lg:justify-start justify-center lg:text-2xl gap-3 text-gray-600 font-bold lg:max-w-[500px]">
                    <HiOutlineMailOpen className="text-primary dark:text-brown-accent text-5xl" />
                    Get our emails for info on new items, sales and more.
                </p>
                <div className="relative lg:w-96 w-full mt-2">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="bg-white lg:py-4 py-2 lg:px-6 px-4 shadow-md lg:text-xl text-base w-full"
                    />
                    <button>
                        <IoIosArrowDroprightCircle className="text-primary lg:text-5xl text-3xl absolute right-2 top-1" />
                    </button>
                </div>
            </div>
            <div className="bg-text-gray-100 dark:bg-primary dark:text-gray-100 lg:px-10 px-3 lg:pt-20 py-5 flex lg:flex-row flex-col lg:gap-20 gap-10 justify-evenly">
                <div className="flex flex-col gap-4 lg:max-w-[450px]">
                    <div className="flex items-end gap-5">
                        <h2 className="text-2xl font-bold">About Us</h2>
                        <img
                        className="lg:size-20 size-14 border-2 border-primary rounded-full"
                        src="https://i.ibb.co/cyZVhsW/OIG2-GMtgsw1q-J-modified.png"
                        alt="logo"
                    />
                    </div>
                    <p className="text-gray-600 dark:text-gray-100 text-base text-balance w-full">
                        At{" "}
                        <span className="text-primary dark:text-[#ADB5BD] font-bold underline underline-offset-2">
                            Apollo Hires
                        </span>{" "}
                        , we believe in client-centered representation and
                        achieving positive outcomes. We are a team of
                        experienced and passionate attorneys with a proven track
                        record of success in personal injury and business law.
                        We understand that legal issues can be stressful and
                        complex, and we are committed to providing our clients
                        with compassionate and effective representation.
                    </p>
                    <hr className="border-t-2 border-primary dark:border-[#343A40] border-opacity-70" />
                    <div className="flex gap-3 w-full justify-evenly">
                        <a href="https://www.facebook.com/saal07/">
                            <FaFacebook className="text-2xl text-primary dark:text-gray-100 opacity-55" />
                        </a>
                        <a href="https://www.linkedin.com/in/saalimaraf/">
                            <FaLinkedinIn className="text-2xl text-primary dark:text-gray-100 opacity-55" />
                        </a>
                        <a href="https://www.instagram.com/ss_araf/">
                            <FaInstagram className="text-2xl text-primary dark:text-gray-100 opacity-55" />
                        </a>
                        <a href="https://twitter.com/ArafSaalim">
                            <FaXTwitter className="text-2xl text-primary dark:text-gray-100 opacity-55" />
                        </a>
                    </div>
                </div>
                {/* My account */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">My Account</h2>
                    <div className="flex gap-3 text-base text-balance flex-col justify-between dark:text-gray-100 text-gray-600">
                        <Link to="/manage-services">Manage Services</Link>
                        <Link to="/my-bookings">Booking</Link>
                        <Link to="/add-service">Add Service</Link>
                        <Link to="/to-do">To Do</Link>
                    </div>
                </div>
                {/* Browse */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Browse</h2>
                    <div className="flex gap-3 flex-col justify-between dark:text-gray-100 text-base text-balance text-gray-600">
                        <Link to="/category/allservices">All Services</Link>
                        <HashLink to="/#popular">Popular Services</HashLink>
                        <HashLink to="/#highestRated">Highest Rated Services</HashLink>
                        <HashLink to="/#testimonial">Testimonials</HashLink>
                        <HashLink to="/#faq">FAQ</HashLink>
                    </div>
                </div>
                {/* Contact Information */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <div className="flex gap-3 flex-col justify-between text-gray-600 text-base text-balance dark:text-gray-100">
                        <p className=" flex items-center gap-4">
                            <IoLocationSharp />
                            example@email.com
                        </p>
                        <p className=" flex items-center gap-4">
                            <FaPhoneAlt />
                            (+88) 0171-2345678
                        </p>
                        <p className=" flex items-center gap-4">
                            <MdOutlineEmail />
                            example@email.com
                        </p>
                    </div>
                </div>
            </div>
            <hr className="border-t-2 border-primary dark:border-[#343A40]  border-opacity-70 w-full" />

            <div className="flex justify-between lg:flex-row flex-col lg:mx-20 mx-3 py-6">
                <p className="text-gray-600 dark:text-gray-100 text-base text-balance">
                    All rights reserved. ©
                </p>
                <p className="font-black text-base text-balance dark:text-gray-100 text-primary">
                    <a
                        href="https://www.linkedin.com/in/saalimaraf/"
                        className="font-bold"
                    >
                        <span className="text-primary dark:text-[#ADB5BD] font-bold underline underline-offset-2">
                            Apollo Hires
                        </span>{" "}
                        | Saalim Araf
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
