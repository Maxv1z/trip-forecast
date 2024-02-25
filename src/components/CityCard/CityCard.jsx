import React from "react";
import "./CityCard.style.scss";

const CityCard = ({city}) => {
    function convertTimestampToDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const dateStart = convertTimestampToDate(city.dateStart);
    const dateEnd = convertTimestampToDate(city.dateEnd);

    return (
        <div className="city-card-container">
            <img
                src="https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_1920%2Cc_limit/BrandenburgGate_2018_GettyImages-549093677.jpg"
                alt=""
            />
            <div className="text-container">
                <h3>{city.cityName}</h3>
                <p>
                    {dateStart} - {dateEnd}
                </p>
            </div>
        </div>
    );
};

export default CityCard;
