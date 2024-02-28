import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";
import Modal from "../Modal/Modal";

import {useState, useRef, useEffect} from "react";
import {useGetUserTrips} from "../../api/queries";

import {SlArrowLeft} from "react-icons/sl";
import {SlArrowRight} from "react-icons/sl";

const Cities = ({searchCity}) => {
    const {data: cities, isLoading, isError, error} = useGetUserTrips();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    useEffect(() => {
        console.log("search city is updated");
    }, [searchCity]);

    const sortedCities = cities?.slice().sort((a, b) => {
        return new Date(a.dateStart) - new Date(b.dateStart);
    });

    const filteredAndSortedCities = sortedCities?.filter((city) =>
        city.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        }
    };

    if (isLoading) {
        return (
            <div className="loader-container">
                <h1>Loading your trips :)</h1>
            </div>
        );
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
                    <CityCard key={city.id} city={city} isLoading={isLoading} />
                ))}
                {isModalOpen && <Modal closeModal={handleModalClose} />}
            </div>
            <button className="scroll-arrow right" onClick={scrollRight}>
                <SlArrowRight />
            </button>
        </div>
    );
};

export default Cities;
