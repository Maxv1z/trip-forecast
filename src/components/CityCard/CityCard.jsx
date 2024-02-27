import "./CityCard.style.scss";

import {useActiveCity} from "../../context/ActiveCityContext";
import {deleteTripFromDb} from "../../api";

import {SlClose} from "react-icons/sl";
import {useQueryClient} from "@tanstack/react-query";

const CityCard = ({city}) => {
    const queryClient = useQueryClient();
    const {changeActiveCity} = useActiveCity();

    const handleClick = () => {
        changeActiveCity(city);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteTripFromDb(city.id);
        queryClient.invalidateQueries("trips");
    };

    return (
        <div className="city-card-container" onClick={handleClick}>
            <button className="close-button" onClick={handleDelete}>
                <SlClose />
            </button>
            <img
                src="https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/16:9/w_1920%2Cc_limit/BrandenburgGate_2018_GettyImages-549093677.jpg"
                alt=""
            />
            <div className="text-container">
                <h3>{city.cityName}</h3>
                <div className="dates">
                    <p>{city.dateStart}</p>
                    <p id="date-end">{city.dateEnd}</p>
                </div>
            </div>
        </div>
    );
};

export default CityCard;
