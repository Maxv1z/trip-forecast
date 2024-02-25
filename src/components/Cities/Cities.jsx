import React from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";

import {useGetUserTrips} from "../../api/queries";
import {UserAuth} from "../../context/AuthContext";

const Cities = () => {
    const user = UserAuth();
    const {data: cities, isLoading, isError, error} = useGetUserTrips();

    // const cities = getUserTrips();
    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (isError) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="cities-container">
            <div className="scroll">
                {cities?.map((city) => (
                    <CityCard key={city.id} city={city} />
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
