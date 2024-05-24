
const CardSkeleton = () => {
    return (
        <div className="max-h-[500px] button-container transition duration-300 rounded-2xl dark:border-gray-100 border-4 border-primary animate-pulse">
            {/* Placeholder image */}
            <div className="w-full h-[500px] bg-gray-300 rounded-2xl"></div>
            <div className="w-full" style={{ zIndex: 2 }}>
                {/* Placeholder text */}
                <div className="animate-pulse">
                    <p className="lg:text-xl text-center w-full font-bold text-gray-100 bg-gray-300 h-8 mb-4"></p>
                    <div className="flex justify-center">
                        {/* Placeholder button */}
                        <div className="px-7 py-2 w-36 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
