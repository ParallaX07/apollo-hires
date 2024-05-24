// SearchBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
    const axiosSecure = useAxiosSecure();

    const [searchParam, setSearchParam] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearch = () => {
        if (!searchParam) {
            setIsSearchActive(false);
            return;
        }
        axiosSecure.get(`/services/search?name=${searchParam}`).then((res) => {
            setSearchResults(res.data);
            console.log(res.data);
            setIsSearchActive(true);
        });
    };

    // Debounce the search
    useEffect(() => {
        const timer = setTimeout(handleSearch, 500);
        return () => clearTimeout(timer);
    }, [searchParam]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsSearchActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="flex justify-center lg:flex-row flex-col items-center gap-4 my-5 relative"
            ref={searchRef}
        >
            <input
                type="text"
                placeholder="Search for services"
                className="p-2 rounded-lg border-2 dark:bg-gray-100 dark:text-primary"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
            />
            <button
                className="p-3 rounded-full bg-primary dark:bg-gray-100 dark:text-primary text-gray-50"
                onClick={handleSearch}
            >
                <IoSearchOutline />

            </button>
            {isSearchActive && (
                <div className="absolute top-full rounded-lg p-2 border-2 border-primary dark:border-gray-100 bg-white dark:bg-primary flex flex-col">
                    {searchResults.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">
                            No results found
                        </p>
                    ) : (
                        searchResults.map((result) => (
                            <Link
                                to={`/services/${result._id}`}
                                key={result._id}
                                className="bg-white flex gap-3 items-center dark:bg-primary text-primary dark:text-gray-100 p-2 hover:opacity-45"
                            >
                                <img src={result?.image} alt="" className="size-10 rounded-full" />
                                {result.name}
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
