import {useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import Cities from "./components/Cities/Cities";
import Search from "./components/Search/Search";
import WeekView from "./components/WeekView/WeekView";
import DayView from "./components/DayView/DayView";

import "./App.style.scss";

export default function App() {
    const [searchCity, setSearchCity] = useState("");

    const handleSearchTermChange = (value) => {
        setSearchCity(value);
    };

    return (
        <>
            <div className="left-side">
                <Navbar className="navbar" />
                <Search className="search" searchCity={handleSearchTermChange} />
                <Cities className="cities" searchCity={searchCity} />
                <WeekView className="week-view" />
            </div>
            <div className="day-view">
                <DayView className="day-view" />
            </div>
        </>
    );
}
