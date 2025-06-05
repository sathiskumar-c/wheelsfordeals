// React Imports
import { useEffect, useState, useCallback } from "react";

// Component Imports
import NavbarDeskTop from "../../components/navbar/navbar";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import ProductCard from "../../components/common-components/product-card/product-card";
import Footer from "../../components/footer/footer";

// MUI Imports
import TuneIcon from "@mui/icons-material/Tune";

// JSON Imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";

// Local Imports
import "./product-list.scss";
import { throttle, SortOptionsPopover } from "./utils/utils";

const ProductList = () => {
  // Function to get initial items count based on screen width
  const getInitialItemsPerLoad = () => (window.innerWidth < 768 ? 15 : 30);

  // Dynamic items per load based on screen size
  const [ITEMS_PER_LOAD, setItemsPerLoad] = useState(getInitialItemsPerLoad());
  const [openPopup, setOpenPopup] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleBikes, setVisibleBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recently_posted");

  // Optional: Update items per load and visible count on resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerLoad = window.innerWidth < 768 ? 15 : 30;
      if (newItemsPerLoad !== ITEMS_PER_LOAD) {
        setItemsPerLoad(newItemsPerLoad);
        setVisibleCount(newItemsPerLoad);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ITEMS_PER_LOAD]);

  // Update visible bikes when visibleCount changes
  useEffect(() => {
    const sliced = Bikedetails.slice(0, visibleCount);
    setVisibleBikes(sliced);
  }, [visibleCount]);

  const loadMoreItems = () => {
    if (visibleCount >= Bikedetails.length) return;

    setLoading(true);
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
    [visibleCount, loading, ITEMS_PER_LOAD]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <NavbarDeskTop />
      <div className="container-fluid product-list-parent">
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

            <div className="sort_filter_parent">
              <div className="filter_icon_parent">
                <TuneIcon />
                <h6 className="mb-0">Filter</h6>
              </div>

              <div className="sort_icon_parent">
                <SortOptionsPopover sort={sort} setSort={setSort} />
              </div>
            </div>

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
    </>
  );
};

export default ProductList;
