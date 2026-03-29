// React Imports
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// MUI & MUI Icon Imports
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import SettingsInputComponentRoundedIcon from "@mui/icons-material/SettingsInputComponentRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

// PropTypes
import PropTypes from "prop-types";

// Local Imports
import "./navbar.scss";
import navbarData from "../../data/navbar-menu.json";

// Icon map keyed to category names from navbar-menu.json
const CATEGORY_ICONS = {
  "Browse by Top deal": <StarRoundedIcon />,
  "Browse by Brand": <StorefrontRoundedIcon />,
  "Browse by Price": <PaymentsRoundedIcon />,
  "Select by Type": <CategoryRoundedIcon />,
  "Browse by Fuel Type": <LocalGasStationRoundedIcon />,
  "Browse by Transmission": <SettingsInputComponentRoundedIcon />,
  "Browse by City": <LocationOnRoundedIcon />,
};

// Profile menu icon map keyed to label
const PROFILE_MENU_ICONS = {
  Profile: (
    <AccountCircleRoundedIcon
      sx={{ mr: 1.5, fontSize: 20, color: "#474553" }}
    />
  ),
  "My Orders": (
    <ListAltRoundedIcon sx={{ mr: 1.5, fontSize: 20, color: "#474553" }} />
  ),
  "My Wishlist": (
    <FavoriteBorderIcon sx={{ mr: 1.5, fontSize: 20, color: "#474553" }} />
  ),
  Logout: (
    <LogoutRoundedIcon sx={{ mr: 1.5, fontSize: 20, color: "#474553" }} />
  ),
};

