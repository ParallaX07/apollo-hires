import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { MessageContext } from "./Root";
import useDocumentTitle from '../hooks/useDocumentTitle';
import Loader from './../components/FunctionalComponents/Loader';
import PasswordInput from './../components/FunctionalComponents/PasswordInput';

const Register = () => {
    useDocumentTitle("Registration | Apollo Hires");
    const { createUser, logout, user, updateUserProfile, loading, setLoading, googleLogin } =
        useContext(AuthContext);
    const { notifySuccess, notifyError } = useContext(MessageContext);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (loading) {
        return <Loader />;
    }

    /**
     * Handles the registration process.
     *
     * @param {Event} e - The event object.
     * @returns {Promise<void>} - A promise that resolves when the registration process is complete.
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        let url = formData.get("url");
        const passwordValue = password;
        const confirmationValue = confirmation;

        //password validation
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(passwordValue)) {
            notifyError(
                "Password must contain at least 6 characters, one uppercase and one lowercase letter"
            );
            return;
        }

        // Check if the password and confirmation match
        if (passwordValue !== confirmationValue) {
            notifyError("Passwords do not match");
            return;
        }

        if (url.length < 3) {
            url = "https://i.ibb.co/hYbbGyR/6596121-modified.png";
        }

        try {
            await createUser(email, passwordValue);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                notifyError("Email already in use");
                setLoading(false);
                return;
            } else {
                setLoading(false);
                notifyError("An error occurred. Please try again later.");
                return;
            }
        } finally {
            setLoading(false);
        }

        await updateUserProfile(user, name, url)
            .then(() => {
                logout();
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                notifyError(error.code);
            });

        if (!loading) {
            notifySuccess("Account created successfully");
            // Log out the user
            navigate("/login");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin().then(() => {
                if (!loading) {
                    notifySuccess("Logged in successfully");
                    navigate(location?.state ? location.state : "/");
                }
            });
        } catch (error) {
            setLoading(false);
            notifyError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:min-h-[calc(100dvh-100px)] min-h-full lg:w-full flex items-center justify-center py-28 dark:bg-primary dark:text-gray-100">
            <div className="glass animate__animated animate__fadeIn xl:mx-auto xl:w-full custom-shadow p-4 xl:max-w-sm 2xl:max-w-md rounded-lg border border-gray-200">
                <div className="mb-2 flex justify-center"></div>
                <h2 className="text-center text-2xl font-bold leading-tight text-primary dark:text-gray-100">
                    Regsiter for an account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary dark:text-gray-100 font-extrabold">
                        Login
                    </Link>
                </p>
                <form className="mt-2" onSubmit={(e) => handleRegister(e)}>
                    <div className="space-y-5">
                        <div>
                            <label className="text-base font-medium">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Full Name"
                                    type="text"
                                    name="name"
                                    className="flex h-10 w-full rounded-md border border-gray-100 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-base font-medium">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    className="flex h-10 w-full rounded-md border border-gray-100 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-base font-medium">
                                Photo Url
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder="Photo URL"
                                    type="text"
                                    name="url"
                                    className="flex h-10 w-full rounded-md border border-gray-100 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex lg:flex-row flex-col gap-5">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <PasswordInput
                                        name="password"
                                        placeholder="Password"
                                        onValueChange={(value) =>
                                            setPassword(value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium">
                                        Confirm Password
                                    </label>
                                </div>
                                <div className="mt-2 relative">
                                    <PasswordInput
                                        name="confirmation"
                                        placeholder="Confirm Password"
                                        onValueChange={(value) =>
                                            setConfirmation(value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="inline-flex w-full items-center justify-center rounded-md bg-primary dark:bg-white px-3.5 py-2.5 font-semibold leading-7 text-white dark:text-primary hover:bg-primary/80 dark:hover:bg-white/80"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
                <div className="flex my-3 justify-center items-center gap-2">
                    <hr className="w-full border border-gray-100" />
                    <p className="text-center text-gray-600 dark:text-gray-100 font-bold">Or</p>
                    <hr className="w-full border border-gray-100" />

                </div>
                <div className="mt-3 space-y-3">
                    <button
                        className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-primary focus:bg-gray-100 focus:text-primary focus:outline-none"
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <span className="mr-2 inline-block">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-rose-500"
                            >
                                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                            </svg>
                        </span>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
