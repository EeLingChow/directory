import React, { useEffect, useState } from "react";
import API from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const BookmarkedShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/bookmarks");
      setShops(res.data.data);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-screen-xl py-24">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid gap-4 md:grid-cols-2 py-24">
        {shops.map((shop) => (
          <div key={shop.id} className="p-4 border rounded shadow bg-white">
            <h2 className="text-lg font-bold">{shop.name}</h2>
            <p className="text-sm text-gray-600">Floor: {shop.floor?.level || 'N/A'}</p>
            <div className="mt-2">
              {shop.categories?.map((c) => (
                <span key={c.id} className="text-xs bg-gray-200 rounded px-2 py-1 mr-1">
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedShops;