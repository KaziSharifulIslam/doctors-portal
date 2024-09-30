import React from "react";

const InfoCard = ({ img, bg, h, p }) => {
    // console.log(bg);
  return (
    <div className={`card card-side ${bg} shadow-xl px-4 text-white`}>
      <figure>
        <img src={img} alt="Album" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{h}</h2>
        <p>{p}</p>
      </div>
    </div>
  );
};

export default InfoCard;
