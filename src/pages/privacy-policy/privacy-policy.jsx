// React Imports
import React from "react";

// Components Imports
import TermsPolicies from "../../components/terms-policies/terms-policies";

//JSON Import
import PrivacyPolicyData from "../../data/privacy-policy.json";

const PolicySection = () => {
  return <TermsPolicies data={PrivacyPolicyData} />;
};

export default PolicySection;
