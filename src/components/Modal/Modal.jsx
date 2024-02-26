import React, {useState, useRef} from "react";
import "./Modal.style.scss";
import {MdClose} from "react-icons/md";
import cities from "../../assets/Cities";
import {addTripToDb} from "../../api";
import {UserAuth} from "../../context/AuthContext";

const Modal = ({closeModal}) => {
    const user = UserAuth();
    const userId = user?.user.uid;
    const [city, setCity] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const modalRef = useRef(null);

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Get the date for 15 days from now
    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(fifteenDaysFromNow.getDate() + 15);
    const maxDate = fifteenDaysFromNow.toISOString().split("T")[0];

    const handleSubmit = (event) => {
        event.preventDefault();
        if (new Date(dateEnd) <= new Date(dateStart)) {
            alert("End date must be greater than start date");
            return;
        }
        addTripToDb(dateStart, dateEnd, userId, city);
        setCity("");
        setDateStart("");
        setDateEnd("");
        closeModal();
    };

    return (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content" ref={modalRef}>
                    <div className="top-div">
                        <h3>Create trip</h3>
                        <MdClose onClick={closeModal} id="close-button" />
                    </div>
                    <span></span>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="city">City</label>
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            <option value="">Please select a city</option>
                            {cities.map((cityName, index) => (
                                <option key={index} value={cityName}>
                                    {cityName}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="dateStart">Start Date</label>
                        <input
                            type="date"
                            id="dateStart"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                            min={today}
                            max={maxDate}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    e.target.type = "text";
                                    e.target.value = "Select date";
                                }
                            }}
                            required
                        />
                        <label htmlFor="dateEnd">End Date</label>
                        <input
                            type="date"
                            id="dateEnd"
                            min={today}
                            max={maxDate}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                if (!e.target.value) {
                                    e.target.type = "text";
                                    e.target.value = "Select date";
                                }
                            }}
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                            required
                        />
                        <div className="bottom-buttons">
                            <span></span>
                            <div className="buttons">
                                <button onClick={closeModal} id="cancel">
                                    Cancel
                                </button>
                                <button type="submit" id="save">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
