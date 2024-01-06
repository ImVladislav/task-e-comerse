import React from "react";
import Card from "react-bootstrap/Card";
import banner from "./banner.png";
import Products from "./Products";

const Home = () => {
  return (
    <div className="home-banner">
      <Card className="bg-dark text-dark border-0">
        <Card.Img src={banner} alt="banner" />
      </Card>
      <Products />
    </div>
  );
};

export default Home;
