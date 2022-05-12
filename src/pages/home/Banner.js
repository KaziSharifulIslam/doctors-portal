import React from "react";
import chair from "../../assets/images/chair.png";
import bg from "../../assets/images/bg.png";


const Banner = () => {
  return (
    <div className="hero min-h-screen px-12 container mx-auto" style={{ backgroundImage: `url: ${ bg }` }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="max-w-sm rounded-lg shadow-2xl m-8" alt="" />
        <div className="sm:py-8 px-12">
          <h1 className="text-6xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>
          <button className="btn btn-secondary bg-gradient-to-r from-primary to-secondary text-white">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
