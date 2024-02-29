import "./Modal.style.scss";

import {useState, useRef} from "react";
import {MdClose} from "react-icons/md";
import cities from "../../assets/cities.js";

import {addTripToDb} from "../../api";
import {useUserAuth} from "../../context/AuthContext";
import {useQueryClient} from "@tanstack/react-query";

const Modal = ({closeModal}) => {
    const queryClient = useQueryClient();

    const [city, setCity] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const modalRef = useRef(null);

    const user = useUserAuth();
    const userId = user?.user.uid;

    ///////// date operations to allow
    ///////// choose date from today to next 15 days
    const today = new Date().toISOString().split("T")[0];
    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(fifteenDaysFromNow.getDate() + 15);
    const maxDate = fifteenDaysFromNow.toISOString().split("T")[0];
    /////////

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(dateEnd) <= new Date(dateStart)) {
            alert("End date must be greater than start date");
            return;
        }
        addTripToDb(dateStart, dateEnd, userId, city);

        setCity("");
        setDateStart("");
        setDateEnd("");
        queryClient.invalidateQueries("trips");
        closeModal();
    };

    return (
        <div className="modal">
            <div className="overlay" onClick={closeModal}>
                <div
                    className="modal-content"
                    ref={modalRef}
                    onClick={(e) => e.stopPropagation()}
                >
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
                            required
                        />
                        <label htmlFor="dateEnd">End Date</label>
                        <input
                            type="date"
                            id="dateEnd"
                            min={today}
                            max={maxDate}
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
