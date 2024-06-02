import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../features/products/FeaturedProducts";
import Footer from "../components/Footer";
import Categories from "../components/Categories";

function HomePage() {
  return (
    <>
      <Header />
      <Carousel />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default HomePage;
