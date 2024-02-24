import React from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";

const Cities = () => {
    const cities = [1, 3, 56, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    return (
        <div className="cities-container">
            <div className="scroll">
                {cities.map((city) => (
                    <CityCard key={city.id} />
                ))}
            </div>
        </div>
    );
};

export default Cities;
