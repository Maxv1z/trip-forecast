import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./components/Navbar/Navbar";
import {AuthContextProvider} from "./context/AuthContext";
import Cities from "./components/Cities/Cities";
import Search from "./components/Search/Search";
import WeekView from "./components/WeekView/WeekView";
import DayView from "./components/DayView/DayView";

import "./App.style.scss";

const queryClient = new QueryClient();

export default function App() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <div className="left-side">
                    <Navbar className="navbar" />
                    <Search className="search" />
                    <Cities className="cities" />
                    <WeekView className="week-view" />
                </div>
                <div className="day-view">
                    <DayView className="day-view" />
                </div>
            </QueryClientProvider>
        </AuthContextProvider>
    );
}
