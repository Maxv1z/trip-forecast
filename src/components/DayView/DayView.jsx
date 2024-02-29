import "./DayView.style.scss";
import {useEffect, useState} from "react";
import {format} from "date-fns";

import {getDayWeather} from "../../api";
import {useActiveCity} from "../../context/ActiveCityContext";
import Countdown from "./CountDown";

const DayView = () => {
    const [weather, setWeather] = useState(null);

    const city = useActiveCity();

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
    }, [city]);

    const dayOfWeek = weather
        ? format(new Date(weather?.days[0]?.datetime), "EEEE")
        : null;

    return (
        <div className="day-view-container">
            {city.activeCity !== null ? (
                <>
                    <div className="day-weather">
                        <h3>{dayOfWeek}</h3>
                        <div className="weather-and-temp">
                            <p>
                                <img
                                    src={`src/assets/icons/${weather?.days[0]?.icon}.svg`}
                                    alt=""
                                />
                                {weather ? weather.days[0].temp : "No temp :)"}
                                <span className="celsius">°C</span>
                            </p>
                        </div>
                        <p className="city-name">{weather ? weather.address : ""}</p>
                    </div>
                    {city?.activeCity?.dateStart && (
                        <Countdown startDate={city?.activeCity?.dateStart} />
                    )}
                </>
            ) : (
                <div className="chose-city">
                    <h1>Choose a city to view today's weather :)</h1>
                </div>
            )}
        </div>
    );
};

export default DayView;
