import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber;
  return (
    <div>
      <Header />
      <Navbar />
      <Banner />
      <ShopSection keyword={keyword} pageNumber={pageNumber} />
      <CalltoActionSection />
      <Footer />
    </div>
  );
};

export default HomeScreen;
