import empryStar from "../../assets/icons/emptyStar.svg";
import fullStar from "../../assets/icons/fullStar.svg";
function Star({
  starRating,
  hoveredRating,
  setStarRating,
  setHoveredRating,
  mode,
  rating,
}) {
  function handleStarRating(index) {
    setStarRating(index);
  }

  return (
    <>
      {Array.from({ length: 5 }).map((star, index) => (
        <button
          key={index}
          type="button"
          onClick={
            mode === "interactive"
              ? () => handleStarRating(index + 1)
              : undefined
          }
          onMouseEnter={
            mode === "interactive"
              ? () => setHoveredRating(index + 1)
              : undefined
          }
          onMouseLeave={
            mode === "interactive" ? () => setHoveredRating(null) : undefined
          }
        >
          {mode === "interactive" &&
            (hoveredRating > index ||
            (hoveredRating === null && starRating > index) ? (
              <img src={fullStar} alt="star" width="40px" height="40px" />
            ) : (
              <img src={empryStar} alt="star" width="40px" height="40px" />
            ))}
          {mode === "read" &&
            (rating > index ? (
              <img src={fullStar} alt="star" width="40px" height="40px" />
            ) : (
              <img src={empryStar} alt="star" width="40px" height="40px" />
            ))}
        </button>
      ))}
    </>
  );
}

export default Star;
