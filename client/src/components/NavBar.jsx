import { IoMdLogOut } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../Pages/Root";
import { FaRegMoon, FaRegSun, FaUserAstronaut } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "../utils/ThemeContext";
import { RiArrowDownWideFill } from "react-icons/ri";

const NavBar = () => {
    const active =
        "text-primary dark:text-gray-100 border-b-2 dark:border-gray-100 border-primary hover:text-primary/80 dark:hover:text-gray-100/80";
    const inactive =
        "hover:text-primary/80 dark:hover:text-gray-100/80 border-b-2 border-transparent";

    const { user, logout, loading } = useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleLogout = async () => {
        try {
            await logout();
            notifySuccess("Logged out successfully");
        } catch (error) {
            notifyError("An error occurred. Please try again later.");
        }
    };

    /**
     * Represents the logged out state of the Navbar component.
     * @type {JSX.Element}
     */
    const loggedOutState = (
        <>
            <div className="gap-2 items-center lg:flex hidden">
                <FaUserAstronaut className="text-primary" />
                <NavLink
                    to="/register"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Register
                </NavLink>
                <p>/</p>
                <NavLink
                    to="/login"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Login
                </NavLink>
            </div>
        </>
    );

    /**
     * Represents the logged-in state of the Navbar component.
     * @returns {JSX.Element} The JSX element representing the logged-in state.
     */
    const loggedInState = (
        <>
            <div className="flex gap-2 items-center">
                <img
                    className="size-12 rounded-full"
                    src={user?.photoURL}
                    alt=""
                />

                <button
                    onClick={handleLogout}
                    className="lg:py-2 lg:px-3 rounded-full bg-gray-100 dark:bg-primary text-primary bg-opacity-20 dark:border-gray-100 border-primary border-2 hidden lg:flex items-center gap-2"
                >
                    <IoMdLogOut className="size-6 dark:text-gray-100" />
                </button>
            </div>
        </>
    );

    const [dropDown, setDropDown] = useState(false);

    /**
     * Toggles the dropdown state.
     */
    const handleDropDown = () => {
        setDropDown(!dropDown);
    };

    useEffect(() => {
        /**
         * Handles the click event outside of the dropdown and hamburger elements.
         * If the click is outside and the dropdown is open, it closes the dropdown.
         * @param {Event} event - The click event object.
         */
        const handleClickOutside = (event) => {
            if (
                dropDown &&
                event.target.closest(".dropdown") === null &&
                event.target.closest(".hamburger") === null
            ) {
                setDropDown(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [dropDown]);

    const loadingSkeleton = (
        <div className="flex gap-2 items-center animate-pulse">
            <div className="profileImage bg-gray-200 rounded-full h-12 w-12 dark:bg-white"></div>
            <button className="lg:py-2 lg:px-3 rounded-full bg-gray-200 text-gray-200 dark:text-white bg-opacity-20 border-gray-200 dark:border-white border-2 hidden lg:flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-white rounded-full"></div>
                Getting info
            </button>
        </div>
    );

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const loggedInNavItems = (
        <li>
            <button
                onClick={toggleDropdown}
                className="transition duration-300 focus:outline-none text-primary hover:text-primary/80 dark:text-gray-100 flex items-center gap-2"
            >
                Dashboard
                <RiArrowDownWideFill className="text-primary dark:text-gray-100 font-medium text-2xl" />
            </button>
            <div className="relative min-w-full">
                {/* Dashboard dropdown */}
                {dropdownVisible && (
                    <ul className="transition duration-300 absolute top-full -left-20 bg-gray-50 dark:bg-primary dark:border-gray-100 border shadow-lg py-2 px-3 rounded-md z-10 min-w-fit border-primary">
                        <li>
                            <NavLink
                                to="/add-service"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                                onClick={() => setDropdownVisible(false)}
                            >
                                Add Service
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/manage-services"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                                onClick={() => setDropdownVisible(false)}
                            >
                                Manage Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/my-bookings"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                                onClick={() => setDropdownVisible(false)}
                            >
                                Bookings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/to-do"
                                className={({ isActive }) =>
                                    isActive ? `${active}` : `${inactive}`
                                }
                                onClick={() => setDropdownVisible(false)}
                            >
                                To-Do
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </li>
    );

    const navItems = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/allservices"
                    className={({ isActive }) =>
                        isActive ? `${active}` : `${inactive}`
                    }
                >
                    Services
                </NavLink>
            </li>
            {user && loggedInNavItems}
        </>
    );

    return (
        <header className="flex fixed w-full top-0 z-50 bg-gray-50 font-poppins dark:bg-primary transition duration-300 dark:text-gray-100 custom-shadow border-b">
            <nav className="transition duration-300 lg:px-5 px-3 py-2 flex justify-between text-sm items-center lg:text-lg font-semibold w-full dark:text-gray-100 ">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="lg:size-16 size-14 border-2 border-primary rounded-full"
                        src="https://i.ibb.co/cyZVhsW/OIG2-GMtgsw1q-J-modified.png"
                        alt="logo"
                    />
                    <div>
                        <h1 className="text-primary transition duration-300 dark:text-gray-100 text-lg lg:text-2xl font-black flex lg:flex-row flex-col lg:gap-2">
                            Apollo{" "}
                            <span className="text-black dark:text-[#ADB5BD]">
                                Hires
                            </span>
                        </h1>
                        <p className="text-gray-400 dark:text-[#343A40] text-xs lg:text-sm font-extrabold">
                            LAW & ORDER
                        </p>
                    </div>
                </Link>
                <ul className="hidden lg:flex gap-4 items-center justify-center">
                    {navItems}
                </ul>{" "}
                <div className="flex items-center gap-3 relative">
                    {loading
                        ? loadingSkeleton
                        : user
                        ? loggedInState
                        : loggedOutState}{" "}
                    {/* right most element */}
                    <TiThMenu
                        onClick={handleDropDown}
                        className="lg:hidden flex size-6 text-primary dark:text-gray-100 dark:text-brown-secondary hamburger"
                    />
                    <div
                        className={`dropdown ${
                            dropDown ? "flex" : "hidden"
                        } absolute top-full right-1 rounded-lg bg-white dark:bg-primary py-3 px-5 font-medium border dark:border-gray-100 border-primary dark:border-brown-secondary w-44 z-10`}
                    >
                        <ul className="flex flex-col gap-3 font-medium text-lg">
                            {navItems}
                            {user ? (
                                <li
                                    onClick={handleLogout}
                                    className="flex gap-2 items-center"
                                >
                                    <IoMdLogOut className="text-primary dark:text-gray-100" />
                                    Logout
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `${active}`
                                                    : `${inactive}`
                                            }
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? `${active}`
                                                    : `${inactive}`
                                            }
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-10 h-10 rounded-full ring-0 peer duration-500 outline-none overflow-hidden">
                            <div className="flex items-center justify-center absolute h-10 w-10 top-1/2 rounded-full left-1 -translate-y-1/2 peer-checked:opacity-0 peer-checked:rotate-90 peer-checked:-translate-y-full animate__animate animate__fadeInUpBig">
                                {!darkMode ? <FaRegSun className="text-2xl" /> : <FaRegMoon className="text-2xl" />}
                            </div>
                        </div>
                    </label>
                </div>
            </nav>
            <Tooltip
                anchorSelect=".profileImage"
                place="top"
                style={{
                    backgroundColor: "rgba(177, 139, 94, 1)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgba(177, 139, 94, 1)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                {user?.displayName}
            </Tooltip>
        </header>
    );
};

export default NavBar;
