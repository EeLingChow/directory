import React, { useState } from "react";
import { Link } from "react-router-dom";
import { scroller } from 'react-scroll';
import routes from "../routes";


const Navbar = () => {
    const handleScroll = (name) => {
        scroller.scrollTo(name, {
          smooth: true,
          offset: -70,
          duration: 500,
        });
    };

    return (
        <nav className="fixed flex justify-between items-center py-4 px-8 bg-white w-full">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Directory</h1>

            <div className="flex gap-6">
                { routes.map((route) => (
                    <Link
                    key={route.name}
                    to={route.path}
                    onClick={() => handleScroll(route.name)}
                    className="text-gray-700 hover:text-gray-900"
                    >
                    {route.name}
                    </Link>
                ))}
            </div>
        </nav>
    )
};

export default Navbar;