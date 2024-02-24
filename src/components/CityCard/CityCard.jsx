import React from "react";
import "./CityCard.style.scss";

const CityCard = () => {
    return (
        <div className="city-card-container">
            <img
                src="https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_1920%2Cc_limit/BrandenburgGate_2018_GettyImages-549093677.jpg"
                alt=""
            />
            <div className="text-container">
                <h3>City name</h3>
                <p>14.07.1811 - 14.07.1811</p>
            </div>
        </div>
    );
};

export default CityCard;
