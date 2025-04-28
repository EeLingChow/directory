import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({children}) => {  
    const [shop, setShop] = useState(null);

    return (
        <ShopContext.Provider value={{shop, setShop}}>
            {children}
        </ShopContext.Provider>
    );
};