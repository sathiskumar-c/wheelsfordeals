// React Imports
import React from "react";

// Components Imports
import TermsPolicies from "../../components/terms-policies/terms-policies";

//JSON Import
import TermsandConditionsData from "../../data/terms-conditions.json";

const TermsandConditions = () => {
  return <TermsPolicies data={TermsandConditionsData} />;
};

export default TermsandConditions;
