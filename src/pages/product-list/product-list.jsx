// React Imports
import React, { useEffect, useState, useCallback } from "react";

// Component Imports
import NavbarDeskTop from "../../components/navbar/navbar";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import ProductCard from "../../components/common-components/product-card/product-card";
import Footer from "../../components/footer/footer";

// JSON Imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";

// Local Imports
import "./product-list.scss";

// Utility function to throttle scroll handler
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const ProductList = () => {
  const ITEMS_PER_LOAD = 30;
  const [openPopup, setOpenPopup] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleBikes, setVisibleBikes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load visible bikes
  useEffect(() => {
    const sliced = Bikedetails.slice(0, visibleCount);
    setVisibleBikes(sliced);
  }, [visibleCount]);

  const loadMoreItems = () => {
    if (visibleCount >= Bikedetails.length) return;

    setLoading(true);
    debugger;
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 500);
  };

  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loading) {
        loadMoreItems();
      }
    }, 200),
    [visibleCount, loading]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <React.Fragment>
      <NavbarDeskTop />
      <div className="container product-list-parent">
        <div className="row">
          <div className="col-md-3">
            <ProductListFilter />
          </div>

          <div className="col-md-9">
            <ImageCardSlider
              data={ProductListImageSlider}
              styles={{
                aspectRatio: "unset",
                image_bg: "unset",
                parentPadding: "unset",
              }}
            />

            <div className="bikelist_parent">
              {visibleBikes.map((res, index) => (
                <ProductCard
                  key={res.id || index}
                  card={res}
                  state={{ setOpenPopup, openPopup }}
                />
              ))}

              {loading && (
                <div className="loader">
                  <div className="spinner" />
                  <p>Loading more bikes...</p>
                </div>
              )}

              {!loading && visibleCount >= Bikedetails.length && (
                <div className="end-message">
                  🏁 You’ve reached the finish line!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProductList;
