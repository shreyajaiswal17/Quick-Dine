import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {   

    
    const contextValue = {
        food_list
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