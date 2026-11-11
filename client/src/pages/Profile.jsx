import { useState } from "react";
import Navigation from "../components/header/Navigation";

function Profile({ setInitialTours, setInitialHotels }) {
  const [newTourData, setNewTourData] = useState({
    name: "",
    country: "",
    group_size: "",
    min_age: "",
    max_age: "",
    price: "",
    duration: "",
    rate: null,
    image_url: "",
  });

  const [newHotelData, setNewHotelData] = useState({
    name: "",
    country: "",
    city: "",
    max_guests: "",
    price: "",
    rate: null,
    image_url: "",
  });

  function handleNewTourData(name, value) {
    setNewTourData({ ...newTourData, [name]: value });
  }

  function handleNewHotelData(name, value) {
    setNewHotelData({
      ...newHotelData,
      [name]: value,
    });
  }

  function handleAddNewTour(e) {
    e.preventDefault();

    fetch("http://localhost:3000/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTourData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error add new tour");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setInitialTours((prevTours) => [...prevTours, data]);
        setNewTourData({
          name: "",
          country: "",
          group_size: "",
          min_age: "",
          max_age: "",
          price: "",
          duration: "",
          rate: null,
          image_url: "",
        });
      })
      .catch((err) => {
        console.error("fetch error: ", err);
      });
  }

  function handleAddNewHotel(e) {
    e.preventDefault();

    fetch("http://localhost:3000/hotels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHotelData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("error aa new hotel ");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setInitialHotels((prevHotels) => [...prevHotels, data]);
        setNewHotelData({
          name: "",
          country: "",
          city: "",
          max_guests: "",
          price: "",
          rate: null,
          image_url: "",
        });
      });
  }

  return (
    <>
      <Navigation />
      <h2>Add new tour</h2>

      <form onSubmit={(e) => handleAddNewTour(e)}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newTourData.name}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Country</label>
        <input
          type="text"
          name="country"
          value={newTourData.country}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Group size</label>
        <input
          type="number"
          name="group_size"
          value={newTourData.group_size}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Min age</label>
        <input
          type="number"
          name="min_age"
          value={newTourData.min_age}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Max age</label>
        <input
          type="number"
          name="max_age"
          value={newTourData.max_age}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={newTourData.price}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Duration</label>
        <input
          type="number"
          name="duration"
          value={newTourData.duration}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <label>Image</label>
        <input
          type="text"
          name="image_url"
          value={newTourData.image_url}
          onChange={(e) => handleNewTourData(e.target.name, e.target.value)}
        />

        <button>Save new tour</button>
      </form>
      <p>--------------</p>
      <h2>Add new hotel</h2>
      <form onSubmit={(e) => handleAddNewHotel(e)}>
        <label>name</label>
        <input
          type="text"
          name="name"
          value={newHotelData.name}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />

        <label>country</label>
        <input
          type="text"
          name="country"
          value={newHotelData.country}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />

        <label>city</label>
        <input
          type="text"
          name="city"
          value={newHotelData.city}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />

        <label>max amount of guests</label>
        <input
          type="number"
          name="max_guests"
          value={newHotelData.max_guests}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />

        <label>price</label>
        <input
          type="number"
          step="0.01"
          name="price"
          value={newHotelData.price}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />

        <label>image</label>
        <input
          type="text"
          name="image_url"
          value={newHotelData.image_url}
          onChange={(e) => handleNewHotelData(e.target.name, e.target.value)}
        />
        <button>save new hotel</button>
      </form>
    </>
  );
}

export default Profile;
