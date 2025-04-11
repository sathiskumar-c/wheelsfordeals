import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import navbarMenuData from "../../../src/data/navbar-menu.json";
import "./navbar.scss";

function NavbarDeskTop() {
  const navigate = useNavigate(); // React Router navigation

  // State management
  const [navbarData, setNavbarData] = useState(null);
  const [isMenuHovered, setIsMenuHovered] = useState(null); // isMenuHovered: to track which main menu item is hovered
  const [isSubMenuHovered, setIsSubMenuHovered] = useState({}); // isSubMenuHovered: to track which submenu item is hovered
  const [currentSubMenuData, setCurrentSubMenuData] = useState(null); // currentSubMenu: to track the currently active submenu
  const [currentMenuData, setCurrentMenuData] = useState(null); // currentSubMenu: to track the currently active submenu

  // Main menu mouse hover and leave
  function handleMenuHoverandLeave(response) {
    setIsMenuHovered(response);

    const findCurrentMenu = navbarMenuData.navLinks.find(
      (item) => item.label === response
    );

    setCurrentMenuData(findCurrentMenu);

    console.log("handleMenuHoverandLeave:", findCurrentMenu, currentMenuData);
  }

  // Sub menu mouse hover
  const handleSubMenuHover = (e, category) => {
    setIsSubMenuHovered((prev) => ({ ...prev, [category]: true }));

    const findCurrentSubMenu = currentMenuData.categories.find((item) => {
      return item.name === category;
    });

    setCurrentSubMenuData(findCurrentSubMenu);

    console.log(
      "handleSubMenuHover",
      findCurrentSubMenu,
      category,
      findCurrentSubMenu.subcategories,
      currentSubMenuData
    );
  };

  // Sub menu mouse leave
  const handleSubMenuLeave = (category) => {
    setIsSubMenuHovered((prev) => ({ ...prev, [category]: false }));
  };

  // Hybrid Navigation - Handles both internal and external links safely
  const handleNavigation = (subcategory) => {
    if (!subcategory || subcategory.trim() === "") {
      console.error("Invalid category, redirecting to home.");
      navigate("/error"); //  Redirect to an error page if empty
      return;
    }

    console.log("Navigating to:", subcategory); //  Debugging Log

    if (subcategory.startsWith("http")) {
      //  External URL Handling - Opens in a new tab securely
      window.open(subcategory, "_blank", "noopener,noreferrer");
    } else {
      // Internal Navigation - Uses useNavigate for faster navigation
      navigate(`/brand/${subcategory}`);
    }

    console.log("handleNavigation", subcategory);
  };

  useEffect(() => {
    setNavbarData(navbarMenuData);
  }, []);

  useEffect(() => {
    console.log("Updated currentMenuData:", currentMenuData);
  }, [currentMenuData]); // Runs whenever currentMenuData changes

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-3 navbar-menu">
        <Container>
          <Navbar.Brand as={Link} to="/">
            WheelsForDeals
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-md" />
          <Navbar.Offcanvas
            className="offcanvasNavbar"
            id="offcanvasNavbar-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-grow-1">
                {/* Map through menuData.json to generate menu dynamically */}
                {navbarData?.navLinks.map((navItem) => (
                  <div
                    key={navItem.label}
                    className="menu-container"
                    onMouseEnter={() => handleMenuHoverandLeave(navItem.label)}
                    onMouseLeave={() => handleMenuHoverandLeave(null)}
                  >
                    <Nav.Link as={Link} to={navItem.path}>
                      {navItem.label}
                      {navItem.submenu && (
                        <KeyboardArrowDownIcon
                          style={{
                            transform:
                              isMenuHovered === navItem.label
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      )}
                    </Nav.Link>

                    {/* If it has a submenu, render it */}
                    {isMenuHovered === navItem.label && navItem.submenu && (
                      <div
                        className="sub-menu-desktop"
                        onMouseEnter={() =>
                          setIsSubMenuHovered((prev) => ({
                            ...prev,
                            [currentSubMenuData?.name]: true,
                          }))
                        }
                        onMouseLeave={() =>
                          setIsSubMenuHovered((prev) => ({
                            ...prev,
                            [currentSubMenuData?.name]: false,
                          }))
                        }
                      >
                        {/* Left Side - Categories */}
                        <div className="sub-menu-desktop-left">
                          <ul className="sub-menu-ul-left">
                            {currentMenuData?.categories?.length > 0 &&
                              currentMenuData?.categories.map((category) => (
                                <li
                                  key={category.name}
                                  onMouseEnter={(e) =>
                                    handleSubMenuHover(e, category.name)
                                  }
                                  onMouseLeave={(e) =>
                                    handleSubMenuLeave(e, category.name)
                                  }
                                >
                                  {category.name}
                                  <KeyboardArrowRightIcon
                                    style={{ float: "right" }}
                                  />
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Right Side - Subcategories */}
                        <div className="sub-menu-desktop-right">
                          {/* Handling Different Submenu Types */}
                          {currentSubMenuData?.section_type ===
                            "append_as_link" && (
                            <ul className="sub-menu-ul-right">
                              {currentSubMenuData.subcategories.map((sub) => (
                                <li
                                  key={sub.id}
                                  id={sub.id}
                                  onClick={() => handleNavigation(sub.name)}
                                >
                                  {sub.name}
                                </li>
                              ))}
                            </ul>
                          )}

                          {currentSubMenuData?.section_type ===
                            "append_as_image" && (
                            <ul className="sub-menu-ul-right append_as_image">
                              {currentSubMenuData.subcategories.map((sub) => {
                                return (
                                  <li
                                    className="append_as_image_li"
                                    key={sub.id}
                                    id={sub.id}
                                    onClick={() => handleNavigation(sub.path)}
                                  >
                                    {/* Error Handling: Default image if the URL is broken */}
                                    <img
                                      className="append_as_image_img"
                                      id={sub.id}
                                      src={sub.image}
                                      alt={sub.alt}
                                      title={sub.alt}
                                      onError={(e) => {
                                        e.target.src = "/default-image.jpg"; // Replaces broken image with a fallback
                                        console.error(
                                          `Image failed to load: ${sub.image}`
                                        );
                                      }}
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarDeskTop;
