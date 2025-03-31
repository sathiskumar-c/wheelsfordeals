import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import ContactUs from "./pages/contactus/contactus";

const App = () => {
  return (
    <Router>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>


      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contactus">Contact</Link>
          </li>
        </ul>
      </nav> */}
    </Router>
  );
};

export default App;
