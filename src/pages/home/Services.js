import React from "react";
import cavity from "../../assets/images/cavity.png";
import fluoride from "../../assets/images/fluoride.png";
import treatment1 from "../../assets/images/treatment.png";
import whitening from "../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const ourServices = [
    {
      id: 1,
      name: "Fluoride Treatment",
      des: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: cavity,
    },
    {
      id: 2,
      name: "Teeth Whitening",
      des: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: fluoride,
    },
    {
      id: 3,
      name: "Cavity Filling",
      des: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: whitening,
    },
  ];
  return (
    <div className="container mx-auto mb-32">
      <div className="text-center font-bold mt-32 pb-24">
        <h3 className="text-primary text-3xl uppercase">Our Services</h3>
        <h2 className="text-4xl">Service We Provide</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-12">
        {ourServices.map((service) => {
          return <Service key={service.id} service={service} />;
        })}
      </div>
      <div class="hero min-h-screen my-24">
        <div class="hero-content flex-col lg:flex-row mx-24">
          <img src={treatment1} class="max-w-sm rounded-lg shadow-2xl mr-12 my-8" alt="" />
          <div>
            <h1 class="text-5xl font-bold">
              Exceptional Dental Care, on Your Terms </h1>
            <p class="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <button class="btn btn-primary text-white">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
