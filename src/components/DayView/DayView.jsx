import React from "react";
import "./DayView.style.scss";

const DayView = () => {
    return (
        <div className="day-view-container">
            <div className="day-weather">
                <h3>Sunday</h3>
                <div className="weather-and-temp">
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/weather-forecast-48/231/sunny-512.png"
                        alt=""
                    />
                    <p>35</p>
                </div>
                <p className="city-name">Berlin</p>
            </div>
            <div class="countdown">
                <div class="countdown-item">
                    <span id="days">00</span>
                    <span>Days</span>
                </div>
                <div class="countdown-item">
                    <span id="hours">00</span>
                    <span>Hours</span>
                </div>
                <div class="countdown-item">
                    <span id="minutes">00</span>
                    <span>Minutes</span>
                </div>
                <div class="countdown-item">
                    <span id="seconds">00</span>
                    <span>Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default DayView;
