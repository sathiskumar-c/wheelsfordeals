// React Imports
import React, { useEffect, useState, useCallback } from "react";

// Component Imports
import NavbarDeskTop from "../../components/navbar/navbar";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import ProductCard from "../../components/common-components/product-card/product-card";
import Footer from "../../components/footer/footer";
import CommonDialog from "../../components/common-components/dialog/dialog";

// MUI Imports
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";

// JSON Imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";

// Local Imports
import "./product-list.scss";
import BikeImageSwiper from "./utils/bike-images-swipper";
import SortOptionsPopover from "./utils/sort-options-popover";
import BikeDetailsOverview from "./utils/bike-details-overview";
import { getSortedBikes, scrollToTop, throttle } from "./utils/utils";
import SellerDealer from "./utils/sellerDealer";

// Function to get initial items count based on screen width
const getInitialItemsPerLoad = () => (window.innerWidth < 768 ? 15 : 30);

const ProductList = () => {
  const [ITEMS_PER_LOAD, setItemsPerLoad] = useState(getInitialItemsPerLoad());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleBikes, setVisibleBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recently_posted");
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

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

  // Use Effect to scroll top
  useEffect(() => {
    const cleanup = scrollToTop();
    return cleanup;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerLoad = window.innerWidth < 768 ? 15 : 30;
      setItemsPerLoad(newItemsPerLoad);
      setVisibleCount(newItemsPerLoad);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset visible count when sorting changes and scroll to top
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sort]);

  // Run sorting
  useEffect(() => {
    const sorted = getSortedBikes(Bikedetails, sort);
    const sliced = sorted.slice(0, visibleCount);
    setVisibleBikes(sliced);
  }, [sort, visibleCount]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Dialog open
  const handleDialogOpen = (expanded) => {
    setOpenDialog(true);
    setExpandedCard(expanded);
  };

  // Dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setExpandedCard(null);
  };

  // Load more items
  const loadMoreItems = () => {
    if (visibleCount >= Bikedetails.length) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      setLoading(false);
    }, 500);
  };

  return (
    <React.Fragment>
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
                  dialogOpen={handleDialogOpen}
                  dialogClose={handleDialogClose}
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

      <CommonDialog
        openDialog={openDialog}
        onClose={handleDialogClose}
        title={
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "5px" }}
          >
            <h5 className="mb-0">
              {expandedCard?.brand} | {expandedCard?.model}
            </h5>
            <SellerDealer data={expandedCard} />
          </div>
        }
        content={
          <div>
            <div className="row">
              <div className="col-md-6">
                <BikeImageSwiper images={expandedCard?.images} />
              </div>
              <div className="col-md-6"></div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <BikeDetailsOverview bike={expandedCard} />
              </div>
            </div>
          </div>
        }
        footer={
          <div
            style={{
              display: "flex",
              marginRight: "15px",
              padding: "10px",
              columnGap: "20px",
            }}
          >
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDialogClose}
              color="primary"
              variant="contained"
            >
              Test Drive
            </Button>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default ProductList;
