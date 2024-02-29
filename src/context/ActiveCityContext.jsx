import {useContext, createContext, useState} from "react";

const ActiveCityContext = createContext();

export const ActiveCityContextProvider = ({children}) => {
    const [activeCity, setActiveCity] = useState(null);

    const changeActiveCity = (cityData) => {
        setActiveCity(cityData);
    };

    return (
        <ActiveCityContext.Provider value={{activeCity, changeActiveCity}}>
            {children}
        </ActiveCityContext.Provider>
    );
};

// Custom hook to consume the context without calling it like a context
export const useActiveCity = () => {
    return useContext(ActiveCityContext);
};
