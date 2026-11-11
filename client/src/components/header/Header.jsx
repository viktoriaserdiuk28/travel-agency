import ChooseDestination from "./ChooseDestination";

import "../header/header.css";

function Header({ initialHotels, initialTours }) {
  return (
    <div className="header-container">
      <div className="header-container-main-info">
        <h1>
          Discover the world. <br />
          Create unforgettable memories.
        </h1>
        <p>
          Find the perfect destination for your next adventure. Explore amazing
          places, <br /> discover unique experiences, and plan your dream
          getaway with ease.
        </p>
      </div>
      <ChooseDestination
        initialHotels={initialHotels}
        initialTours={initialTours}
      />
    </div>
  );
}

export default Header;
