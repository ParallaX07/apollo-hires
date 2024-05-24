import { useState } from "react";
import { TbEyeClosed, TbEye } from "react-icons/tb";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

const PasswordInput = ({ name, placeholder, onValueChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputChange = (event) => {
        onValueChange(event.target.value);
    };

    return (
        <div className="relative">
            <input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                name={name}
                className="flex h-10 w-full rounded-md border border-gray-100 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                required
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                    setIsInputFocused(false);
                    setShowPassword(false);
                }}
            />
            {isInputFocused && (
                <button
                    type="button"
                    className="absolute right-2 top-2"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                    }}
                >
                    {showPassword ? (
                        <TbEye className="text-black dark:text-gray-100 text-2xl show" />
                    ) : (
                        <TbEyeClosed className="text-black dark:text-gray-100 text-2xl hide" />
                    )}
                </button>
            )}
            <Tooltip
                anchorSelect=".show"
                place="top"
                style={{
                    backgroundColor: "rgba(177, 139, 94, 0.9)",
                    color: "rgb(255, 255, 255)",
                    borderColor: "rgba(177, 139, 94, 1)",
                    borderWidth: "2px",
                    fontWeight: "700",
                }}
            >
                Show Password
            </Tooltip>
            <Tooltip
                anchorSelect=".hide"
                place="top"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    color: "rgb(255, 255, 255)",
                    fontWeight: "700",
                }}
            >
                Hide Password
            </Tooltip>
        </div>
    );
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default PasswordInput;
