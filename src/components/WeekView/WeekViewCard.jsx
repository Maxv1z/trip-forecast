import React from "react";
import "./WeekViewCard.style.scss";

const WeekViewCard = () => {
    return (
        <div className="card-container">
            <p className="day-of-the-week">Monday</p>
            <img
                src="https://cdn3.iconfinder.com/data/icons/weather-forecast-48/231/sunny-512.png"
                alt="weather image"
            />
            <p className="temperature">38/31</p>
        </div>
    );
};

export default WeekViewCard;
