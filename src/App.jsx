import Navbar from "./components/Navbar/Navbar";
import Cities from "./components/Cities/Cities";
import Search from "./components/Search/Search";
import WeekView from "./components/WeekView/WeekView";
import DayView from "./components/DayView/DayView";

import "./App.style.scss";

export default function App() {
    return (
        <>
            <div className="left-side">
                <Navbar className="navbar" />
                <Search className="search" />
                <Cities className="cities" />
                <WeekView className="week-view" />
            </div>
            <div className="day-view">
                <DayView className="day-view" />
            </div>
        </>
    );
}
