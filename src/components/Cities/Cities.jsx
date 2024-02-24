import React from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";

const Cities = () => {
    const cities = [1, 3, 56, 6, 1];

    return (
        <div className="cities-container">
            <div className="scroll">
                {cities.map((city, index) => (
                    <CityCard key={index} city={city} />
                ))}
                <button className="add-city-button">
                    <p className="plus">+</p>
                    <p>Add trip</p>
                </button>
            </div>
        </div>
    );
};

export default Cities;
