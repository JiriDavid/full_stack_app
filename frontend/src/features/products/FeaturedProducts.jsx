import React from "react";
import Card from "./Card.jsx";

function FeaturedProducts() {
  return (
    <section className="section">
      <h1 className="font-bold text-2xl my-6">Featured Products</h1>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from(Array(12)).map((item) => (
          <Card key={item} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
