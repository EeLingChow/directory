import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = ({onCategorySelect}) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories/all')
        .then(res => {
            setCategories(res.data.data);
            setLoading(false);
            setError('');
        })
        .catch(error => {
            setLoading(false);
            setError('Something went wrong!');
        })
    }, []); //fetching data on initial load

    return (
        <section id="Categories" className="bg-blue-100 py-20 px-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Categories</h3>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => onCategorySelect('all')}
                    className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition"
                >
                    All
                </button>
                {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => onCategorySelect(cat.id)}
                    className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-200 transition"
                >
                    {cat.name}
                </button>
                ))}
            </div>
        </section>
    );
};

export default Category;