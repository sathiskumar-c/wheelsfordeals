// React Imports
import { Link } from "react-router-dom";

// Local Imports
import "./top-recommended-brand.scss";
import JSON from "../../data/top-recommended-brand.json";

const TopRecommendedBrand = () => {
  // Duplicate the data for seamless infinite scroll
  const brandsData = [...JSON.toprecommendeddata, ...JSON.toprecommendeddata];

  return (
    <section
      className="scroll-container component-parent"
      role="complementary"
      aria-labelledby="top-brands-title"
    >
      <h2 id="top-brands-title" className="section-title text-center">
        {JSON.title || "Top Recommended Motorcycle Brands"}
      </h2>
      <div
        className="scroll-track"
        role="list"
        aria-label="List of top recommended motorcycle brands"
      >
        {brandsData.map((brand, index) => (
          <article
            className="brand-card"
            key={`${brand.id}-${index}`}
            role="listitem"
          >
            <Link
              to={`/brands/${brand.path}`}
              className="brand-link"
              aria-label={`Explore ${brand.name} ${brand.fuel_type} motorcycles`}
              title={`${brand.name} Motorcycles`}
            >
              <img
                src={brand.image}
                alt={brand.alt || `${brand.name} motorcycle logo`}
                className="brand-img"
                loading="lazy"
              />
              <p className="brand-name">{brand.name}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopRecommendedBrand;
