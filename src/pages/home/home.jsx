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

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <UsedBikeFaq />
      <OurServices />
      <BrowseBikesBy />
      <TopRecommendedBrand />
      <NeedHelp />
      <Insights />
      <Footer />
    </>
  );
};

export default Home;
