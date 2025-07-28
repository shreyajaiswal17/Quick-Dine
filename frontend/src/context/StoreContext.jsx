import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {   

    
    const [cartItems, setCartItems] = useState({})

    const addToCart =(itemId)=>{
        if(!cartItems[itemId]){
            // The curly braces {} create a new object.
            setCartItems((prev) =>({...prev, [itemId]:1 }))
        }
        else{
            setCartItems((prev) =>({...prev, [itemId]:prev[itemId]+1 }))
        }
    }
    const removeFromCart =(itemId)=>{

        setCartItems((prev) =>({...prev, [itemId]:prev[itemId]-1}))
    
    }

    const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id == item);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
    }

    return totalAmount;
};


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

// This contextValue object holds the data (food_list) that will be available to all components inside the StoreContextProvider.

    return (
        // {children} ensures that whatever components are inside this provider still render normally.

        <StoreContext.Provider value={contextValue}>
            {children}   
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;


// Context allows components to access shared data without manually passing props down multiple levels.

// createContext(null) creates a global data store.
// StoreContextProvider wraps the app and provides shared data.
// useContext(StoreContext) lets any child component access the data easily.