import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";
import { UserContext } from "../contexts/UserContext";

const ShopCard = ({ store }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleCardClick = () => {
     navigate(`/shops/${store.id}`);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition" onClick={handleCardClick}>
      <h4 className="text-xl font-bold text-gray-800">{store.name}</h4>
      <p className="text-gray-500">Category:</p>
      <ul className="list-disc list-inside ml-4">
          {store.categories.map((category) => (<li key={category.id}>{category.name}</li>))}
      </ul>
      { user && (      
      <div className="absolute right-0 top-0" onClick={(e) => e.stopPropagation()}>
        <BookmarkButton
          shopId={store.id}
          initialBookmarked={store.is_bookmarked}
          onToggle={(newState) => console.log(`Shop ${store.id} is now ${newState}`)}
        />
      </div>)}
    </div>
  );
};

export default ShopCard;
