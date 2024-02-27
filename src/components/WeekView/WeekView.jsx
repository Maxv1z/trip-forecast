import {useState, useEffect} from "react";
import "./WeekView.style.scss";
import WeekViewCard from "./WeekViewCard";
import {useActiveCity} from "../../context/ActiveCityContext";
import {getWeekWeather} from "../../api";
import {format} from "date-fns";

const WeekView = () => {
    const [forecast, setForecast] = useState(null);
    const city = useActiveCity();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const forecastData = await getWeekWeather(
                    city.activeCity.cityName,
                    city.activeCity.dateStart,
                    city.activeCity.dateEnd
                );
                setForecast(forecastData);
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };

        if (city && city.activeCity) {
            fetchWeather();
        }
    }, [city]);

    return (
        <div className="week-view-container">
            <h1>Forecast</h1>
            <div className="scroll">
                {forecast ? (
                    forecast.days.map((day, index) => (
                        <WeekViewCard key={index} day={day} />
                    ))
                ) : (
                    <h3>Choose a city to view a forecast for it :)</h3>
                )}
            </div>
        </div>
    );
};

export default WeekView;
