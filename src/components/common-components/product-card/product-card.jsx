// React Imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Import
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Tooltip } from "@mui/material";

// Local Imports
import "./product-card.scss";

const ProductCard = ({ card, dialogOpen }) => {
  const {
    brand,
    model,
    year_of_model,
    km_driven,
    images,
    price,
    engine_and_performance,
    selling_status,
    hold,
    rto,
    seller_type,
    bike_id,
    slug,
  } = card;

  // Image
  const mainImage =
    images?.[0]?.url ||
    "https://cdn.bikedekho.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg";

  // Discount Price
  const discountedPrice = (
    price.original_price *
    (1 - price.discount_percent / 100)
  ).toFixed(0);

  // 1000 to 1K
  const formatToK = (n) => {
    return n >= 1000 ? `${Math.floor(n / 100) / 10}K` : `${n}`;
  };

  const isSold = selling_status === "sold";
  const isHeld = hold?.is_held && !isSold;

  return (
    <React.Fragment>
      <div className={`product-card ${isSold ? "sold" : isHeld ? "held" : ""}`}>
        <Link
          to={`/bike/details/${slug?.brand}/${
            slug.model
          }/${bike_id.toLowerCase()}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="image-container">
            <img src={mainImage} alt={`${brand} ${model}`} loading="lazy" />
            {isSold && <span className="badge sold">SOLD</span>}
            {isHeld && <span className="badge held">ON HOLD</span>}
          </div>
        </Link>

        <div className="icon_parent">
          <Tooltip title="Add to wishlist" arrow>
            <FavoriteBorderIcon />
          </Tooltip>
          <Tooltip title="Expand Full View" arrow>
            <OpenInFullIcon onClick={() => dialogOpen(card)} />
          </Tooltip>
        </div>

        <Link
          to={`/bike/details/${slug?.brand}/${
            slug.model
          }/${bike_id.toLowerCase()}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="product-details">
            <div className="details_parent">
              <div className="details_child">
                <h3>{`${brand}`}</h3>
                <h3>{` ${model} `}</h3>
              </div>

              <div className="details_child">
                <div className="year_parent">
                  <img
                    src="/images/icons/year.gif"
                    alt="year"
                    title="year"
                    loading="lazy"
                  />
                  <h3>{`${year_of_model} `}</h3>
                </div>

                <div className="price_parent">
                  <h3 className="original_price">
                    <CurrencyRupeeIcon className="price_icon" />
                    {`${(price?.original_price / 100000).toFixed(2)} Lakh`}
                  </h3>

                  <h3 className="final_price_parent">
                    <CurrencyRupeeIcon className="price_icon" />
                    {`${(discountedPrice / 100000).toFixed(2)} Lakh`}
                  </h3>
                </div>
              </div>
            </div>

            <div className="seperator"></div>

            <div className="specs">
              <Tooltip title={`KM Driven`} arrow>
                <span>{`${formatToK(km_driven)}`}</span>
              </Tooltip>
              <Tooltip title="Fuel Type" arrow>
                <span>{`${engine_and_performance?.fuel_type}`}</span>
              </Tooltip>
              <Tooltip title="Mileage" arrow>
                <span>{`${engine_and_performance?.mileage_kmpl}`}</span>
              </Tooltip>
              <Tooltip title="Transmission Type" arrow>
                <span>{`${engine_and_performance?.transmission_type}`}</span>
              </Tooltip>
              <Tooltip title="RTO" arrow>
                <span>{`${rto?.location_code}`}</span>
              </Tooltip>
            </div>

            <div className="card-footer">
              {seller_type === "Individual" ? (
                <div className="individual">
                  <VerifiedIcon />
                  <h6 className="mb-0">Verified Seller</h6>
                </div>
              ) : (
                <div className="dealer">
                  <VerifiedIcon />
                  <h6 className="mb-0">Verified Dealer</h6>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  );
};

ProductCard.propTypes = {
  card: PropTypes.object.isRequired,
  dialogOpen: PropTypes.func.isRequired,
};

export default ProductCard;
