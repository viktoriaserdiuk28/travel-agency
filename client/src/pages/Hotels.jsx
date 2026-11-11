import { Link, useSearchParams } from "react-router-dom";
import HotelCard from "../components/main/HotelCard";
import "./hotelsTours.css";
import Select from "react-select";
import { useState } from "react";
import Modal from "react-modal";

function Hotels({
  initialHotels,
  setInitialHotels,
  reviewsData,
  handleAddNewFavoriteHotel,
  favoriteHotels,
  handleDeleteFavoriteHotel,
}) {
  const [deletionId, setDeletionId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const guests = searchParams.get("guests");

  const [price, setPrice] = useState({
    min_price: "",
    max_price: "",
  });

  const cityArray = city ? city.split(",") : [];
  const allCities = cityArray.map((city) => ({
    value: city,
    label: city,
  }));

  const [amountOfGuests, setAmountOfGuests] = useState(Number(guests));
  const [selectedCityHotels, setSelectedCityHotels] = useState(allCities);
  function handleCityHotels(selectedValue) {
    setSelectedCityHotels(selectedValue);
  }

  const hotelCityOptions = [
    ...new Set(initialHotels.map((hotels) => hotels.city)),
  ].map((hotel) => ({
    label: hotel,
    value: hotel,
  }));

  function handleHotelPrice(value, name) {
    setPrice({ ...price, [name]: value });
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

  function handleModalIsOpen() {
    setModalIsOpen(true);
  }

  function handleDeleteHotels(id) {
    fetch(`http://localhost:3000/hotels/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setInitialHotels((hotels) =>
            hotels.filter((hotel) => hotel.id !== id),
          );
          setModalIsOpen(false);
        } else {
          throw new Error("delete hotels fetch error");
        }
      })
      .catch((err) => {
        console.error("fetch delete error: ", err);
      });
  }

  function handleHotelsFilter(e) {
    e.preventDefault();
  }

  return (
    <div className="hotels-container">
      <div className="hotel-container-sort-search">
        <div className="hotels-container-sort">
          <select>
            <option>Sort hotels</option>
            <option>Price (from high to low)</option>
            <option>Price (from low to high)</option>
            <option>Rating (from high to low)</option>
            <option>Rating (from low to high)</option>
          </select>
        </div>
        <div className="hotels-container-search">
          <input type="search" />
        </div>
      </div>
      <div className="hotel-container">
        <div className="hotel-container-filter">
          <form onSubmit={(e) => handleHotelsFilter(e)}>
            <div>
              <p>Selected cities</p>
              <Select
                isMulti
                options={hotelCityOptions}
                value={selectedCityHotels}
                onChange={handleCityHotels}
                placeholder="Select city"
              />
            </div>
            <div>
              <p>Number of guests</p>
              <div className="hotel-container-option-guests">
                <button onClick={(e) => handleDeleteGuest(e)}>-</button>
                <p>{amountOfGuests}</p>
                <button onClick={(e) => handleAddGuest(e)}>+</button>
              </div>
            </div>

            <div className="hotel-container-filter-prices">
              <p>Price</p>
              <div className="hotel-container-filter-price">
                <div>
                  <p>Minimum ($)</p>
                  <input
                    type="number"
                    value={price.min_price}
                    name="min_price"
                    onChange={(e) =>
                      handleHotelPrice(e.target.value, e.target.name)
                    }
                  />
                </div>
                <div>
                  <p>Maximum ($)</p>
                  <input
                    type="number"
                    value={price.max_price}
                    name="max_price"
                    onChange={(e) =>
                      handleHotelPrice(e.target.value, e.target.name)
                    }
                  />
                </div>
              </div>
            </div>

            <button className="hotel-container-filter-apply-button">
              Apply filters
            </button>
          </form>
        </div>

        <div className="hotel-container-hotel-card">
          {initialHotels.map((hotels) => {
            const hotelReviews = reviewsData.filter(
              (review) => review.hotel_id === hotels.id,
            );
            const hotelAverageRating =
              hotelReviews.length > 0
                ? hotelReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  hotelReviews.length
                : null;
            return (
              <HotelCard
                key={hotels.id}
                name={hotels.name}
                country={hotels.country}
                city={hotels.city}
                image_url={hotels.image_url}
                price={hotels.price}
                max_guests={hotels.max_guests}
                hotelAverageRating={hotelAverageRating}
                variant="catalog"
                handleAddNewFavoriteHotel={() =>
                  handleAddNewFavoriteHotel(hotels.id)
                }
                favoriteHotels={favoriteHotels}
                favoriteHotelsId={hotels.id}
                handleDeleteFavoriteHotel={() =>
                  handleDeleteFavoriteHotel(hotels.id)
                }
                type="hotel"
              >
                <div className="hotel-card-buttons">
                  <div className="hotel-card-delete-button">
                    <button
                      onClick={() => {
                        setDeletionId(hotels.id);
                        handleModalIsOpen();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {deletionId !== null && deletionId === hotels.id && (
                    <Modal
                      className="hotel-modal"
                      overlayClassName="modal-overlay"
                      isOpen={modalIsOpen}
                    >
                      <div>
                        <p>Are you sure you want to delete this hotel?</p>
                      </div>
                      <div className="modal-buttons">
                        <button
                          className="modal-delete-button"
                          onClick={() => {
                            handleDeleteHotels(deletionId);
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
                      className="hotel-card-details-link"
                      to={`/hotels/${hotels.id}`}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </HotelCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
