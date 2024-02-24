import React from "react";
import "./WeekView.style.scss";
import WeekViewCard from "./WeekViewCard";

const WeekView = () => {
    const week = [1, 3, 4, 5, 6, 10];
    return (
        <div className="week-view-container">
            <h1>Week</h1>
            <div className="scroll">
                {week.map((day) => (
                    <WeekViewCard key={day} />
                ))}
            </div>
        </div>
    );
};

export default WeekView;
