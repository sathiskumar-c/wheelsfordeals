import React from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./footer.scss";
import JSON from "../../../src/data/footer.json";

const iconMap = {
  facebook: <FacebookIcon />,
  x: <XIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer component-parent">
      <div className="footer-container">
        {JSON.sections.map((section, idx) => {
          return (
            <div
              className={`footer-section ${section.socials ? "social" : ""}`}
              key={idx}
            >
              <h4>{section.title}</h4>
              {section.links && (
                <ul>
                  {section.links.map((link, linkIdx) => {
                    return (
                      <li
                        key={linkIdx}
                        onClick={() => navigate(link.path)}
                        className="footer-link"
                      >
                        {link.label}
                      </li>
                    );
                  })}
                </ul>
              )}
              {section.socials && (
                <div className="social-icons">
                  {section.socials.map((social, socialIdx) => (
                    <a
                      key={socialIdx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      {iconMap[social.platform]}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="footer-bottom">{JSON.copyright}</p>
    </footer>
  );
};

export default Footer;
