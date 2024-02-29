import "./Cities.style.scss";
import CityCard from "../CityCard/CityCard";
import Modal from "../Modal/Modal";

import {useState, useRef} from "react";
import {useGetUserTrips} from "../../api/queries";

import {SlArrowLeft} from "react-icons/sl";
import {SlArrowRight} from "react-icons/sl";

const Cities = ({searchCity}) => {
    const {data: cities, isLoading, isError, error} = useGetUserTrips();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null);

    const handleModalToggle = (isOpen) => {
        setIsModalOpen(isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    };

    /// useEffect to check search city updated function
    // useEffect(() => {
    //     console.log("search city is updated");
    // }, [searchCity]);

    const sortedCities = cities?.slice().sort((a, b) => {
        return new Date(a.dateStart) - new Date(b.dateStart);
    });

    const filteredAndSortedCities = sortedCities?.filter((city) =>
        city.cityName.toLowerCase().includes(searchCity.toLowerCase())
    );

    const scroll = (side) => {
        if (scrollRef.current) {
            const scrollOptions = {
                behavior: "smooth",
            };

            if (side === "left") {
                scrollOptions.left = -200;
            } else if (side === "right") {
                scrollOptions.left = 200;
            }

            scrollRef.current.scrollBy(scrollOptions);
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
            <button className="scroll-arrow left" onClick={() => scroll("left")}>
                <SlArrowLeft />
            </button>
            <div className="scroll" ref={scrollRef}>
                <button
                    className="add-city-button"
                    onClick={() => handleModalToggle(true)}
                >
                    <p className="plus">+</p>
                    <p>Add trip</p>
                </button>
                {filteredAndSortedCities.map((city) => (
                    <CityCard key={city.id} city={city} isLoading={isLoading} />
                ))}
                {isModalOpen && <Modal closeModal={() => handleModalToggle(false)} />}
            </div>
            <button className="scroll-arrow right" onClick={() => scroll("right")}>
                <SlArrowRight />
            </button>
        </div>
    );
};

export default Cities;
