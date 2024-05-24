import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Servicecards from "../components/Servicecards";
import useDocumentTitle from "./../hooks/useDocumentTitle";
import SearchBar from "../components/FunctionalComponents/SearchBar";
import ServiceLoadingSkeleton from "../components/FunctionalComponents/ServiceLoadingSkeleton";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

const Services = () => {
    const axiosSecure = useAxiosSecure();
    useDocumentTitle("All Services | Apollo Hires");

    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];
    console.log(pages);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        axiosSecure
            .get("/servicesCount")
            .then((res) => setCount(res.data.count))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        axiosSecure
            .get(`/services?_page=${currentPage}&_limit=${itemsPerPage}`)
            .then((res) => {
                setServices(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [currentPage, itemsPerPage]);

    return (
        <section className="bg-white dark:bg-primary w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-28 transition duration-300">
            <h1 className="text-3xl text-center pt-10 dark:text-gray-100 font-bold">
                All Services
            </h1>
            {/* search bar */}
            <SearchBar />
            <div className="flex flex-wrap gap-4 justify-center items-center">
                <BiArrowFromRight className="text-primary dark:text-gray-100 text-2xl hover:cursor-pointer" onClick={() => setCurrentPage(prev => prev > 0 ? prev - 1 : prev)} />
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 py-1 rounded-full ${
                            page === currentPage
                                ? "bg-primary text-gray-50 dark:text-primary dark:bg-gray-100"
                                : "bg-white text-primary dark:bg-primary dark:text-gray-100"
                        } border-2 border-primary dark:border-white dark:bg-gray-100 transition duration-300 font-bold`}
                    >
                        {page + 1}
                    </button>
                ))}
                <BiArrowFromLeft className="text-primary dark:text-gray-100 text-2xl hover:cursor-pointer"
                onClick={() => setCurrentPage(prev => prev < numberOfPages - 1 ? prev + 1 : prev)}  />
            </div>
            <div className="flex w-full justify-end">
                <label className="text-primary dark:text-gray-100">
                    Items per page:
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(e.target.value)}
                        className="dark:bg-primary rounded-lg border-2 mx-2 font-bold"
                    >
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </label>
            </div>

            <div className="grid grid-cols-1 gap-8 p-4">
                {isLoading ? (
                    <>
                        <ServiceLoadingSkeleton />
                        <ServiceLoadingSkeleton />
                        <ServiceLoadingSkeleton />
                    </>
                ) : null}
                {services.map((service) => (
                    <Servicecards key={service._id} service={service} />
                ))}
            </div>
        </section>
    );
};

export default Services;
