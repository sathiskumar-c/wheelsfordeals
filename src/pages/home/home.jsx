// React Imports
import React, { useEffect } from "react";

// Components Imports
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import FrequentlyAskedQuestions from "../../components/frequently-asked-questions/frequently-asked-questions";
import OurServices from "../../components/our-services/our-services";
import NeedHelp from "../../components/need-help/need-help";
import TopRecommendedBrand from "../../components/top-recommended-brand/top-recommended-brand";
import BrowseBikesBy from "../../components/browse-bikes/browse-bikes";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us";
import ServiceCards from "../../components/services-slider/services-slider";
import CustomerReviews from "../../components/customer-reviews/customer-reviews";
import HorizontalTabs from "../../components/common-components/horizontal-tabs/horizontal-tabs";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";

// JSON Imports
import ExploreByBodyTypeData from "../../data/explore-bodytype.json";
import BenefitsData from "../../data/benefits.json";
import FAQ from "../../data/frequently-asked-questions.json";
import ImageReviewData from "../../data/image-review.json";

// Services & API
import { getHomePageData } from "../../api/getHomePage";
const API = import.meta.env.VITE_API_BASE_URL;

// Local Imports
import "./home.scss";

const Home = () => {
  // Get Home Page Data
  useEffect(() => {
    getHomePageData(API).then((data) => console.log(data));
  }, []);

  return (
    <React.Fragment>
      <PopularBikes />
      <BrowseBikesBy />
      <HorizontalTabs data={BenefitsData} component="Benefits" />
      <OurServices />
      <TopRecommendedBrand />
      <NeedHelp />
      <ServiceCards />
      <WhyChooseUs />

      <FrequentlyAskedQuestions JSON={FAQ} />

      <CustomerReviews />
      <HorizontalTabs data={ExploreByBodyTypeData} page="ExploreBodyType" />
      <ImageCardSlider
        data={ImageReviewData}
        show={{ title: true, logo: true, content: true }}
        styles={{ aspectRatio: " 3/4" }}
      />
    </React.Fragment>
  );
};

export default Home;
