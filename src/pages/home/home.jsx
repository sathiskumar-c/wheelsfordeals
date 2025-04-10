import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import OurServices from "../../components/our-services/our-services";
import Insights from "../../components/insight-driven/insight-driven";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <OurServices />
      <Insights />
      <Footer />
    </>
  );
};

export default Home;
