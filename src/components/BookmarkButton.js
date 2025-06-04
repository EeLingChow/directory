import React, { useState } from "react";
import API from "../services/api";

const BookmarkButton = ({ shopId, initialBookmarked, onToggle }) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (bookmarked) {
        const res = await API.delete(`/bookmarks/${shopId}`);
      } else {
        const res = await API.post(`/bookmarks/${shopId}`);
        console.log(res);
      }
      setBookmarked(!bookmarked);
      if (onToggle) onToggle(!bookmarked);
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`z-50 px-3 py-1 text-3xl rounded ${
        bookmarked ? "text-black" : "text-gray-700"
      }`}
      disabled={loading}
    >
      {bookmarked ? "★" : "☆"}
    </button>
  );
};

export default BookmarkButton;