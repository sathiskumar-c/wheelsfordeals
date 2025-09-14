// React & Router Imports
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages Imports
import Home from "./pages/home/home";
import AboutUs from "./pages/aboutus/aboutus";
import ContactUs from "./pages/contactus/contactus";
import ProductList from "./pages/product-list/product-list";
import ProductDetails from "./pages/product-details/product-details";
import FrequentlyAskedQuestions from "./pages/faq/faq";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import PrivacyPolicy from "./pages/privacy-policy/privacy-policy";
import TermsandConditions from "./pages/terms-conditions/terms-conditions";
import BookRide from "./pages/test-ride/test-ride";
import BookBike from "./pages/book-bike/book-bike";
import MyProfile from "./pages/my-profile/my-profile";

// Components Imports
import NavbarDeskTop from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import PageNotFound from "./components/page-not-found/page-not-found";

// Local Imports
import "./App.scss";

const HIDE_HEADER_FOOTER_PATHS = ["/login", "/signup", "/admin/login"];

const App = () => {
  const hideHeaderFooter = HIDE_HEADER_FOOTER_PATHS.includes(location.pathname);

  return (
    <React.Fragment>
      <Router>
        {!hideHeaderFooter && <NavbarDeskTop />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsandConditions />}
          />
          <Route path="/bikes" element={<ProductList />} />
          <Route path="/bikes/*" element={<ProductList />} />
          <Route
            path="/bike/details/:brand/:bike-name/:bike_id"
            element={<ProductDetails />}
          />
          <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
          <Route
            path="/test-drive/:bike_brand/:bike_model/:bike_id"
            element={<BookRide />}
          />
          <Route path="/my-profile" element={<MyProfile />} />

          <Route
            path="/book-bike/:bike_brand/:bike_model/:bike_id"
            element={<BookBike />}
          />

          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>

        {!hideHeaderFooter && <Footer />}
      </Router>
    </React.Fragment>
  );
};

export default App;
