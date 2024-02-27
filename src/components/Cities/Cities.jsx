import {useState, useRef} from "react";
import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";
import {useGetUserTrips} from "../../api/queries";
import Modal from "../Modal/Modal";
import {SlArrowRight} from "react-icons/sl";
import {SlArrowLeft} from "react-icons/sl";

const Cities = ({searchCity}) => {
    const {data: cities, isLoading, isError, error} = useGetUserTrips();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null); // Ref for accessing the scroll container

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

    // Function to scroll the container left
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        }
    };

    // Function to scroll the container right
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        }
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }
    if (isError) {
        return <h1>Error: {error}</h1>;
    }
    return (
        <div className="cities-container">
            <button className="scroll-arrow left" onClick={scrollLeft}>
                <SlArrowLeft />
            </button>
            <div className="scroll" ref={scrollRef}>
                <button className="add-city-button" onClick={handleModalOpen}>
                    <p className="plus">+</p>
                    <p>Add trip</p>
                </button>
                {filteredAndSortedCities.map((city) => (
                    <CityCard key={city.id} city={city} />
                ))}
                {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
            </div>
            <button className="scroll-arrow right" onClick={scrollRight}>
                <SlArrowRight />
            </button>
        </div>
    );
};

export default Cities;
