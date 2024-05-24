const ServiceLoadingSkeleton = () => {
    return (
        <div className="bg-white dark:bg-primary border border-gray-100 dark:text-gray-100 transition duration-300 shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row animate-pulse">
            <div className="w-52 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 flex flex-col gap-3">
                <div className="rounded-xl h-6 w-3/4 bg-gray-200 dark:bg-gray-700"></div>
                <div className="rounded-xl h-12 w-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="rounded-xl mt-4 flex gap-5 flex-col lg:flex-row">
                    <button>
                        <div className="py-2 px-4 rounded-lg w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-200 text-center"></div>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div>
                            <div className="rounded-xl h-3 w-24 bg-gray-200 dark:bg-gray-700 mb-2"></div>
                            <div className="rounded-xl h-3 w-24 bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="h-3 w-24 rounded-xl bg-gray-300 dark:bg-gray-700 dark:text-gray-300 flex items-center gap-3 font-semibold text-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default ServiceLoadingSkeleton;