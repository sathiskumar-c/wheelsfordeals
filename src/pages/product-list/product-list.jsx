// React Imports
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Component Imports
import ProductListFilter from "../../components/product-list-filter/product-list-filter";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import ProductCard from "../../components/common-components/product-card/product-card";
import CommonDialog from "../../components/common-components/dialog/dialog";
import HoverSwapCard from "../../components/common-components/cards/hover-swap-card/hover-swap-card";

// MUI Imports
import TuneIcon from "@mui/icons-material/Tune";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";

// JSON Imports
import ProductListImageSlider from "../../data/product-list-image-slider.json";
import Bikedetails from "../../data/bike-details.json";
import BikeOffersData from "../../data/offers.json";
import ProductFiltersJSON from "../../data/product-list-filter.json";

// Local Imports
import "./product-list.scss";
import { BREAKPOINT_MD } from "../../config";
import BikeImageSwiper from "./utils/bike-images-swipper";
import SortOptionsPopover from "./utils/sort-options-popover";
import BikeDetailsOverview from "./utils/bike-details-overview";
import SellerDealer from "./utils/seller-dealer";
import {
  buildPathFromFilters,
  filterBikes,
  getSortedBikes,
  parseFiltersFromParams,
  parseFiltersFromPath,
  scrollToTop,
  throttle,
  updateChips,
} from "./utils/utils";

// Component Configs
const ITEMS_PER_LOAD_MOBILE = 15;
const ITEMS_PER_LOAD_DESKTOP = 30;

// Function to get initial items count based on screen width
const getInitialItemsPerLoad = () =>
  window.innerWidth < BREAKPOINT_MD
    ? ITEMS_PER_LOAD_MOBILE
    : ITEMS_PER_LOAD_DESKTOP;

const ProductList = () => {
  // Component References
  const location = useLocation();
  const navigate = useNavigate();

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
  const [chips, setChips] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(() =>
    parseFiltersFromPath(location.pathname)
  );

  // Refs for latest values to use in event listeners without recreating handlers
  const loadingRef = useRef(loading);
  const visibleCountRef = useRef(visibleCount);
  const itemsPerLoadRef = useRef(ITEMS_PER_LOAD);
  const openMobileFilterRef = useRef(openMobileFilter);

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

  useEffect(() => {
    const filtersFromPath = parseFiltersFromPath(location.pathname);
    setSelectedFilters(filtersFromPath);
  }, [location.pathname]);

  // Update bikes filtered values
  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const filters = parseFiltersFromParams(searchParams);
      const newPath = buildPathFromFilters(filters);
      navigate(newPath, { replace: true });
    }
  }, []);

  useEffect(() => {
    const newPath = buildPathFromFilters(selectedFilters);
    if (location.pathname !== newPath) {
      navigate(newPath, { replace: true });
    }

    // Add new chips
    updateChips("add", selectedFilters, ProductFiltersJSON, chips, setChips);
  }, [selectedFilters]);

  useEffect(() => {
    const sorted = getSortedBikes(Bikedetails, sort);
    const filtered = filterBikes(sorted, selectedFilters);
    const sliced = filtered.slice(0, visibleCount);
    setVisibleBikes(sliced);
  }, [sort, visibleCount, selectedFilters]);

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

  // Load more items function
  const loadMoreItems = () => {
    if (visibleCountRef.current >= Bikedetails.length) return;

    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + itemsPerLoadRef.current);
      setLoading(false);
    }, 500);
  };

  // Throttled scroll handler reads refs instead of state directly
  // const handleScroll = useCallback(
  //   throttle(() => {
  //     const scrollTop = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const fullHeight = document.body.offsetHeight;

  //     if (scrollTop + windowHeight >= fullHeight - 100 && !loadingRef.current) {
  //       loadMoreItems();
  //     }
  //   }, 200),
  //   []
  // );

  // Add scroll event listener once
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

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

  // Clear all filters / chips
  const handleClearAll = () => {
    updateChips("clear", null, ProductFiltersJSON, chips, setChips);
    setSelectedFilters([]);
  };

  // Particular filters / chips
  const handleClear = (chipToRemove) => {
    updateChips("remove", chipToRemove, ProductFiltersJSON, chips, setChips);

    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[chipToRemove.id];
      return updated;
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid product-list-parent">
        <div className="row">
          <div className="col-md-3">
            {windowWidth >= BREAKPOINT_MD && (
              <ProductListFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            )}
          </div>

          <div className="col-md-9">
            <ImageCardSlider
              data={ProductListImageSlider}
              styles={{
                aspectRatio: "unset",
                image_bg: "unset",
                parentPadding: "unset",
              }}
              componentClass="product_list_slider"
              breakpoints={{
                0: { slidesPerView: 2 },
                576: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
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

              {window.innerWidth > 768 && (
                <div className="chips_parent">
                  {chips?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="chips"
                        onClick={() => handleClear(item)}
                      >
                        <span>{item.label}</span>
                        <ClearIcon />
                      </div>
                    );
                  })}
                  {chips.length > 0 && (
                    <div className="clear_all" onClick={() => handleClearAll()}>
                      Clear All
                      <DeleteIcon />
                    </div>
                  )}
                </div>
              )}

              <div className="sort_icon_parent">
                <SortOptionsPopover sort={sort} setSort={setSort} />
              </div>
            </div>

            {window.innerWidth <= 768 && chips.length > 0 && (
              <div className="chips_parent chips_parent_mobile">
                {chips?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="chips"
                      onClick={() => handleClear(item)}
                    >
                      <span>{item.label}</span>
                      <ClearIcon />
                    </div>
                  );
                })}
                {chips.length > 0 && (
                  <div className="clear_all" onClick={() => handleClearAll()}>
                    Clear All
                  </div>
                )}
              </div>
            )}

            <div className="bikelist_parent">
              {visibleBikes.map((res) => (
                <ProductCard
                  key={res.id}
                  card={res}
                  dialogOpen={handleOpenExpandView}
                />
              ))}

              {!loading && visibleBikes?.length >= visibleCount && (
                <button
                  onClick={() => loadMoreItems()}
                  className="loadmore_button"
                >
                  <span className="btn-txt">Load More</span>
                </button>
              )}

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

      {/* Filter Dialog for Mobile */}
      <CommonDialog
        openDialog={openMobileFilter}
        onClose={handleCloseMobileFilter}
        title="Filter"
        width="95%"
        content={
          <ProductListFilter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
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
              {expandedCard?.brand || ""} | {expandedCard?.model || ""}
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
                  {bikeOffers?.map((res, index) => {
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
                        key={index}
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
    </React.Fragment>
  );
};

export default ProductList;
