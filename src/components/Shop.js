import React from "react";
import ShopCard from "./ShopCard";

const Shop = ({shops, error}) => {   
    if (error) {
        return error;
    }

    return (
        <section id="Shops" className="bg-blue-50 py-20 px-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {shops.map(shop => (
                <ShopCard key={shop.id} store={shop} />
            ))}
            </div>
        </section>
    );
};

export default Shop;