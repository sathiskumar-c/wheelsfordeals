// React Imports
import React from "react";
import PropTypes from "prop-types";

// Local Imports
import "./animated-action-button.scss";

const AnimatedActionButton = ({ text, icon, ...props }) => {
  return (
    <button className="animated-action-btn" {...props}>
      <span className="animated-action-btn__text">
        {text}
        <span className="animated-action-btn__text--hover">{text}</span>
      </span>
      {icon}
    </button>
  );
};

AnimatedActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default AnimatedActionButton;
