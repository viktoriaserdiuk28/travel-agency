import HotelCard from "./HotelCard";
import TourCard from "./TourCard";
import WhyChooseUs from "./WhyChooseUs";
import TrendingDestination from "./TrendingDestination";
// import TestHotel from "../../assets/images/testHotel.png";
import Reviews from "./Reviews";
import "../main/main.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function Main({
  initialTours,
  initialHotels,
  reviewsData,
  handleAddNewFavoriteHotel,
  handleAddNewFavoriteTour,
  favoriteHotels,
  favoriteTours,
  handleDeleteFavoriteHotel,
  handleDeleteFavoriteTour,
}) {
  const toursWithRating = initialTours.map((tours) => {
    const tourReviews = reviewsData.filter(
      (review) => review.tour_id === tours.id,
    );
    const tourAverageRating =
      tourReviews.length > 0
        ? tourReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          tourReviews.length
        : null;

    return {
      ...tours,
      tourAverageRating,
    };
  });

  const highestRatingTour = [...toursWithRating]
    .filter((tours) => tours.tourAverageRating !== null)
    .sort((a, b) => b.tourAverageRating - a.tourAverageRating)
    .slice(0, 4);

  const hotelsWithRating = initialHotels.map((hotels) => {
    const hotelReviews = reviewsData.filter(
      (review) => review.hotel_id === hotels.id,
    );
    const hotelAverageRating =
      hotelReviews.length > 0
        ? hotelReviews.reduce((acc, curr) => acc + curr.rating, 0) /
          hotelReviews.length
        : null;
    return {
      ...hotels,
      hotelAverageRating,
    };
  });
  const highestRatingHotel = [...hotelsWithRating]
    .filter((hotels) => hotels.hotelAverageRating !== null)
    .sort((a, b) => b.hotelAverageRating - a.hotelAverageRating)
    .slice(0, 4);

  return (
    <>
      <div className="main-text">
        <p className="main-title">Top-rated tours for your next adventure</p>
        <p className="main-subtitle">
          Explore our most popular tours, loved by travelers for their
          unforgettable experiences. Find your next adventure and discover
          amazing destinations around the world.
        </p>
      </div>
      <div className="hotel-tour-output">
        {highestRatingTour.map((tours) => (
          <Link to={`/tours/${tours.id}`}>
            <TourCard
              key={tours.id}
              name={tours.name}
              country={tours.country}
              groupSize={tours.groupSize}
              minAge={tours.min_age}
              maxAge={tours.max_age}
              price={tours.price}
              duration={tours.duration}
              image_url={tours.image_url}
              tourAverageRating={tours.tourAverageRating}
              handleAddNewFavoriteTour={() =>
                handleAddNewFavoriteTour(tours.id)
              }
              variant="featured"
              favoriteTours={favoriteTours}
              favoriteToursId={tours.id}
              handleDeleteFavoriteTour={() =>
                handleDeleteFavoriteTour(tours.id)
              }
              type="tour"
            />
          </Link>
        ))}
      </div>

      <WhyChooseUs />
      <div className="hotel-tour-output">
        {highestRatingHotel.map((hotels) => (
          <Link to={`/hotels/${hotels.id}`}>
            <HotelCard
              key={hotels.id}
              name={hotels.name}
              country={hotels.country}
              city={hotels.city}
              image_url={hotels.image_url}
              price={hotels.price}
              max_guests={hotels.max_guests}
              hotelAverageRating={hotels.hotelAverageRating}
              variant="featured"
              handleAddNewFavoriteHotel={() =>
                handleAddNewFavoriteHotel(hotels.id)
              }
              children
              favoriteHotels={favoriteHotels}
              favoriteHotelsId={hotels.id}
              handleDeleteFavoriteHotel={() =>
                handleDeleteFavoriteHotel(hotels.id)
              }
              type="hotel"
            />
          </Link>
        ))}
      </div>
      <TrendingDestination />
      <Reviews />
      <Footer />
    </>
  );
}
export default Main;
