import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import routes from "../routes";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate('/', { state: { scrollTo: name } });
    };

    return (
        <nav className="fixed z-50 w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Directory</h1>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                        >
                        ☰
                        </button>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        { routes.map((route) => (
                        <span
                            key={route.name}
                            to={route.path}
                            onClick={() => handleClick(route.name)}
                            className="text-gray-700 hover:text-gray-900"
                            >
                            {route.name}
                        </span>
                        ))}
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden flex flex-col space-y-2 mt-2 pb-4">
                        {routes.map((route) => (
                        <span
                            key={route.name}
                            onClick={() => {
                            handleClick(route.name);
                            setIsOpen(false);
                            }}
                            className="cursor-pointer text-gray-700 hover:text-gray-900"
                        >
                            {route.name}
                        </span>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
};

export default Navbar;