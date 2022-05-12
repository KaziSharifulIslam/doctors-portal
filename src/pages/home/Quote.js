import React from "react";

const Quote = ({ quote }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <p className="mb-4">{quote.quote}</p>
        <div className="flex items-center">
          <div className="avatar mr-5">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={quote.img} alt="" className="mr-4" />
            </div>
          </div>

          <div>
            <h2>{quote.name}</h2>
            <h4>{quote.location}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
