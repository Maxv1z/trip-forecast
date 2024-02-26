import {useState} from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";

import {useGetUserTrips} from "../../api/queries";
import {UserAuth} from "../../context/AuthContext";
import Modal from "../Modal/Modal";

const Cities = () => {
    const {data: cities, isLoading, isError, error} = useGetUserTrips();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    // const cities = getUserTrips();
    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (isError) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="cities-container">
            <div className="scroll">
                {cities?.map((city) => (
                    <CityCard key={city.id} city={city} />
                ))}
                <button className="add-city-button" onClick={handleModalOpen}>
                    <p className="plus">+</p>
                    <p>Add trip</p>
                </button>
                {isModalOpen && (
                    <Modal
                        closeModal={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Cities;
