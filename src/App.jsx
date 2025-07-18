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
import AdminLogin from "./pages/admin-login/admin-login";

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
          <Route path="/admin/login" element={<AdminLogin />} />
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

          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </Router>
    </React.Fragment>
  );
};

export default App;
