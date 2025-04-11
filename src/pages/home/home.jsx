import NavbarDeskTop from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import PopularBikes from "../../components/popular-bikes/popular-bikes";
import UsedBikeFaq from "../../components/faq-questions/faq-questions";

const Home = () => {
  return (
    <>
      <NavbarDeskTop />
      <PopularBikes />
      <UsedBikeFaq />
      <Footer />
    </>
  );
};

export default Home;
