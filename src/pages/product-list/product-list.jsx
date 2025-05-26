// React Imports
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

// Component Imports
import NavbarDeskTop from "../../components/navbar/navbar";
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import ProductCard from "../../components/common-components/product-card/product-card";
import Footer from "../../components/footer/footer";
import CommonDialog from "../../components/common-components/dialog/dialog";
import HoverSwapCard from "../../components/common-components/cards/hover-swap-card/hover-swap-card";

// MUI Imports
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";

// JSON Imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";
import BikeOffersData from "../../data/offers.json";

// Local Imports
import "./product-list.scss";
import { BREAKPOINT_MD } from "../../config";
import BikeImageSwiper from "./utils/bike-images-swipper";
import SortOptionsPopover from "./utils/sort-options-popover";
import BikeDetailsOverview from "./utils/bike-details-overview";
import SellerDealer from "./utils/seller-dealer";
import { getSortedBikes, scrollToTop, throttle } from "./utils/utils";

// Component Configs
const ITEMS_PER_LOAD_MOBILE = 15;
const ITEMS_PER_LOAD_DESKTOP = 30;

// Function to get initial items count based on screen width
const getInitialItemsPerLoad = () =>
  window.innerWidth < BREAKPOINT_MD
    ? ITEMS_PER_LOAD_MOBILE
    : ITEMS_PER_LOAD_DESKTOP;

