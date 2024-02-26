import React from "react";
import "./CityCard.style.scss";
import {useActiveCity} from "../../context/ActiveCityContext";

const CityCard = ({city}) => {
    const {changeActiveCity} = useActiveCity();

    const handleClick = () => {
        changeActiveCity(city);
    };

    return (
        <div className="city-card-container" onClick={handleClick}>
            <img
                src="https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_1920%2Cc_limit/BrandenburgGate_2018_GettyImages-549093677.jpg"
                alt=""
            />
            <div className="text-container">
                <h3>{city.cityName}</h3>
                <div className="dates">
                    <p>{city.dateStart}</p>
                    <p id="date-end">{city.dateEnd}</p>
                </div>
            </div>
        </div>
    );
};

export default CityCard;
