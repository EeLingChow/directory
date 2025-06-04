import React, { useState, useContext } from "react";
import { useNavigate  } from "react-router-dom";
import routes from "../routes";
import { UserContext } from "../contexts/UserContext";
import LoadingSpinner from "./LoadingSpinner";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser, loading } = useContext(UserContext);

    const handleClick = (name) => {
        navigate('/', { state: { scrollTo: name } });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
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
                            className="cursor-pointer text-gray-700 hover:text-gray-900"
                            >
                            {route.name}
                        </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                    {loading ? (<LoadingSpinner/>) : user ? (
                        <>
                        <span className="text-sm text-gray-600 hidden md:inline">
                            Welcome, {user.name}
                        </span>
                        <button
                            onClick={() => navigate("/bookmarks")}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            My Bookmarks
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-500 hover:text-red-700"
                        >
                            Logout
                        </button>
                        </>
                    ) : (
                        <>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="text-sm text-gray-700 hover:text-gray-900"
                        >
                            Register
                        </button>
                        </>
                    )}
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