import Jakarta from "../../assets/images/jakarta.png";
import Dubai from "../../assets/images/dubai.png";
import London from "../../assets/images/london.png";
function TrendingDestination() {
  return (
    <div className="trending-destination-container">
      <div className="trending-destination-container-info">
        <h2>
          Trending <span>destination </span> right now
        </h2>
        <p>
          Looking for inspiration for your next trip? Explore some of the most
          popular destinations among travelers and discover exciting places
          worth visiting.
        </p>
      </div>
      <div className="trending-destination-container-img">
        <div className="trending-destination-container-img-jakarta">
          <div className="trending-destination-container-jakarta-text">
            <p>Jakarta</p>
          </div>
          <img src={Jakarta} />
        </div>

        <div className="trending-destination-container-img-dubai">
          <div className="trending-destination-container-dubai-text">
            <p>Dubai</p>
          </div>
          <img src={Dubai} />
        </div>
        <div className="trending-destination-container-img-london">
          <div className="trending-destination-container-london-text">
            <p>London</p>
          </div>
          <img src={London} />
        </div>

        <p className="trending-destination-container-info-p">
          Explore the world with us.
        </p>
      </div>
    </div>
  );
}
export default TrendingDestination;