const ProductList = () => {
  // Local States
  const [ITEMS_PER_LOAD, setItemsPerLoad] = useState(getInitialItemsPerLoad());
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [visibleBikes, setVisibleBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("recently_posted");
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openMobileFilter, setOpenMobileFilter] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [bikeOffers, setBikeOffers] = useState([]);

  // Refs for latest values to use in event listeners without recreating handlers
  const loadingRef = useRef(loading);
  const visibleCountRef = useRef(visibleCount);
  const itemsPerLoadRef = useRef(ITEMS_PER_LOAD);
  const openMobileFilterRef = useRef(openMobileFilter);

  // URL params
  const params = useParams();

  // Update refs whenever state changes
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    visibleCountRef.current = visibleCount;
  }, [visibleCount]);

  useEffect(() => {
    itemsPerLoadRef.current = ITEMS_PER_LOAD;
  }, [ITEMS_PER_LOAD]);

  useEffect(() => {
    openMobileFilterRef.current = openMobileFilter;
  }, [openMobileFilter]);

  // Throttled scroll handler reads refs instead of state directly
  const handleScroll = useCallback(
    throttle(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loadingRef.current) {
        loadMoreItems();
      }
    }, 200),
    []
  );

  // Load more items function
  const loadMoreItems = () => {
    if (visibleCountRef.current >= Bikedetails.length) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + itemsPerLoadRef.current);
      setLoading(false);
    }, 500);
  };

  // Handle window resize (throttled)
  useEffect(() => {
    const throttledResize = throttle(() => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);

      const newItemsPerLoad =
        newWidth < BREAKPOINT_MD
          ? ITEMS_PER_LOAD_MOBILE
          : ITEMS_PER_LOAD_DESKTOP;
      setItemsPerLoad((prev) => {
        if (prev !== newItemsPerLoad) {
          itemsPerLoadRef.current = newItemsPerLoad; // sync ref too
          return newItemsPerLoad;
        }
        return prev;
      });

      setVisibleCount((prevVisible) => {
        // Don't decrease visibleCount on resize, only increase if below threshold
        return prevVisible < newItemsPerLoad ? newItemsPerLoad : prevVisible;
      });

      if (newWidth >= 769 && openMobileFilterRef.current) {
        setOpenMobileFilter(false);
      }
    }, 200);

    window.addEventListener("resize", throttledResize);
    throttledResize(); // Run once on mount

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  // Scroll to top on sort change
  useEffect(() => {
    scrollToTop();
  }, []);

  // Reset visible count when sorting changes and scroll to top
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sort, ITEMS_PER_LOAD]);

  // Sort and slice bikes when sort or visibleCount changes
  useEffect(() => {
    const sorted = getSortedBikes(Bikedetails, sort);
    const sliced = sorted.slice(0, visibleCount);
    setVisibleBikes(sliced);
  }, [sort, visibleCount]);

  // Add scroll event listener once
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Dialog open handlers
  const handleOpenExpandView = (expanded) => {
    const checkOffers = BikeOffersData.offers.filter((item) => {
      return expanded.offers.includes(item.key);
    });

    setBikeOffers(checkOffers);
    setOpenDialog(true);
    setExpandedCard(expanded);
  };

  // Dialog close handlers
  const handleCloseExpandView = () => {
    setOpenDialog(false);
    setExpandedCard(null);
    setBikeOffers([]);
  };

  // Mobile filter open
  const handleOpenMobileFilter = () => {
    if (windowWidth < 768) {
      setOpenMobileFilter(true);
    }
  };

  // Mobile filter close
  const handleCloseMobileFilter = () => {
    setOpenMobileFilter(false);
  };

  return (
    <>
      <NavbarDeskTop />
      <div className="container-fluid product-list-parent">
        <div className="row">
          <div className="col-md-3">
            {windowWidth >= BREAKPOINT_MD && <ProductListFilter />}
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
              <div
                className="filter_icon_parent"
                onClick={handleOpenMobileFilter}
              >
                <TuneIcon />
                <h6 className="mb-0">Filter</h6>
              </div>

              <div className="sort_icon_parent">
                <SortOptionsPopover sort={sort} setSort={setSort} />
              </div>
            </div>

            <div className="bikelist_parent">
              {visibleBikes.map((res) => (
                <ProductCard
                  key={res.id}
                  card={res}
                  dialogOpen={handleOpenExpandView}
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

      {/* Filter Dialog for Mobile */}
      <CommonDialog
        openDialog={openMobileFilter}
        onClose={handleCloseMobileFilter}
        title="Filter"
        width="95%"
        content={<ProductListFilter />}
        footer={
          <div
            style={{
              display: "flex",
              marginRight: "15px",
              padding: "10px",
              columnGap: "20px",
            }}
          >
            <Button onClick={handleCloseMobileFilter} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleCloseMobileFilter}
              color="primary"
              variant="contained"
            >
              Apply
            </Button>
          </div>
        }
      />

      {/* Expanded Card Dialog */}
      <CommonDialog
        openDialog={openDialog}
        onClose={handleCloseExpandView}
        width="75%"
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
              <div className="col-md-5">
                <BikeImageSwiper images={expandedCard?.images} />
              </div>
              <div className="col-md-7">
                <h3 className="section-title">Special offers for this bike</h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    columnGap: "15px",
                    rowGap: "15px",
                  }}
                >
                  {bikeOffers?.map((res) => {
                    return (
                      // <HoverFadeCard
                      //   frontSideContent={
                      //     <img
                      //       src={res.image}
                      //       alt={res.title}
                      //       title={res.title}
                      //       loading="lazy"
                      //       style={{
                      //         height: "100px",
                      //         width: "100px",
                      //         objectFit: "contain",
                      //       }}
                      //     />
                      //   }
                      //   backSideContent={
                      //     <h6 style={{ width: "75%", margin: "auto" }}>
                      //       {res.title}
                      //     </h6>
                      //   }
                      //   styles={{ width: "160px", height: "150px" }}
                      // />
                      <HoverSwapCard
                        frontSideContent={
                          <h6 style={{ margin: "auto", textAlign: "center" }}>
                            {res?.title}
                          </h6>
                        }
                        backSideContent=""
                        backSideTitle={res?.title}
                        subtitle={res?.short}
                        styles={{ backGroundImage: res?.image }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <BikeDetailsOverview bike={expandedCard} />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ProductList;
