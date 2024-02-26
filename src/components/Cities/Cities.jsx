import {useState} from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";
import {useGetUserTrips} from "../../api/queries";
import Modal from "../Modal/Modal";

const Cities = ({searchCity}) => {
    const {data: cities, isLoading, isError, error} = useGetUserTrips();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    // Sort cities based on dateStart
    const sortedCities = cities?.slice().sort((a, b) => {
        return new Date(a.dateStart) - new Date(b.dateStart);
    });

    // Filter and sort cities based on searchCity and cityName
    const filteredAndSortedCities = sortedCities?.filter((city) =>
        city.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (isError) {
        return <h1>Error: {error}</h1>;
    }
    return (
        <div className="cities-container">
            <div className="scroll">
                {filteredAndSortedCities.map((city) => (
                    <CityCard key={city.id} city={city} />
                ))}
                <button className="add-city-button" onClick={handleModalOpen}>
                    <p className="plus">+</p>
                    <p>Add trip</p>
                </button>
                {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
            </div>
        </div>
    );
};

export default Cities;
