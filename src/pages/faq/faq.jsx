import React from "react";
import VerticalTabs from "../../components/common-components/vertical-tabs/vertical-tabs";
import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// JSON import
import FAQ from "../../data/frequently-asked-questions.json";

const FrequentlyAskedQuestions = () => {
  return (
    <React.Fragment>
      <NavbarDeskTop />
      <VerticalTabs data={FAQ.vertical_tabs_faq} page="FAQ" />
      <Footer />
    </React.Fragment>
  );
};

export default FrequentlyAskedQuestions;
