import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

const AvailableAppointments = ({ date }) => {
  const [treatment, setTreatment] = useState(null);
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("https://salty-citadel-52323.herokuapp.com/service")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <div className="container mx-auto mb-12 pt-24 ">
        <p className="text-center text-xl text-secondary">
          Available Appointments on {format(date, "PP")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
          {services.map((service) => (
            <SingleService
              key={service._id}
              service={service}
              setTreatment={setTreatment}
              date={date}
            />
          ))}
        </div>
        {treatment && <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} />}
      </div>
    </div>
  );
};

const SingleService = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div className="card w-80 max-w-md  shadow-lg text-center mx-auto bg-white">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <div className="text-sm">
          <p>{slots[0]}</p>
          <p>{slots[1]}</p>
          {!slots.length && <p className="text-red-500">Try another day!</p>}
          <p>
            {slots.length ? (
              <span>
                {" "}
                {slots.length} {slots.length > 1 ? "spaces" : "space"} Available{" "}
              </span>
            ) : (
              <span>No space available today</span>
            )}
          </p>
        </div>

        <div className="card-actions justify-end">
          <label
            htmlFor="book-modal"
            disabled={!slots.length}
            onClick={() => setTreatment(service)}
            className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 pt-1"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvailableAppointments;