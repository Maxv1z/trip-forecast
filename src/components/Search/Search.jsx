import React from "react";
import "./Search.style.scss";
import {FaSearch} from "react-icons/fa"; // Import the search icon from react-icons

const Search = () => {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search your trip"
                    className="search-input"
                />
            </div>
        </div>
    );
};

export default Search;
