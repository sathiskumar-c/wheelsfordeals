import React from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press kit</li>
            <li>Blog</li>
            <li>Article</li>
            <li>News</li>
            <li>Privacy Policy</li>
            <li>Sustainability</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>DISCOVER</h4>
          <ul>
            <li>Buy used bike</li>
            <li>Sell used bike</li>
            <li>Used bike valuation</li>
            <li>Motor insurance</li>
            <li>Check & pay challan</li>
            <li>Check vehicle details</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>HELP & SUPPORT</h4>
          <ul>
            <li>FAQs</li>
            <li>Security</li>
            <li>Contact us</li>
            <li>Become a partner</li>
            <li>RC transfer status</li>
            <li>Terms & conditions</li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4>SOCIAL LINKS</h4>
          <div className="social-icons">
            <FacebookIcon />
            <XIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <p className="footer-bottom">
        © 2025 WheelsForDeals, All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
