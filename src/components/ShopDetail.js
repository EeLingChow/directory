import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShopDetail = () => {   
    const { id } = useParams();
    const [ shop, setShop ] = useState(null);
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(true);
    // const { shop } = useContext(ShopContext);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/shops/show?id=${id}`)
        .then(res => {
            setShop(res.data.data);
            setLoading(false);
            setError('');
        })
        .catch(err => {
            setLoading(false);
            setError('Something went wrong!');
        })
    }, [id]);

    if (loading) {
        return <div className="bg-blue-50 py-20 px-8 text-center">Loading . . .</div>;
    }

    return (
        <>
        { shop ? (
        <div className="bg-blue-50 py-20 px-8">
            <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-8">
                {shop.image ? (
                    <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                    No Image Available
                    </div>
                )}
            </div>
    
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
                <p className="text-gray-600">{shop.description || "No description available."}</p>
            </div>
    
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Categories:</h2>
                <div className="flex flex-wrap gap-2">
                    {shop.categories?.length > 0 ? (
                    shop.categories.map((category) => (
                        <span
                        key={category.id}
                        className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
                        >
                        {category.name}
                        </span>
                    ))
                    ) : (
                    <p className="text-gray-400">No categories listed.</p>
                    )}
                </div>
            </div>
    
            <div>
                <h2 className="text-xl font-semibold mb-2">Floor:</h2>
                <p className="text-gray-600">{shop.floor ? `${shop.floor.level}` : "No floor information."}</p>
            </div>
        </div>) : ''}
        </>
    );
};

export default ShopDetail;