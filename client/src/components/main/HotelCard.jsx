import Heart from "../common/Heart";
import Star from "../../assets/icons/star.png";
function HotelCard({
  name,
  image_url,
  country,
  city,
  max_guests,
  price,
  variant,
  children,
  hotelAverageRating,
  handleAddNewFavoriteHotel,
  favoriteHotels,
  favoriteHotelsId,
  handleDeleteFavoriteHotel,
  type,
}) {
  const cardClass =
    variant === "catalog" ? "hotel-card catalog" : "hotel-card featured";
  return (
    <div className={cardClass}>
      <div className="hotel-card-img">
        <img className="hotel-card-main-img" src={image_url} />
        <Heart
          onLike={handleAddNewFavoriteHotel}
          favoriteHotels={favoriteHotels}
          favoriteHotelsId={favoriteHotelsId}
          handleDeleteFavoriteHotel={handleDeleteFavoriteHotel}
          type={type}
        />
      </div>

      <div className="hotel-card-info">
        <div className="hotel-card-info-name-rate">
          <p>{name}</p>
          <div className="hotel-card-info-rate">
            {hotelAverageRating == null ? (
              <p> No reviews yet</p>
            ) : (
              <>
                <img src={Star} />
                <p>{hotelAverageRating.toFixed(1)}</p>
              </>
            )}
          </div>
        </div>

        <div className="hotel-card-info-country-city">
          <p> Country, City</p>
          <p>
            {country}, {city}
          </p>
        </div>

        <div className="hotel-card-info-guests">
          <p>Guests</p>
          <p>{max_guests}</p>
        </div>
      </div>
      <hr />
      <div className="tour-card-info-price-price">
        <p>{price} $</p>
        <p>Night</p>
      </div>
      {children}
    </div>
  );
}
export default HotelCard;
