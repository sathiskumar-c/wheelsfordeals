import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import OurServices from "../../components/our-services/our-services";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <OurServices />
      <Footer />
    </>
  );
};

export default Home;
