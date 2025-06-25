// React & Router Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages Imports
import Home from "./pages/home/home";
import AboutUs from "./pages/aboutus/aboutus";
import ContactUs from "./pages/contactus/contactus";
import ProductList from "./pages/product-list/product-list";
import ProductDetails from "./pages/product-details/product-details";
import FrequentlyAskedQuestions from "./pages/faq/faq";

// Components Imports
import NavbarDeskTop from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

// Local Imports
import "./App.scss";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <NavbarDeskTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/bikes" element={<ProductList />} />
          <Route path="/bikes/*" element={<ProductList />} />
          <Route
            path="/bike/details/:brand/:bike-name/:bike_id"
            element={<ProductDetails />}
          />
          <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  );
};

export default App;
