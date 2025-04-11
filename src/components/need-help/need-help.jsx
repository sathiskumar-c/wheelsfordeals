import React from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import "../need-help/need-help.scss";
import NeedHelpData from "../../../src/data/need-help.json";

const NeedHelp = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    return navigate(path);
  };

  return (
    <section className="help-section">
      <h2>{NeedHelpData.title}</h2>
      <div className="help-options">
        {NeedHelpData.needhelpdata.map((option, index) => (
          <div
            onClick={() => handleNavigate(option.path)}
            className="help-card"
            key={index}
          >
            <div className="icon">
              {option.icon == "whatsapp" && <WhatsAppIcon />}
              {option.icon == "helpline" && <HeadsetMicIcon />}
              {option.icon == "questionmark" && <QuestionMarkIcon />}
            </div>
            <div className="text">
              <h3>{option.title}</h3>
              <p>{option.description}</p>
            </div>
            <div className="arrow">
              <KeyboardArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NeedHelp;
