import "./home.scss";
import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import FrequentlyAskedQuestions from "../../components/frequently-asked-questions/frequently-asked-questions";
import OurServices from "../../components/our-services/our-services";
import NeedHelp from "../../components/need-help/need-help";
import Insights from "../../components/insight-driven/insight-driven";
import TopRecommendedBrand from "../../components/top-recommended-brand/top-recommended-brand";
import BrowseBikesBy from "../../components/browse-bikes/browse-bikes";
import GetUpdates from "../../components/get-updates/get-updates";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us";
import ServiceCards from "../../components/services-slider/services-slider";
import TabsComponent from "../../components/common-components/tabs-component/tabs-component";

// JSON import
import ExploreByBodyTypeData from "../../data/explore-bodytype.json";
import BenefitsData from "../../data/benefits.json";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <BrowseBikesBy />
      <TabsComponent data={BenefitsData} component="Benefits" />
      <OurServices />
      <TopRecommendedBrand />
      <NeedHelp />
      <ServiceCards />
      <WhyChooseUs />
      <Insights />

      <div className="container row">
        <div className="col-6">
          <FrequentlyAskedQuestions />
        </div>
        <div className="col-6">
          Have questions about buying or selling a used bike? We’ve got you
          covered! Below are answers to some of the most common questions our
          customers ask. Whether you're a first-time buyer or looking to sell
          your bike with ease, this section will help you understand the process
          better.

          <button>viwl all faq</button>
        </div>
      </div>

      <GetUpdates />
      <TabsComponent data={ExploreByBodyTypeData} component="ExploreBodyType" />
      <Footer />
    </>
  );
};

export default Home;
