import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./footer.scss";
import footerData from "../../data/footer.json";

const iconMap = {
  facebook: <FacebookIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
};

const Footer = () => {
  const navigate = useNavigate();

  const socialSection = footerData.sections.find((s) => s.socials);
  const linkSections = footerData.sections.filter((s) => s.links);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Brand & Social */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">WheelsForDeals</div>
          <p className="footer-description">
            Your trusted marketplace for buying and selling pre-owned bikes.
            Quality vehicles, transparent deals, and seamless experience for
            every rider.
          </p>
          {socialSection && (
            <div className="social-icons">
              {socialSection.socials.map((social, socialIdx) => (
                <a
                  key={socialIdx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.platform}
                >
                  {iconMap[social.platform]}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Columns 2–4: Link sections */}
        {linkSections.map((section, idx) => (
          <div className="footer-section" key={idx}>
            <h4>{section.title}</h4>
            <ul>
              {section.links.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  onClick={() => navigate(link.path)}
                  className="footer-link"
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom-bar">
        <p className="footer-bottom">{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
