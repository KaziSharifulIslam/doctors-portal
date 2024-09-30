import React from "react";
import Footer from "../shared/Footer";
import AppoinmentSection from "./AppoinmentSection";
import Banner from "./Banner";
import ContactSection from "./ContactSection";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Treatment from "./Treatment";

const Home = () => {
  return (
    <div style={{userSelect: "none"}}>
      <Banner />
      <Services />
      <Treatment />
      <AppoinmentSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
