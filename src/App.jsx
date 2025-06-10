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

// Local Imports
import "./App.scss";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/bikes" element={<ProductList />} />
          <Route path="/bikes/*" element={<ProductList />} />
          <Route
            path="/bike/details/:brand/:bike-name"
            element={<ProductDetails />}
          />
          <Route path="/faq" element={<FrequentlyAskedQuestions />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
