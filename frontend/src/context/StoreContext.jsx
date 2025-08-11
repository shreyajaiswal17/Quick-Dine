import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
// now we will get it from db

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = "http://localhost:4000";

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      // The curly braces {} create a new object.
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

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

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }
        loadData();
  }, []);

  // When the component first renders, it checks localStorage for a token.If found, it sets the token state.
  // This allows your app to remember a logged-in user across page reloads.
  // Without it, your token state would start empty every time the page is refreshed, even if the browser still has the token saved.

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
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
