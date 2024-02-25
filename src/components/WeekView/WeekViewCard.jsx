import React from "react";
import "./WeekViewCard.style.scss";
import {format} from "date-fns";

const WeekViewCard = ({day}) => {
    // Format the date string to display the day of the week
    const dayOfWeek = format(new Date(day.datetime), "EEEE");

    return (
        <div className="card-container">
            <p className="day-of-the-week">{dayOfWeek}</p>
            <img src={`src/assets/icons/${day.icon}.svg`} alt="weather image" />
            <p className="temperature">
                {day?.tempmax}°C/{day?.tempmin}°C
            </p>
        </div>
    );
};

export default WeekViewCard;
