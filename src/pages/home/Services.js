import React from "react";
import cavity from "../../assets/images/cavity.png";
import fluoride from "../../assets/images/fluoride.png";
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
    <div className="px-4">
      <div className="py-16">
        <div className="container mx-auto  text-center font-bold mt-16">
          <h3 className="text-primary dark:text-accent text-3xl uppercase">Our Services</h3>
          <h2 className="text-4xl dark:text-gray-200">Service We Provide</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 container mx-auto py-24 ">
          {ourServices.map((service) => {
            return <Service key={service.id} service={service} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
