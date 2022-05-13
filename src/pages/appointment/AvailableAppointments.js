import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const AvailableAppointments = ({ date }) => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("appointments.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="container mx-auto ">
      <p className="text-center text-xl text-secondary">
        Available Appointments on {format(date, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
        {services.map((service) => (
          <SingleService key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

const SingleService = ({ service }) => {
  const { name, slots } = service;
  return (
    <div className="card w-80 max-w-md  shadow-lg text-center mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary">{name}</h2>
        <div className="text-sm">
          <p>{slots[0]}</p>
          {!slots.length && <p className="text-warning">Try another day!</p>}
          <p>
            {slots.length} {slots.length ? "spaces" : "space"} Available
          </p>
        </div>

        <div className="card-actions justify-end">
          <button
            disabled={!slots.length}
            className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 pt-1"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableAppointments;
