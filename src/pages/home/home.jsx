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
import CustomerReviews from "../../components/customer-reviews/customer-reviews";
import HorizontalTabs from "../../components/common-components/horizontal-tabs/horizontal-tabs";
import CardCarousel from "../../components/common-components/card-carousel/card-carousel";

// JSON Imports
import BenefitsData from "../../data/benefits.json";
import FAQ from "../../data/frequently-asked-questions.json";
import ServicesCarouselData from "../../data/services-carousel.json";
import ServicesCarouselConfig from "../../data/services-carousel-config.json";

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
      <BrowseBikesBy />
      <PopularBikes />
      <OurServices />
      <HorizontalTabs data={BenefitsData} component="Benefits" />
      <CardCarousel
        items={ServicesCarouselData.servicesCarousel}
        config={ServicesCarouselConfig}
        headerData={{
          title: ServicesCarouselData.title,
          subtitle: ServicesCarouselData.subtitle,
        }}
        showHeader={true}
        showViewAllLink={true}
        viewAllPath="/our-services"
      />
      <TopRecommendedBrand />
      <NeedHelp />
      <WhyChooseUs />

      <FrequentlyAskedQuestions JSON={FAQ} />

      <CustomerReviews />
    </React.Fragment>
  );
};

export default Home;
