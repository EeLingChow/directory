import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Category from '../components/Category';
import Shop from '../components/Shop';
import SearchBar from '../components/SearchBar';
import API from "../services/api";
import { scroller } from 'react-scroll';

const Home = () => {
  const location = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    API.get('/shops/all')
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

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        offset: -70,
        duration: 500,
      });
    }
  }, [location.state]);

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