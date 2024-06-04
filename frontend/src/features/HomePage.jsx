import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import FeaturedProducts from "../features/products/FeaturedProducts";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import { useUser } from "../app/hooks/loadUser";

function HomePage() {
  const { isLoading, user } = useUser();

  if (isLoading) return null;
  return (
    <>
      <Header user={user} />
      <Carousel />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default HomePage;
