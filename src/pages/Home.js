import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Shop from '../components/Shop';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/shops/all')
    .then(res => {
        //console.log(res.data.data);
        setShops(res.data.data);
        setFilteredShops(res.data.data);
        setError('');
    })
    .catch(err => {
        setError('Something went wrong!');
    })
}, []); //fetching data on initial load

  useEffect(() => {
    let results = shops;

    if (selectedCategoryId !== 'all') {
        results = results.filter(shop =>
            shop.categories.some(category => category.id === Number(selectedCategoryId))
        );
    }

    if (searchTerm) {
        results = results.filter((shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    setFilteredShops(results);

  }, [selectedCategoryId, searchTerm, shops]);

  return (
    <div>
        <Hero />
        <Category onCategorySelect={setSelectedCategoryId} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <Shop shops={filteredShops} error={error} />
    </div>
  );
};

export default Home;