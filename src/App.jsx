// react & router imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages imports
import Home from "./pages/home/home";
import About from "./pages/about/about";
import ContactUs from "./pages/contactus/contactus";
import ProductList from "./pages/product-list/product-list";

// local imports
import FrequentlyAskedQuestions from "./pages/faq/faq";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/brands/*" element={<ProductList />} />
        <Route path="/faq" element={<FrequentlyAskedQuestions />} />
      </Routes>
    </Router>
  );
};

export default App;
