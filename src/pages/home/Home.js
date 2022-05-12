import React from "react";
import Banner from "./Banner";
import InfoCards from "./info/InfoCards";
import Services from "./Services";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Banner/>
      <InfoCards/>
      <Services/> 
    </div>
  );
};

export default Home;
