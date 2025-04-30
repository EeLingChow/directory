import React from "react";
import { useNavigate  } from "react-router-dom";
import routes from "../routes";


const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = (name) => {
        navigate('/', { state: { scrollTo: name } });
    };

    return (
        <nav className="fixed flex justify-between items-center py-4 px-8 bg-white w-full">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Directory</h1>

            <div className="flex gap-6">
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
        </nav>
    )
};

export default Navbar;