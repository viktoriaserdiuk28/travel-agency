// import GoldenStart from "../../assets/icons/goldenStar.png";
import Star from "../common/Star";
function Review({ review }) {
  return (
    <div className="review-container">
      <div className="review-container-text">
        <p>{review.text}</p>
      </div>

      <div className="review-container-rate">
        <div className="review-container-rate-stars">
          <Star mode="read" rating = {review.rating}/>
        </div>
        <div className="review-container-rate-name">
          <p>{review.first_name}</p>
        </div>
      </div>
    </div>
  );
}
export default Review;
