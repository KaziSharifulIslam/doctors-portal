import React from "react";
import treatment from "../../assets/images/treatment.png";
import Primarybutton from "../shared/Primarybutton";

const Treatment = () => {
  return (
    <div class="hero min-h-screen px-4 py-20">
      <div class="hero-content flex-col lg:flex-row p-0">
        <img src={treatment} class="w-full lg:w-96 rounded-lg shadow-2xl mb-12 lg:mb-0 lg:mr-8" alt="" />
        <div className="lg:w-6/12">
          <h1 class="text-5xl font-bold">
            Exceptional Dental Care, on Your Terms
          </h1>
          <p class="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <Primarybutton>Get Started</Primarybutton>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
