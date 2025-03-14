// import { createContext } from "react"
// import { food_list } from "../assets/assets"


// export const StoreContext = createContext(null)


// const StoreContextProvider = (props) =>{



//     const contextValue ={
//         food_list
//     }

//     return(
//         <StoreContext.Provider value ={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     )
// }

// export default StoreContextProvider;

import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {  // ✅ Destructure props properly
    const contextValue = {
        food_list
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}   
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
