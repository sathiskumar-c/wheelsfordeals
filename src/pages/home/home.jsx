import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import UsedBikeFaq from "../../components/faq-questions/faq-questions";
import OurServices from "../../components/our-services/our-services";
import NeedHelp from "../../components/need-help/need-help";
import Insights from "../../components/insight-driven/insight-driven";
import TopRecommendedBrand from "../../components/top-recommended-brand/top-recommended-brand";
import "./home.scss";
import BrowseBikesBy from "../../components/browse-bikes/browse-bikes";
import GetUpdates from "../../components/get-updates/get-updates";
import WhyChooseUs from "../../components/why-choose-us/why-choose-us";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <BrowseBikesBy />
      <OurServices />
      <TopRecommendedBrand />
      <NeedHelp />
      <WhyChooseUs />
      <Insights />
      <UsedBikeFaq />
      <GetUpdates />
      <Footer />
    </>
  );
};

export default Home;
