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
import Benefits from "../../components/benefits/benefits";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <BrowseBikesBy />
      <Benefits />
      <OurServices />
      <TopRecommendedBrand />
      <NeedHelp />
      <WhyChooseUs />
      <Insights />
      <FrequentlyAskedQuestions />
      <GetUpdates />
      <Footer />
    </>
  );
};

export default Home;
