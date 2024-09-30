import React from "react";
import quote from "../../assets/icons/quote.svg";
import people1 from '../../assets/images/people1.png';
import people2 from '../../assets/images/people2.png';
import people3 from '../../assets/images/people3.png';
import Quote from "./Quote";

const Testimonials = () => {
    const quotes = [
        {_id: 1, name: 'Windson Herry', location: 'California', img: people1 , quote: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"},
        {_id: 2, name: 'Windson Herry', location: 'California', img: people2 , quote: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"},
        {_id: 3, name: 'Windson Herry', location: 'California', img: people3 , quote: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"}
    ]
  return (
    <section className="mb-24 px-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="">
          <h2 className="text-secondary dark:text-accent text-xl font-bold">Testimonials</h2>
          <h3 className="text-3xl dark:text-gray-200">What Our Patients Says</h3>
        </div>
        <div>
          <img src={quote} alt="" className="w-24 lg:w-48" />
        </div>
      </div>
      <div className="mx-auto container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{
          quotes.map(quote=> <Quote key={quote._id} quote={quote} />)
          }</div>
    </section>
  );
};

export default Testimonials;
