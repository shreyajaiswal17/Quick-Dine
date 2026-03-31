import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
// now we will get it from db

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  console.log("🚀 Backend URL being used:", url); // Debug log

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      // The curly braces {} create a new object.
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url + "/api/cart/add", { itemId },{
        withCredentials: true
      });
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url + "/api/cart/remove", { itemId },{
        withCredentials: true
      });
    }
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

  const loadCartData = async () => {
    if (token) {
      const response = await axios.post(url + "/api/cart/get", {}, {
        withCredentials: true
      });
      setCartItems(response.data.cartData);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      // Verify auth status with backend (cookie is auto-sent)
      try {
        const response = await axios.post(url + "/api/user/verify", {}, {
          withCredentials: true
        });
        if (response.data.success && response.data.token) {
          setToken(response.data.token);
          await loadCartData();
        }
      } catch (error) {
        console.log("User not authenticated");
      }
    }
    loadData();
  }, []);

// 6. Browser reloads (or navigates elsewhere)
// 7. StoreContext's useEffect runs
// 8. Calls /api/user/verify with cookies auto-attached ✅
// 9. Backend verifies cookie & returns success
// 10. User stays logged in! No need for manual token management in localStorage. Just rely on cookies and backend verification on each load.

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
