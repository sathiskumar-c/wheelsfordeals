// React Imports
import React, { useState } from "react";

// Components Imports
import FeedbackDialog from "../../components/feedback-form/feedback-form";
import FeedbackBanner from "../../components/feedback-banner/feedback-banner";

const FeedbackPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="feedback-page">
      <FeedbackBanner />
      <FeedbackDialog open={isOpen} onClose={handleClose} />
    </div>
  );
};

export default FeedbackPage;
