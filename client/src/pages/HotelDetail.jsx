import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Star from "../components/common/Star";
import Navigation from "../components/header/Navigation";
import "./hotelTourDetail.css";
import Button from "../components/common/Button.jsx";
import Review from "../components/main/Review.jsx";

function HotelDetail({
  starRating,
  hoveredRating,
  setStarRating,
  setHoveredRating,
  setReviewsData
}) {
  const { id } = useParams();
  const [hotelReviews, setHotelReviews] = useState([]);

  const [newReviewText, setNewReviewText] = useState("");
  const [hotelDetailData, setHotelDetailData] = useState(null);

  function handleReviewText(value) {
    setNewReviewText(value);
  }

  function handleCreateNewReview(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/hotels/${id}/reviews`, {
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
        setHotelReviews((prevReview) => [...prevReview, data]);
        setReviewsData((prevReview) => [...prevReview, data]);
        setStarRating(null);
        setNewReviewText("");
      })
      .catch((err) => {
        console.error("post review fetch error: ", err);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/hotels/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("error getting hotel details");
        } else {
          return res.json();
        }
      })
      .then((data) => setHotelDetailData(data))
      .catch((err) => console.error("error getting hotel details: ", err));

    fetch(`http://localhost:3000/hotels/${id}/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("get hotel detail error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setHotelReviews(data);
      })
      .catch((err) => {
        console.error("error: ", err);
      });
  }, [id]);

  return (
    <div className="hotel-detail-container">
      <div className="hotel-detail-container-navigation">
        <Navigation />
      </div>

      <div className="hotel-detail-container-information">
        <div className="hotel-detail-container-img">
          <img src={hotelDetailData?.image_url} />
        </div>
        <div className="hotel-detail-container-info">
          <div className="hotel-detail-container-info-about-hotel">
            <h2> {hotelDetailData?.name}</h2>
            <div className="hotel-detail-container-info-country-city">
              <p>{hotelDetailData?.country}</p>
              <p>, {hotelDetailData?.city}</p>
            </div>

            <div className="hotel-detail-container-info-price">
              <p>Price per day:</p>
              <p>{hotelDetailData?.price}</p>
            </div>
            <div className="hotel-detail-container-info-guests">
              <p>Maximum number of guests: </p>
              <p>{hotelDetailData?.max_guests}</p>
            </div>
          </div>
          <div className="hotel-detail-container-new-review">
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
                className="hotel-detail-container-new-review-button"
              >
                Save review
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hotel-detail-container-reviews">
        {hotelReviews?.map((review) => (
          <div key={review.id} className="hotel-detail-container-review">
            <Review review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelDetail;
