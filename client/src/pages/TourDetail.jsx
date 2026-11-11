import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Star from "../components/common/Star";
import Button from "../components/common/Button.jsx";
import Review from "../components/main/Review.jsx";
import Navigation from "../components/header/Navigation";
import "./hotelTourDetail.css";

function TourDetail({
  starRating,
  hoveredRating,
  setStarRating,
  setHoveredRating,
}) {
  const { id } = useParams();
  const [tourReviews, setTourReviews] = useState([]);

  const [newReviewText, setNewReviewText] = useState("");
  const [tourDetailData, setTourDetailData] = useState(null);

  function handleReviewText(value) {
    setNewReviewText(value);
  }

  function handleCreateNewReview(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/tours/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newReviewText, rating: starRating }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error add new review");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTourReviews((prevReview) => [...prevReview, data]);
        setStarRating(null);
        setNewReviewText("");
      })
      .catch((err) => {
        console.error("post review fetch error: ", err);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/tours/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("error getting tour details");
        } else {
          return res.json();
        }
      })
      .then((data) => setTourDetailData(data))
      .catch((err) => console.error("error getting tour details: ", err));

    fetch(`http://localhost:3000/tours/${id}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("error get tour detail");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setTourReviews(data);
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  }, [id]);
  return (
    <div className="tour-detail-container">
      <div className="tour-detail-container-navigation">
        <Navigation />
      </div>

      <div className="tour-detail-container-information">
        <div className="tour-detail-container-img">
          <img src={tourDetailData?.image_url} />
        </div>
        <div className="tour-detail-container-info">
          <div className="tour-detail-container-info-about-tour">
            <h2> {tourDetailData?.name}</h2>
            <div className="tour-detail-container-info-country">
              <p>{tourDetailData?.country}</p>
            </div>

            <div className="tour-detail-container-info-group">
              <p>Group size:</p>
              <p>{tourDetailData?.group_size}</p>
            </div>

            <div className="tour-detail-container-info-age">
              <p>Age:</p>
              <p>
                {tourDetailData?.min_age} - {tourDetailData?.max_age}
              </p>
            </div>

            <div className="tour-detail-container-info-price">
              <p>Price per day:</p>
              <p>{tourDetailData?.price}</p>
            </div>
            <div className="tour-detail-container-info-duration">
              <p>Duration: </p>
              <p>{tourDetailData?.duration}</p>
            </div>
          </div>
          <div className="tour-detail-container-new-review">
            <form onSubmit={(e) => handleCreateNewReview(e)}>
              <div>
                <Star
                  mode={"interactive"}
                  starRating={starRating}
                  hoveredRating={hoveredRating}
                  setStarRating={setStarRating}
                  setHoveredRating={setHoveredRating}
                />
              </div>
              <input
                placeholder="Write your review..."
                type="text"
                onChange={(e) => handleReviewText(e.target.value)}
              />
              <Button
                textColor="#000"
                bgColor="#c08b7d"
                height="40px"
                width="200px"
                borderRadius="20px"
                fontWeight="600"
                className="tour-detail-container-new-review-button"
              >
                Save review
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="tour-detail-container-reviews">
        {tourReviews?.map((review) => (
          <div key={review.id} className="tour-detail-container-review">
            <Review review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourDetail;