// Temporary profile data (swap with Redux auth when ready)
const TEMP_USER = {
  name: "Musharof Chowdhury",
  email: "randomuser@pimjo.com",
  memberLabel: "Premium Member",
  isLoggedIn: true,
};

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [profileImageError, setProfileImageError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // null = nothing selected by default — only set on explicit click
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeNavLabel, setActiveNavLabel] = useState(null);

  // Discovery categories live under navLinks[0] ("Buy Used Bikes")
  const discoveryCategories = navbarData.navLinks[0]?.categories ?? [];

  // Derive the full category data object for the active category
  const activeCategoryData =
    discoveryCategories.find((c) => c.name === activeCategory) ?? null;

  const sidebarRef = useRef(null);
  const flyoutRef = useRef(null);
  const headerRef = useRef(null);

  // Close both sidebar + flyout when clicking outside
  useEffect(() => {
    if (!activeNavLabel && !activeCategory) return;
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current?.contains(e.target) ||
        flyoutRef.current?.contains(e.target) ||
        headerRef.current?.contains(e.target)
      )
        return;
      setActiveNavLabel(null);
      setActiveCategory(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeNavLabel, activeCategory]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleProfileMenuClick = (menuItem) => {
    handleCloseUserMenu();
    if (menuItem.action === "navigate" && menuItem.path) {
      navigate(menuItem.path);
    } else if (menuItem.action === "logout") {
      console.log("Logout clicked");
    }
  };

  // Click to expand, click same item again to collapse
  const toggleCategory = (categoryName) => {
    setActiveCategory(categoryName); // always select, never deselect on same-row click
  };

  // also reset activeCategory when closing top nav
  const handleTopNavClick = (navItem) => {
    if (navItem.submenu) {
      if (activeNavLabel === navItem.label) {
        // toggle close — hide everything
        setActiveNavLabel(null);
        setActiveCategory(null);
      } else {
        // open sidebar and auto-select the first category
        setActiveNavLabel(navItem.label);
        const firstCat = navItem.categories?.[0]?.name ?? null;
        setActiveCategory(firstCat);
      }
    } else {
      setActiveNavLabel(null);
      setActiveCategory(null);
    }
  };

  // Navigate to the correct route when a subcategory item is clicked (same as old navbar logic)
  const handleSubcategoryNav = (sub, category) => {
    setActiveCategory(null);
    setActiveNavLabel(null); // close everything on navigate
    const target =
      category.section_type === "append_as_image" && sub.path
        ? sub.path
        : sub.name;
    if (!target || target.trim() === "") {
      navigate("/page-not-found");
      return;
    }
    if (target.startsWith("http")) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/bikes/brands/${target}`);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="nbr__header" ref={headerRef}>
        <div className="nbr__header-inner">
          {/* Left: logo + top nav links */}
          <div className="nbr__header-left">
            <Link to="/" className="nbr__logo">
              <TwoWheelerRoundedIcon className="nbr__logo-icon" />
              <span className="nbr__logo-text">{navbarData.title}</span>
            </Link>

            <nav className="nbr__top-nav">
              {navbarData.navLinks.map((navItem) =>
                navItem.submenu ? (
                  <button
                    key={navItem.label}
                    type="button"
                    className={`nbr__top-nav-link${activeNavLabel === navItem.label ? " nbr__top-nav-link--active" : ""}`}
                    onClick={() => handleTopNavClick(navItem)}
                  >
                    {navItem.label}
                  </button>
                ) : (
                  <Link
                    key={navItem.label}
                    to={navItem.path}
                    className={`nbr__top-nav-link${activeNavLabel === navItem.label ? " nbr__top-nav-link--active" : ""}`}
                    onClick={() => handleTopNavClick(navItem)}
                  >
                    {navItem.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Right: search + notifications + profile */}
          <div className="nbr__header-right">
            <div className="nbr__search">
              <SearchRoundedIcon className="nbr__search-icon" />
              <input
                className="nbr__search-input"
                type="text"
                placeholder="Search brands or models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <IconButton className="nbr__notif-btn" size="small">
              <Badge color="error" variant="dot">
                <NotificationsRoundedIcon className="nbr__notif-icon" />
              </Badge>
            </IconButton>

            <div className="nbr__profile">
              <Tooltip title={navbarData.profile.tooltip}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  className="nbr__profile-btn"
                  sx={{ p: 0 }}
                >
                  <div className="nbr__profile-inner">
                    <div className="nbr__profile-info">
                      <span className="nbr__profile-name">
                        {TEMP_USER.name}
                      </span>
                      <span className="nbr__profile-badge">
                        {TEMP_USER.memberLabel}
                      </span>
                    </div>
                    <Avatar
                      alt={TEMP_USER.name}
                      src={
                        profileImageError
                          ? navbarData.profile.fallbackAvatar
                          : navbarData.profile.defaultAvatar
                      }
                      onError={() => setProfileImageError(true)}
                      className="nbr__avatar"
                      sx={{ width: 40, height: 40 }}
                    />
                  </div>
                </IconButton>
              </Tooltip>

              <Menu
                id="nbr-profile-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{
                  mt: "56px",
                  "& .MuiPaper-root": {
                    borderRadius: "12px",
                    minWidth: "200px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {TEMP_USER.isLoggedIn && (
                  <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #f0f0f2" }}>
                    <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                      {TEMP_USER.name}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "gray" }}>
                      {TEMP_USER.email}
                    </Typography>
                  </Box>
                )}
                {navbarData.profile.menuItems.map((menuItem) => (
                  <MenuItem
                    key={menuItem.label}
                    onClick={() => handleProfileMenuClick(menuItem)}
                  >
                    {PROFILE_MENU_ICONS[menuItem.label] ?? null}
                    <Typography sx={{ fontSize: "14px" }}>
                      {menuItem.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar overlay - visible when a top nav item with submenu is active */}
      {activeNavLabel && (
        <aside className="nbr__sidebar" ref={sidebarRef}>
          <div className="nbr__sidebar-section">
            <p className="nbr__sidebar-section-label">Discovery</p>
            <nav className="nbr__sidebar-nav">
              {discoveryCategories.map((category) => (
                <button
                  key={category.name}
                  className={`nbr__sidebar-item${activeCategory === category.name ? " nbr__sidebar-item--active" : ""}`}
                  onClick={() => toggleCategory(category.name)}
                >
                  <span className="nbr__sidebar-item-icon">
                    {CATEGORY_ICONS[category.name] ?? <StorefrontRoundedIcon />}
                  </span>
                  <span className="nbr__sidebar-item-label">
                    {category.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
      )}

      {/* Flyout panel - visible when a sidebar category is selected */}
      {activeCategoryData && (
        <div className="nbr__flyout" ref={flyoutRef}>
          <p className="nbr__flyout-title">{activeCategoryData.name}</p>

          {activeCategoryData.section_type === "append_as_image" && (
            <div className="nbr__flyout-grid">
              {activeCategoryData.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="nbr__flyout-grid-item"
                  onClick={() => handleSubcategoryNav(sub, activeCategoryData)}
                >
                  <div className="nbr__flyout-grid-item-img">
                    <img
                      src={sub.image}
                      alt={sub.alt}
                      title={sub.alt}
                      onError={(e) => {
                        e.target.src = navbarData.ui.defaultImage;
                      }}
                    />
                  </div>
                  <span>{sub.name}</span>
                </div>
              ))}
            </div>
          )}

          {activeCategoryData.section_type === "append_as_link" && (
            <ul className="nbr__flyout-list">
              {activeCategoryData.subcategories.map((sub) => (
                <li
                  key={sub.id}
                  className="nbr__flyout-list-item"
                  onClick={() => handleSubcategoryNav(sub, activeCategoryData)}
                >
                  {sub.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Body Layout */}
      <div className="nbr__layout">
        <main className="nbr__main">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="nbr__mobile-nav">
        <Link
          to="/"
          className={`nbr__mobile-nav-item${location.pathname === "/" ? " nbr__mobile-nav-item--active" : ""}`}
        >
          <HomeRoundedIcon />
          <span>Home</span>
        </Link>

        <Link
          to="/bikes"
          className={`nbr__mobile-nav-item${location.pathname.startsWith("/bikes") ? " nbr__mobile-nav-item--active" : ""}`}
        >
          <ExploreRoundedIcon />
          <span>Explore</span>
        </Link>

        <button
          className="nbr__mobile-nav-fab"
          onClick={() =>
            navigate(navbarData.navLinks[1]?.path ?? "/sell-your-bike")
          }
          aria-label="Post an Ad"
        >
          <AddRoundedIcon />
        </button>

        <Link
          to="/my-wishlist"
          className={`nbr__mobile-nav-item${location.pathname.startsWith("/my-wishlist") ? " nbr__mobile-nav-item--active" : ""}`}
        >
          <FavoriteBorderIcon />
          <span>Favorites</span>
        </Link>

        <Link
          to="/my-profile"
          className={`nbr__mobile-nav-item${location.pathname.startsWith("/my-profile") ? " nbr__mobile-nav-item--active" : ""}`}
        >
          <PersonRoundedIcon />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};

export default Navbar;
