import React from "react";
import bg from "../../assets/images/bg.png";
import chair from "../../assets/images/chair.png";
import Primarybutton from "../shared/Primarybutton";
import InfoCards from "./info/InfoCards";

const Banner = () => {
  return (
    <div className="min-h-screen flex justify-center flex-col container mx-auto py-16 px-4">
      <div
        className="container mx-auto "
        style={{ backgroundImage: `url: ${bg}` }}
      >
        <div className="flex flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className="max-w-lg rounded-lg shadow-2xl m-8"
            alt=""
          />
          <div className="sm:py-8">
            <h1 className="text-6xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
           <Primarybutton>Get Started</Primarybutton>
          </div>
        </div>
      </div>
      <InfoCards />
    </div>
  );
};

export default Banner;
