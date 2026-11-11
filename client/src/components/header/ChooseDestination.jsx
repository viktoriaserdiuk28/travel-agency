import "../header/header.css";
import Button from "../common/Button";
// import FormField from "./FormField";
import Bed from "../../assets/icons/bed.png";
import Select from "react-select";
import Notbed from "../../assets/icons/Notbed.png";
import Notplane from "../../assets/icons/Notplane.png";
import Plane from "../../assets/icons/plane.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChooseDestination({ initialHotels, initialTours }) {
  const [isChosen, setIsChosen] = useState("hotel");
  const [amountOfTravelers, setAmountOfTravelers] = useState(1);
  const [amountOfGuests, setAmountOfGuests] = useState(1);
  const [selectedCityHotels, setSelectedCityHotels] = useState([]);
  const [selectedCountryTours, setSelectedCountryTours] = useState([]);

  const navigate = useNavigate();

  function handleHotelSearch(e) {
    e.preventDefault();
    navigate(
      `/hotels?city=${selectedCityHotels.map((city) => city.value).join(",")}&guests=${amountOfGuests}`,
    );
  }

  function handleTourSearch(e) {
    e.preventDefault();
    navigate(
      `/tours?country=${selectedCountryTours.map((country) => country.value).join(",")}&travelers=${amountOfTravelers}`,
    );
  }

  // const [hotelPrices, setHotelPrices] = useState([]);
  function handleAddTraveler(e) {
    e.preventDefault();
    if (amountOfTravelers < 10) {
      setAmountOfTravelers((prev) => prev + 1);
    }
  }
  function handleDeleteTraveler(e) {
    e.preventDefault();
    if (amountOfTravelers > 1) {
      setAmountOfTravelers((prev) => prev - 1);
    }
  }
  function handleAddGuest(e) {
    e.preventDefault();
    if (amountOfGuests < 10) {
      setAmountOfGuests((prev) => prev + 1);
    }
  }
  function handleDeleteGuest(e) {
    e.preventDefault();
    if (amountOfGuests > 1) {
      setAmountOfGuests((prev) => prev - 1);
    }
  }
  function handleChooseOption(option) {
    setIsChosen(option);
  }

  function handleCityHotels(selectedValue) {
    setSelectedCityHotels(selectedValue);
  }
  function handleCountryTours(selectedValue) {
    setSelectedCountryTours(selectedValue);
  }

  const hotelCityOptions = [
    ...new Set(initialHotels.map((hotels) => hotels.city)),
  ].map((hotel) => ({
    label: hotel,
    value: hotel,
  }));

  const tourCountryOptions = [
    ...new Set(initialTours.map((tours) => tours.country)),
  ].map((tour) => ({
    label: tour,
    value: tour,
  }));

  return (
    <div className="choose-destination-container">
      <div className="choose-destination">
        <Button
          textColor={isChosen === "hotel" ? "#fff" : "#283841"}
          bgColor={isChosen === "hotel" ? "#C08B7D" : "#fff"}
          height="60px"
          width="171px"
          fontSize="16px"
          borderRadius="8px"
          fontWeight="600"
          className="choose-destination-bed-button"
          fontFamily=" DM Sans, sans-serif"
          onClick={() => handleChooseOption("hotel")}
        >
          <img src={isChosen === "hotel" ? Bed : Notbed} /> Hotels
        </Button>
        <Button
          textColor={isChosen === "tour" ? "#fff" : "#283841"}
          bgColor={isChosen === "tour" ? "#C08B7D" : "#fff"}
          height="60px"
          width="171px"
          fontSize="16px"
          borderRadius="8px"
          fontFamily=" DM Sans, sans-serif"
          fontWeight="600"
          className="choose-destination-plane-button"
          onClick={() => handleChooseOption("tour")}
        >
          <img src={isChosen === "tour" ? Plane : Notplane} />
          Tours
        </Button>
      </div>
      <div className="choose-information">
        {isChosen === "hotel" && (
          <div className="hotel-option">
            <form onSubmit={(e) => handleHotelSearch(e)}>
              <Select
                isMulti
                options={hotelCityOptions}
                value={selectedCityHotels}
                onChange={handleCityHotels}
                placeholder="Select city"
              />

              <div className="hotel-option-amount-of-guests">
                <p>Guests</p>
                <div className="hotel-option-guests">
                  <button onClick={(e) => handleDeleteGuest(e)}>-</button>
                  <p>{amountOfGuests}</p>
                  <button onClick={(e) => handleAddGuest(e)}>+</button>
                </div>
              </div>

              <Button
                textColor="#fff"
                bgColor="#C08B7D"
                height="48px"
                width="186px"
                fontSize="16px"
                borderRadius="8px"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                Search Hotels
              </Button>
            </form>
          </div>
        )}
        {isChosen === "tour" && (
          <div className="tour-option">
            <form onSubmit={(e) => handleTourSearch(e)}>
              <Select
                isMulti
                options={tourCountryOptions}
                value={selectedCountryTours}
                onChange={handleCountryTours}
                placeholder="Select country"
              />

              <div className="tour-option-amount-of-travelers">
                <p>Travelers</p>
                <div className="tour-option-travelers">
                  <button onClick={(e) => handleDeleteTraveler(e)}>-</button>
                  <p>{amountOfTravelers}</p>
                  <button onClick={(e) => handleAddTraveler(e)}>+</button>
                </div>
              </div>

              <Button
                textColor="#fff"
                bgColor="#C08B7D"
                height="48px"
                width="186px"
                fontSize="16px"
                borderRadius="8px"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                Search Tours
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChooseDestination;
