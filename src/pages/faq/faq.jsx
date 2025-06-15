// React Imports
import React from "react";

// Component Imports
import VerticalTabs from "../../components/common-components/vertical-tabs/vertical-tabs";

// JSON Imports
import FAQ from "../../data/frequently-asked-questions.json";

const FrequentlyAskedQuestions = () => {
  return (
    <React.Fragment>
      <VerticalTabs data={FAQ.vertical_tabs_faq} page="FAQ" />
    </React.Fragment>
  );
};

export default FrequentlyAskedQuestions;
