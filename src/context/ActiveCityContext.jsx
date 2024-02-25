import {useContext, createContext, useState} from "react";

// Step 1: Define the context
const ActiveCityContext = createContext();

export const ActiveCityContextProvider = ({children}) => {
    // Step 2: Manage the state of the active city
    const [activeCity, setActiveCity] = useState(null);

    // Step 3: Define function to update the active city
    const changeActiveCity = (cityData) => {
        setActiveCity(cityData);
    };

    // Step 4: Wrap components with the context provider
    return (
        <ActiveCityContext.Provider value={{activeCity, changeActiveCity}}>
            {children}
        </ActiveCityContext.Provider>
    );
};

// Custom hook to consume the context
export const useActiveCity = () => {
    return useContext(ActiveCityContext);
};
