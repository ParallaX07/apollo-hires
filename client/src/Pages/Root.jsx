import { Outlet } from "react-router-dom";
import { createContext, useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowUp } from "react-icons/io";
import Navbar from "../components/NavBar";
import 'animate.css';
import Footer from './../components/Footer';


const MessageContext = createContext();

const Root = () => {
    const notifySuccess = (message) => {
        toast.success(message, {
            style: {
                border: "1px solid #10B981",
                padding: "16px",
                color: "#10B981",
            },
            iconTheme: {
                primary: "#10B981",
                secondary: "#FFFAEE",
            },
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            style: {
                border: "1px solid #EF4444 ",
                padding: "16px",
                color: "#EF4444 ",
            },
            iconTheme: {
                primary: "#EF4444 ",
                secondary: "#FFFAEE",
            },
        });
    };

    const messageInfo = {
        notifySuccess,
        notifyError,
    };

    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = useCallback(() => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    }, [showScroll]);

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => {
            window.removeEventListener("scroll", checkScrollTop);
        };
    }, [checkScrollTop]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <MessageContext.Provider value={messageInfo}>
                <Navbar />
                <main className="font-poppins transition duration-300 dark:bg-primary bg-white">
                    <Outlet />
                </main>
                <Footer />
            </MessageContext.Provider>
            {/* scroll up button */}
            {showScroll && (
                <div
                    className="fixed bottom-5 right-5 bg-primary dark:bg-gray-100 dark:text-primary text-white p-2 rounded-full cursor-pointer animate__animated animate__fadeInRight"
                    onClick={scrollTop}
                >
                    <IoIosArrowUp className="text-2xl" />
                </div>
            )}

            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
};

export { MessageContext };

export default Root;
