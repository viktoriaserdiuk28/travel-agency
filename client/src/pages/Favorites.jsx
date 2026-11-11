import { useState } from "react";
import Button from "../components/common/Button";
import HotelCard from "../components/main/HotelCard";
import "./favorites.css";
import TourCard from "../components/main/TourCard";

function Favorites({
  favoriteTours,
  favoriteHotels,
  handleDeleteFavoriteHotel,
  handleDeleteFavoriteTour,
}) {
  const [chosenList, setChosenList] = useState("tours");
  return (
    <div className="favorite-container">
      <div className="favorite-buttons">
        <Button
          textColor="#fff"
          bgColor="#C08B7D"
          height="50px"
          width="800px"
          borderRadius="10px"
          onClick={() => setChosenList("tours")}
        >
          Favorite tours
        </Button>
        <Button
          textColor="#fff"
          bgColor="#C08B7D"
          height="50px"
          width="800px"
          borderRadius="10px"
          onClick={() => setChosenList("hotels")}
        >
          Favorite hotels
        </Button>
      </div>
      {chosenList === "tours" && favoriteTours.length === 0 ? (
        <p>Add tours to favorite</p>
      ) : chosenList === "hotels" && favoriteHotels.length === 0 ? (
        <p>Add hotels to favorite</p>
      ) : chosenList === "tours" ? (
        <div>
          {favoriteTours.map((tour) => (
            <TourCard
              key={tour.id}
              country={tour.country}
              image_url={tour.image_url}
              price={tour.price}
              tourAverageRating={tour.hotelAverageRating}
              variant="featured"
              children
              favoriteTours={favoriteTours}
              favoriteToursId={tour.tour_id}
              handleDeleteFavoriteTour={() =>
                handleDeleteFavoriteTour(tour.tour_id)
              }
              type="tour"
            />
          ))}
        </div>
      ) : (
        <div>
          {favoriteHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              name={hotel.name}
              country={hotel.country}
              city={hotel.city}
              image_url={hotel.image_url}
              price={hotel.price}
              variant="featured"
              children
              favoriteHotels={favoriteHotels}
              favoriteHotelsId={hotel.hotel_id}
              handleDeleteFavoriteHotel={() =>
                handleDeleteFavoriteHotel(hotel.hotel_id)
              }
              type="hotel"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
