import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Navigation from "./components/header/Navigation";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Favorites from "./pages/Favorites";
import HotelDetail from "./pages/HotelDetail";
import Hotels from "./pages/Hotels";
import Tours from "./pages/Tours";
import Profile from "./pages/Profile";
import TourDetail from "./pages/TourDetail";

function App() {
  const [initialTours, setInitialTours] = useState([]);
  const [initialHotels, setInitialHotels] = useState([]);

  const [starRating, setStarRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);

  const [favoriteTours, setFavoriteTours] = useState([]);
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  const [reviewsData, setReviewsData] = useState([]);

  function handleAddNewFavoriteHotel(hotel_id) {
    fetch("http://localhost:3000/favorites/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotel_id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("handleAddNewFavoriteHotel error");
        } else {
          return res.json();
        }
      })
      .then((data) => setFavoriteHotels((favorite) => [...favorite, data]))
      .catch((err) => console.error("new favorite hotel fetch error: ", err));
  }

  function handleAddNewFavoriteTour(tour_id) {
    fetch("http://localhost:3000/favorites/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tour_id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("handleAddNewFavoriteTour error");
        } else {
          return res.json();
        }
      })
      .then((data) => setFavoriteTours((favorite) => [...favorite, data]))
      .catch((err) => console.error("new favorite tour fetch error: ", err));
  }

  function handleDeleteFavoriteHotel(id) {
    fetch(`http://localhost:3000/favorites/hotels/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setFavoriteHotels((favoriteHotels) =>
            favoriteHotels.filter((hotels) => hotels.hotel_id !== id),
          );
        } else {
          throw new Error("handleDeleteFavoriteHotel error");
        }
      })
      .catch((err) => console.error("error deleting favorite hotels: ", err));
  }

  function handleDeleteFavoriteTour(id) {
    fetch(`http://localhost:3000/favorites/tours/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setFavoriteTours((favoriteTours) =>
            favoriteTours.filter((tours) => tours.tour_id !== id),
          );
        } else {
          throw new Error("handleDeleteFavoriteTour error");
        }
      })
      .catch((err) => console.error("error deleting favorite tours: ", err));
  }

  useEffect(() => {
    fetch("http://localhost:3000/hotels")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInitialHotels(data);
      });

    fetch("http://localhost:3000/tours")
      .then((res) => res.json())
      .then((data) => setInitialTours(data));

    fetch(`http://localhost:3000/reviews`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("get reviews error ");
        } else {
          return res.json();
        }
      })
      .then((data) => setReviewsData(data))
      .catch((err) => {
        console.error("error: ", err);
      });

    fetch("http://localhost:3000/favorites/hotels")
      .then((res) => {
        if (!res.ok) {
          throw new Error("get favorite hotels error");
        } else {
          return res.json();
        }
      })
      .then((data) => setFavoriteHotels(data))
      .catch((err) => {
        console.error("get favorite hotels error: ", err);
      });

    fetch("http://localhost:3000/favorites/tours")
      .then((res) => {
        if (!res.ok) {
          throw new Error("get favorite tours error");
        } else {
          return res.json();
        }
      })
      .then((data) => setFavoriteTours(data))
      .catch((err) => {
        console.error("get favorite tours error: ", err);
      });
  }, []);
  return (
    <div className="app">
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="header">
                  <Navigation />
                  <Header
                    initialHotels={initialHotels}
                    initialTours={initialTours}
                  />
                </div>
                <div className="main">
                  <Main
                    initialHotels={initialHotels}
                    initialTours={initialTours}
                    reviewsData={reviewsData}
                    handleAddNewFavoriteHotel={handleAddNewFavoriteHotel}
                    handleAddNewFavoriteTour={handleAddNewFavoriteTour}
                    favoriteHotels={favoriteHotels}
                    favoriteTours={favoriteTours}
                    handleDeleteFavoriteHotel={handleDeleteFavoriteHotel}
                    handleDeleteFavoriteTour={handleDeleteFavoriteTour}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <Navigation />
                <Favorites
                  favoriteTours={favoriteTours}
                  favoriteHotels={favoriteHotels}
                  setFavoriteTours={setFavoriteTours}
                  setFavoriteHotels={setFavoriteHotels}
                  handleDeleteFavoriteHotel={handleDeleteFavoriteHotel}
                  handleDeleteFavoriteTour={handleDeleteFavoriteTour}
                />
              </>
            }
          />
          <Route
            path="/hotels"
            element={
              <>
                <div className="hotels-navigation">
                  <Navigation />
                </div>
                <Hotels
                  initialHotels={initialHotels}
                  setInitialHotels={setInitialHotels}
                  reviewsData={reviewsData}
                  handleAddNewFavoriteHotel={handleAddNewFavoriteHotel}
                  favoriteHotels={favoriteHotels}
                  handleDeleteFavoriteHotel={handleDeleteFavoriteHotel}
                />
              </>
            }
          />
          <Route
            path="/tours"
            element={
              <>
                <div className="tours-navigation">
                  <Navigation />
                </div>

                <Tours
                  initialTours={initialTours}
                  setInitialTours={setInitialTours}
                  reviewsData={reviewsData}
                  handleAddNewFavoriteTour={handleAddNewFavoriteTour}
                  favoriteTours={favoriteTours}
                  handleDeleteFavoriteTour={handleDeleteFavoriteTour}
                />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                setInitialTours={setInitialTours}
                setInitialHotels={setInitialHotels}
              />
            }
          />
          <Route
            path="/hotels/:id"
            element={
              <HotelDetail
                starRating={starRating}
                hoveredRating={hoveredRating}
                setStarRating={setStarRating}
                setHoveredRating={setHoveredRating}
                setReviewsData={setReviewsData}
              />
            }
          />

          <Route
            path="/tours/:id"
            element={
              <TourDetail
                starRating={starRating}
                hoveredRating={hoveredRating}
                setStarRating={setStarRating}
                setHoveredRating={setHoveredRating}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
