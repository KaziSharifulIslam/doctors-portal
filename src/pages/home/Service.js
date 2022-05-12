import React from "react";


const Service = ({ service }) => {
  const { name, des, img } = service;
  return (
    <div className="container mx-auto card w-100 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{des}</p>
      </div>
      
    </div>
  );
};

export default Service;
