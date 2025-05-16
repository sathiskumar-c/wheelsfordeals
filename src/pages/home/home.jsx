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
import MotivateUs from "../../components/motivate-us/motivate-us";
import HorizontalTabs from "../../components/common-components/horizontal-tabs/horizontal-tabs";
import Content from "../../components/common-components/content/content";

// JSON import
import ExploreByBodyTypeData from "../../data/explore-bodytype.json";
import BenefitsData from "../../data/benefits.json";
import FAQ from "../../data/frequently-asked-questions.json";

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
      <Footer />
    </>
  );
};

export default Home;
