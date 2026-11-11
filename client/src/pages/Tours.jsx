import TourCard from "../components/main/TourCard";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./hotelsTours.css";
import Modal from "react-modal";
import Select from "react-select";

function Tours({
  initialTours,
  setInitialTours,
  reviewsData,
  handleAddNewFavoriteTour,
  favoriteTours,
  handleDeleteFavoriteTour,
}) {
  const [deletionId, setDeletionId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const travelers = searchParams.get("travelers");

  const [tourData, setTourData] = useState({
    min_price: "",
    max_price: "",
    min_age: "",
    max_age: "",
    duration: "",
  });

  const countryArray = country ? country.split(",") : [];
  const allCountries = countryArray.map((country) => ({
    value: country,
    label: country,
  }));

  const [amountOfTravelers, setAmountOfTravelers] = useState(Number(travelers));
  const [selectedCountryTours, setSelectedCountryTours] =
    useState(allCountries);
  function handleCountryTours(selectedValue) {
    setSelectedCountryTours(selectedValue);
  }

  const tourCountryOptions = [
    ...new Set(initialTours.map((tours) => tours.country)),
  ].map((tour) => ({
    label: tour,
    value: tour,
  }));

  function handleTourData(value, name) {
    setTourData({ ...tourData, [name]: value });
  }

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
  function handleToursDelete(id) {
    fetch(`http://localhost:3000/tours/${id}`, { method: "DELETE" }).then(
      (res) => {
        if (res.ok) {
          setInitialTours((tours) => tours.filter((tour) => tour.id !== id));
        } else {
          throw new Error("tourDelete fetch error");
        }
      },
    );
  }
  function handleModalIsOpen() {
    setModalIsOpen(true);
  }

  function handleToursFilter(e) {
    e.preventDefault();
  }

  return (
    <div className="tours-container">
      <div className="tour-container-sort-search">
        <div className="tours-container-sort">
          <select>
            <option>Price (from high to low)</option>
            <option>Price (from low to high)</option>
            <option>Rating (from high to low)</option>
            <option>Rating (from low to high)</option>
            <option>Group size (from large to small)</option>
            <option>Group size (from small to large)</option>
          </select>
        </div>
        <div className="tours-container-search">
          <input type="search" />
        </div>
      </div>
      <div className="tour-container">
        <div className="tour-container-filter">
          <form onSubmit={(e) => handleToursFilter(e)}>
            <div>
              <p>Selected country</p>
              <Select
                isMulti
                options={tourCountryOptions}
                value={selectedCountryTours}
                onChange={handleCountryTours}
                placeholder="Select city"
              />
            </div>
            <div>
              <p>Number of travelers</p>
              <div className="tour-container-option-travelers">
                <button onClick={(e) => handleDeleteTraveler(e)}>-</button>
                <p>{amountOfTravelers}</p>
                <button onClick={(e) => handleAddTraveler(e)}>+</button>
              </div>
            </div>

            <div className="tour-container-filter-duration">
              <div>
                <p>Duration (days)</p>
                <input
                  type="number"
                  value={tourData.duration}
                  name="duration"
                  onChange={(e) =>
                    handleTourData(e.target.value, e.target.name)
                  }
                />
              </div>
            </div>

            <div className="tour-container-filter-prices">
              <p>Price</p>
              <div className="tour-container-filter-price">
                <div>
                  <p>Minimum ($)</p>
                  <input
                    type="number"
                    value={tourData.min_price}
                    name="min_price"
                    onChange={(e) =>
                      handleTourData(e.target.value, e.target.name)
                    }
                  />
                </div>
                <div>
                  <p>Maximum ($)</p>
                  <input
                    type="number"
                    value={tourData.max_price}
                    name="max_price"
                    onChange={(e) =>
                      handleTourData(e.target.value, e.target.name)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="tour-container-filte-ages">
              <p>Age</p>
              <div className="tour-container-filte-age">
                <div>
                  <p>Minimum (1)</p>
                  <input
                    type="number"
                    value={tourData.min_age}
                    name="min_age"
                    onChange={(e) =>
                      handleTourData(e.target.value, e.target.name)
                    }
                  />
                </div>
                <div>
                  <p>Maximum (100)</p>
                  <input
                    type="number"
                    value={tourData.max_age}
                    name="max_age"
                    onChange={(e) =>
                      handleTourData(e.target.value, e.target.name)
                    }
                  />
                </div>
              </div>
            </div>
            <button className="tour-container-filter-apply-button">
              Apply filters
            </button>
          </form>
        </div>

        <div className="tour-container-tour-card">
          {initialTours.map((tours) => {
            const tourReviews = reviewsData.filter(
              (review) => review.tour_id === tours.id,
            );
            const tourAverageRating =
              tourReviews.length > 0
                ? tourReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  tourReviews.length
                : null;
            return (
              <TourCard
                key={tours.id}
                name={tours.name}
                country={tours.country}
                group_size={tours.group_size}
                min_age={tours.min_age}
                max_age={tours.max_age}
                price={tours.price}
                duration={tours.duration}
                image_url={tours.image_url}
                tourAverageRating={tourAverageRating}
                handleAddNewFavoriteTour={() =>
                  handleAddNewFavoriteTour(tours.id)
                }
                variant="catalog"
                favoriteTours={favoriteTours}
                favoriteToursId={tours.id}
                handleDeleteFavoriteTour={() =>
                  handleDeleteFavoriteTour(tours.id)
                }
                type="tour"
              >
                <div className="tour-card-buttons">
                  <div className="tour-card-delete-button">
                    <button
                      onClick={() => {
                        setDeletionId(tours.id);
                        handleModalIsOpen();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {deletionId !== null && deletionId === tours.id && (
                    <Modal
                      className="tour-modal"
                      overlayClassName="modal-overlay"
                      isOpen={modalIsOpen}
                    >
                      <div>
                        <p>Are you sure you want to delete this tour?</p>
                      </div>
                      <div className="modal-buttons">
                        <button
                          className="modal-delete-button"
                          onClick={() => {
                            handleToursDelete(deletionId);
                            setDeletionId(null);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          className="modal-cancel-button"
                          onClick={() => {
                            setDeletionId(null);
                            setModalIsOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </Modal>
                  )}

                  <div>
                    <Link
                      className="tour-card-details-link"
                      to={`/tours/${tours.id}`}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </TourCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Tours;
