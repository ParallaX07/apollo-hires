import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/FunctionalComponents/Loader";
import { MessageContext } from "./Root";

const UpdateService = () => {
    useDocumentTitle("Update Service | Apollo Hires");
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(false);
    const { notifyError, notifySuccess } = useContext(MessageContext);
    const axiosSecure = useAxiosSecure();
    const id = useParams().id;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(true);
        axiosSecure.get(`/services/${id}`).then((res) => {
            setService(res.data);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });  
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name") || service?.name;
        const area = formData.get("area") || service?.area;
        const price = formData.get("price") || service?.price;
        const image = formData.get("image") || service?.image;
        const category = formData.get("category") || service?.category;
        const description = formData.get("description") || service?.description;
        const provider = service?.provider;
        const providerEmail = service?.providerEmail;
        
        const updatedService = {
            name,
            area,
            price,
            image,
            category,
            description,
            provider,
            providerEmail,
        };

        setLoading(true);
        axiosSecure.put(`/services/${id}`, updatedService).then(() => {
            notifySuccess("Service updated successfully");
            setLoading(false);
            navigate("/manage-services");
        }).catch((err) => {
            notifyError("Failed to update service");
            console.log(err);
            setLoading(false);
        }).finally(() => {
            e.target.reset();
            setLoading(false);
        });
    }

    return (
        <section className="bg-white dark:bg-primary w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 transition duration-300">
            {
                loading && <Loader />
            }
            <h1 className="text-3xl text-center pt-10 dark:text-gray-100 font-bold">
                Update Service
            </h1>
            <form
                onSubmit={handleUpdate}
                className=" md:mx-20 p-10 border border-gray-300 rounded dark:bg-primary dark:border-gray-700 dark:text-primary"
            >
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={service?.name}
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Area
                        </label>
                        <input
                            type="text"
                            name="area"
                            placeholder={service?.area}
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            placeholder={service?.price}
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Image
                        </label>
                        <input
                            type="text"
                            name="image"
                            placeholder={service?.image}
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Category <span className="text-gray-500 text-base">({service?.category})</span>
                        </label>
                        {/* circular selection option */}
                        <select
                            name="category"
                            className="w-full border border-gray-300 rounded p-2 dark:bg-primary dark:text-gray-100"
                        >
                            <option value="">Select a category</option>
                            <option value="Litigation and Dispute Resolution">
                                Litigation and Dispute Resolution
                            </option>
                            <option value="Corporate and Commercial Law">
                                Corporate and Commercial Law
                            </option>
                            <option value="Real Estate Law">Real Estate Law</option>
                            <option value="Intellectual Property Law">
                                Intellectual Property Law
                            </option>
                            <option value="Family Law">Family Law</option>
                            <option value="Estate Planning and Probate">
                                Estate Planning and Probate
                            </option>
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder={service?.description}
                            className="w-full border border-gray-300 rounded p-2 dark:bg-gray-100"
                        ></textarea>
                    </div>
                {/* disabled provider fields */}
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Provider Name
                        </label>
                        <input
                            type="text"
                            name="provider"
                            placeholder={service?.provider}
                            className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100"
                            disabled
                        />
                    </div>
                    <div>
                        <label className=" text-2xl font-bold dark:text-gray-100">
                            Provider Email
                        </label>
                        <input
                            type="text"
                            name="provider"
                            placeholder={service?.providerEmail}
                            className="w-full border hover:cursor-not-allowed border-gray-300 rounded p-2 dark:bg-gray-100"
                            disabled
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white rounded-lg px-4 py-2 mt-4 w-full dark:bg-gray-100 dark:text-primary transition duration-300 hover:bg-gray-50 hover:text-primary font-bold"
                >
                    Update Service
                </button>
            </form>
        </section>
    );
};

export default UpdateService;