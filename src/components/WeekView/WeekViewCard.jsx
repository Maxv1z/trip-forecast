import React from "react";
import "./WeekViewCard.style.scss";
import {format} from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeekViewCard = ({day, loading}) => {
    // Format the date string to display the day of the week
    const dayOfWeek = format(new Date(day.datetime), "EEEE");

    return (
        <div className="card-container">
            {loading ? (
                <div className="skeleton-wrapper">
                    <Skeleton height={10} width={100} />
                    <Skeleton
                        circle={true}
                        height={50}
                        width={50}
                        style={{marginTop: "15px"}}
                    />
                    <Skeleton height={15} width={80} style={{marginTop: "15px"}} />
                </div>
            ) : (
                <>
                    <p className="day-of-the-week">{dayOfWeek}</p>
                    <img src={`src/assets/icons/${day.icon}.svg`} alt="weather image" />
                    <p className="temperature">
                        {day?.tempmax}°C/{day?.tempmin}°C
                    </p>
                </>
            )}
        </div>
    );
};

export default WeekViewCard;
