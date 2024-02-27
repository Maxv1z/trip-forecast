import React, {useState, useEffect} from "react";
import "./Search.style.scss";
import {FaSearch} from "react-icons/fa";

const Search = ({searchCity}) => {
    const [city, setCity] = useState("");
    const [typingTimeout, setTypingTimeout] = useState(0);

    const handleSearchCityChange = (event) => {
        const value = event.target.value;
        setCity(value);

        clearTimeout(typingTimeout);

        setTypingTimeout(
            setTimeout(() => {
                searchCity(value);
            }, 1500)
        );
    };

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    value={city}
                    onChange={handleSearchCityChange}
                    placeholder="Search your trip"
                    className="search-input"
                />
            </div>
        </div>
    );
};

export default Search;
