// React Imports
import { Link } from "react-router-dom";

// Local Imports
import "./popular-bikes.scss";
import JSON from "../../../src/data/popular-bikes.json";

const PopularBikes = () => {
  return (
    <section className="popular-bike-container container-fluid component-parent">
      <h3 className="section-title text-center">{JSON.title}</h3>
      <div className="cardContainer">
        {JSON.popularbikedata.map((item) => (
          <div key={item.id} className="card">
            <Link to={item.path} className="popularbike-link">
              <img
                src={item.imgSrc}
                alt={item.title}
                title={item.title}
                className="image"
              />
              <p className="text">{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBikes;
