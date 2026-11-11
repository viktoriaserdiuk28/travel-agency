import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Heart from "../../assets/icons/favourite.svg";
import Avatar from "../../assets/icons/avatar.svg";
import "./navigation.css";

function Navigation() {
  return (
    <div className="navigation-container">
      <div className="header-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="header-navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>About</li>
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
          <li>
            <Link to="/tours">Tours</Link>
          </li>
        </ul>
      </div>
      <div className="navigation-button">
        <Link to="/favorites">
          <img
            src={Heart}
            alt="avatar"
            className="navigation-favorites-heart"
          />
        </Link>
        <Button
          textColor="#283841"
          height="50px"
          width="50px"
          fontSize="16px"
          borderRadius="10px"
          fontWeight="600"
        >
          <Link to="/profile">
            <img src={Avatar} alt="avatar" />
          </Link>
        </Button>
        {/* <Button
          textColor="#283841"
          height="48px"
          width="132px"
          fontSize="16px"
          borderRadius="10px"
          fontWeight="600"
        >
          Sign in
        </Button>
        <Button
          textColor="#FFFFFF"
          bgColor="#C08B7D"
          height="48px"
          width="132px"
          fontSize="16px"
          borderRadius="10px"
          fontWeight="600"
        >
          Sign up
        </Button> */}
      </div>
    </div>
  );
}

export default Navigation;
