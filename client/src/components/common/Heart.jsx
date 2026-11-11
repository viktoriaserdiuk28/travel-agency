import EmptyHeart from "../../assets/icons/heart.png";
import FullHeart from "../../assets/icons/fullHeart.png";
function Heart({
  onLike,
  favoriteHotels,
  favoriteHotelsId,
  favoriteTours,
  favoriteToursId,
  handleDeleteFavoriteHotel,
  handleDeleteFavoriteTour,
  type,
}) {
  const addHotelToFavorite = favoriteHotels?.some(
    (favorite) => favorite.hotel_id === favoriteHotelsId,
  );

  const addTourToFavorite = favoriteTours?.some(
    (favorite) => favorite.tour_id === favoriteToursId,
  );
  function handleHeartButton() {
    if (type === "hotel") {
      if (addHotelToFavorite) {
        handleDeleteFavoriteHotel();
      } else if (onLike) {
        onLike();
      }
    } else if (type === "tour") {
      if (addTourToFavorite) {
        handleDeleteFavoriteTour();
      } else if (onLike) {
        onLike();
      }
    }
  }
  return (
    <button onClick={handleHeartButton}>
      <img
        src={
          type === "hotel"
            ? addHotelToFavorite
              ? FullHeart
              : EmptyHeart
            : addTourToFavorite
              ? FullHeart
              : EmptyHeart
        }
      />
    </button>
  );
}

export default Heart;
