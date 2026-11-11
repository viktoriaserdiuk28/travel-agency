import { useEffect } from "react";
import Button from "../common/Button";
import Review from "./Review";
import { useState } from "react";
function Reviews() {
  const [allReviews, setAllReviews] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  function handleNextReviewIndex() {
    if (allReviews.length - 4 > reviewIndex) {
      setReviewIndex((reviewIndex) => reviewIndex + 1);
    }
  }
  function handlePrevReviewIndex() {
    setReviewIndex((reviewIndex) => reviewIndex - 1);
  }

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("get all review error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setAllReviews(data);
      })
      .catch((err) => console.error("get reviews error: ", err));
  }, []);

  return (
    <div className="reviews-container">
      <div className="reviews-container-info">
        <div className="reviews-container-info-text">
          <h2>What our travelers say</h2>
          <p>
            Read about the experiences of our travelers and see what makes their
            journeys special.
          </p>
        </div>

        <div className="reviews-container-info-button">
          <Button
            width="64px"
            height="64px"
            border="1px solid #C08B7D"
            borderRadius="12px"
            className="reviews-prev-button"
            onClick={reviewIndex !== 0 ? handlePrevReviewIndex : undefined}
          ></Button>
          <Button
            width="64px"
            height="64px"
            border="1px solid #C08B7D"
            borderRadius="12px"
            className="reviews-next-button"
            onClick={handleNextReviewIndex}
          ></Button>
        </div>
      </div>

      <div className="reviews">
        {[...allReviews]
          .sort((a, b) => b.rating - a.rating)
          .map((review) => <Review key={review.id} review={review} />)
          .slice(reviewIndex, reviewIndex + 4)}
      </div>
    </div>
  );
}

export default Reviews;
