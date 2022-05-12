import React from "react";


const Service = ({ service }) => {
  const { name, des, img } = service;
  return (
    <div class="container mx-auto card w-100 bg-base-100 shadow-xl">
      <figure class="px-10 pt-10">
        <img src={img} alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{name}</h2>
        <p>{des}</p>
      </div>
      
    </div>
  );
};

export default Service;
