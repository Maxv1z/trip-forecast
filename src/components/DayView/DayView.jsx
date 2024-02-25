import React, {useEffect, useState} from "react";
import "./DayView.style.scss";
import {getDayWeather} from "../../api";
import {useActiveCity} from "../../context/ActiveCityContext";
import {format} from "date-fns";

const DayView = () => {
    const [weather, setWeather] = useState(null); // State to store weather data
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }); // State for countdown values
    const city = useActiveCity();

    let interval;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherData = await getDayWeather(city.activeCity.cityName);
                setWeather(weatherData);
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };

        if (city) {
            fetchWeather();
        }

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [city]);

    useEffect(() => {
        // Update countdown only when city or city's dateStart changes
        if (city?.activeCity?.dateStart) {
            interval = setInterval(updateCountdown, 1000);
            return () => clearInterval(interval);
        }
    }, [city, city?.activeCity?.dateStart]);

    const updateCountdown = () => {
        if (!city || !city.activeCity.dateStart) return;

        const startDateInSeconds = city.activeCity.dateStart.seconds || 0;
        const startDateInMilliseconds = startDateInSeconds * 1000;

        const startDate = new Date(startDateInMilliseconds);
        const currentDate = new Date();

        const totalSeconds = Math.floor((startDate - currentDate) / 1000);

        if (totalSeconds <= 0) {
            setCountdown({days: 0, hours: 0, minutes: 0, seconds: 0});
            return;
        }

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        setCountdown({days, hours, minutes, seconds});
    };

    // Get the day of the week from the weather data
    const dayOfWeek = weather
        ? format(new Date(weather?.days[0]?.datetime), "EEEE")
        : null;

    console.log("DAY OF WEEK", dayOfWeek);

    return (
        <div className="day-view-container">
            <div className="day-weather">
                <h3>{dayOfWeek}</h3>
                <div className="weather-and-temp">
                    <img src={`src/assets/icons/${weather?.days[0]?.icon}.svg`} alt="" />
                    <p>{weather ? weather.days[0].temp : ""}°C</p>
                </div>
                <p className="city-name">{weather ? weather.address : ""}</p>
            </div>
            <div className="countdown">
                <div className="countdown-item">
                    <span id="days">
                        {countdown.days < 10 ? "0" + countdown.days : countdown.days}
                    </span>
                    <span>Days</span>
                </div>
                <div className="countdown-item">
                    <span id="hours">
                        {countdown.hours < 10 ? "0" + countdown.hours : countdown.hours}
                    </span>
                    <span>Hours</span>
                </div>
                <div className="countdown-item">
                    <span id="minutes">
                        {countdown.minutes < 10
                            ? "0" + countdown.minutes
                            : countdown.minutes}
                    </span>
                    <span>Minutes</span>
                </div>
                <div className="countdown-item">
                    <span id="seconds">
                        {countdown.seconds < 10
                            ? "0" + countdown.seconds
                            : countdown.seconds}
                    </span>
                    <span>Seconds</span>
                </div>
            </div>
        </div>
    );
};

export default DayView;
