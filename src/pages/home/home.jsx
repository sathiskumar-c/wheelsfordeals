// React Imports
import React, { useEffect } from "react";

// Components Imports
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import FrequentlyAskedQuestions from "../../components/frequently-asked-questions/frequently-asked-questions";
import OurServices from "../../components/our-services/our-services";
import NeedHelp from "../../components/need-help/need-help";
import TopRecommendedBrand from "../../components/top-recommended-brand/top-recommended-brand";
import BrowseBikesBy from "../../components/browse-bikes/browse-bikes";
import GetUpdates from "../../components/get-updates/get-updates";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us";
import ServiceCards from "../../components/services-slider/services-slider";
import MotivateUs from "../../components/motivate-us/motivate-us";
import HorizontalTabs from "../../components/common-components/horizontal-tabs/horizontal-tabs";
import Content from "../../components/common-components/content/content";
import ImageCardSlider from "../../components/common-components/image-card-slider/image-card-slider";
import CardGrid from "../../components/common-components/card-grid/card-grid";

// JSON Imports
import ExploreByBodyTypeData from "../../data/explore-bodytype.json";
import BenefitsData from "../../data/benefits.json";
import FAQ from "../../data/frequently-asked-questions.json";
import ImageReviewData from "../../data/image-review.json";
import InsightsData from "../../data/insight-driven.json";

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

      <CardGrid data={InsightsData.data} title={InsightsData.title} />

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <FrequentlyAskedQuestions JSON={FAQ} />
          </div>
          <div className="col-md-6">
            <Content JSON={FAQ.faq_content} />
          </div>
        </div>
      </div>

      <GetUpdates />
      <MotivateUs />
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
