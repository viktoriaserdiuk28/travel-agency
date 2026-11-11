import WhyChooseUsImg from "../../assets/images/whyChooseUs.png";
import tourCard from "../../assets/images/tourCard.png";
import GoldenStart from "../../assets/icons/goldenStar.png";
import Ractangle from "../../assets/icons/rectangle.png";
function WhyChooseUs() {
  return (
    <div className="why-choose-us-container">
      <div className="why-choose-us-container-img">
        <img
          className="why-choose-us-container-main-img"
          src={WhyChooseUsImg}
        />
        <img className="why-choose-us-container-tour-card-img" src={tourCard} />
        <div className="why-choose-us-container-img-rate">
          <img src={GoldenStart} />
          <p>4.92</p>
        </div>
      </div>
      <div className="why-choose-us-container-info">
        <div className="why-choose-us-container-info-title">
          <h2>
            <span>Why</span> choose us
          </h2>
        </div>
        <div className="why-choose-us-container-info-subtitle">
          <p>
            We make travel planning simple and enjoyable. Discover amazing
            destinations and find the perfect experience for every kind of
            traveler.
          </p>
        </div>
        <div className="why-choose-us-container-info-list">
          <ul>
            <li>
              <img src={Ractangle} />
              Carefully selected hotels and travel experiences.
            </li>
            <li>
              <img src={Ractangle} /> A wide range of destinations to explore.
            </li>
            <li>
              <img src={Ractangle} /> Easy booking and convenient travel
              planning.
            </li>
            <li>
              <img src={Ractangle} />
              Options for different budgets and preferences.
            </li>
          </ul>
        </div>
        <div className="why-choose-us-container-info-text">
          <p>
            Whether you're planning a relaxing getaway, an exciting adventure,
            or a trip with your loved ones, we're here to help you find the
            right place. Explore our collection of hotels and tours and start
            planning your next journey with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
export default WhyChooseUs;
