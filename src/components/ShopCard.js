import React, { useContext } from "react";
import { Link } from "react-router-dom";

const ShopCard = ({ store }) => {
  // const { setShop } = useContext(ShopContext);

  // const handleClick = (shop) => {
  //   setShop(shop);
  // };

  return (
    <Link to={`/shops/${store.id}`}>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <h4 className="text-xl font-bold text-gray-800">{store.name}</h4>
          <p className="text-gray-500">Category:</p>
          <ul className="list-disc list-inside ml-4">
              {store.categories.map((category) => (<li key={category.id}>{category.name}</li>))}
          </ul>
        </div>
    </Link>

  );
};

export default ShopCard;
