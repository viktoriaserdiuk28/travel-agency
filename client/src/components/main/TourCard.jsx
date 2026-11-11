import Heart from "../common/Heart";
import Location from "../../assets/icons/location.png";
import Star from "../../assets/icons/star.png";
function TourCard({
  country,
  image_url,
  name,
  min_age,
  max_age,
  group_size,
  price,
  duration,
  variant,
  children,
  tourAverageRating,
  handleAddNewFavoriteTour,
  favoriteTours,
  favoriteToursId,
  handleDeleteFavoriteTour,
  type,
}) {
  const cardClass =
    variant === "catalog" ? "tour-card catalog" : "tour-card featured";
  return (
    <div className={cardClass}>
      <div className="tour-card-img">
        <img className="tour-card-main-img" src={image_url} />
        <Heart
          onLike={handleAddNewFavoriteTour}
          favoriteTours={favoriteTours}
          favoriteToursId={favoriteToursId}
          handleDeleteFavoriteTour={handleDeleteFavoriteTour}
          type={type}
        />
      </div>

      <div className="tour-card-info">
        <div className="tour-card-info-country">
          <img src={Location} />
          <p>{country}</p>
        </div>

        <div className="tour-card-info-name-rate">
          <p>{name}</p>
          <div className="tour-card-info-rate">
            {tourAverageRating == null ? (
              <p> No reviews yet</p>
            ) : (
              <>
                <img src={Star} />
                <p>{tourAverageRating.toFixed(1)}</p>
              </>
            )}
          </div>
        </div>

        <div className="tour-card-info-age">
          <p>Age Range</p>
          <p>
            {min_age} - {max_age}
          </p>
        </div>
        <div className="tour-card-info-group">
          <p>Group Size</p>
          <p>{group_size}</p>
        </div>
      </div>
      <hr />
      <div className="tour-card-info-price-duration">
        <p>{price} $</p>
        <p>{duration} Days</p>
      </div>
      {children}
    </div>
  );
}
export default TourCard;
