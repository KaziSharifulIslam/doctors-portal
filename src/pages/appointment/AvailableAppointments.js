import { format } from "date-fns";
import Loading from "pages/shared/Loading";
import React, { useState } from "react";
import { useQuery } from "react-query";
import BookingModal from "./BookingModal";

const AvailableAppointments = ({ date, setDate }) => {
  const [treatment, setTreatment] = useState(null);
  // const [services, setServices] = useState([]);
  const formatedDate = format(date, "PP");

  // react query instead of useEffect 
  const { data: services, isLoading, error, refetch } = useQuery(['available', formatedDate], () => fetch(`${process.env.REACT_APP_APP_SERVER_URI}/available/?date=${formatedDate}`)
    .then((res) => res.json()));

  if (isLoading) return <Loading />
  if (error) console.log(error);

  return (
    <div>
      <div className="container mx-auto mb-12 pt-24 ">
        <p className="text-center text-xl text-secondary dark:text-accent">
          Available Appointments on {format(date, "PP")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12">
          {services?.map((service, index) => (
            <SingleService
              key={index}
              service={service}
              setTreatment={setTreatment}
              date={date}
            />
          ))}
        </div>
        {treatment && (
          <BookingModal
            date={date}
            treatment={treatment}
            setTreatment={setTreatment}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

const SingleService = ({ service, setTreatment }) => {
  const { name, slots, price } = service;
  return (
    <div className="card w-80 max-w-md  shadow-lg text-center mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-secondary dark:text-accent">{name}</h2>
        <div className="text-sm">
          <p>{slots[0]}</p>
          <p>{slots[1]}</p>
          {!slots.length && <p className="text-red-500">Try another day!</p>}
          <p>
            {slots.length ? (
              <span>
                {slots.length} {slots.length > 1 ? "spaces" : "space"} Available{" "}
              </span>
            ) : (
              <span>No space available today</span>
            )}
          </p>
          <p className="badge my-1">Consultant Fee: ${price}</p>
        </div>

        <div className="card-actions justify-end">
          <label
            htmlFor="book-modal"
            disabled={!slots.length}
            onClick={() => setTreatment(service)}
            className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 dark:bg-gradient-to-r dark:from-accent dark:to-accent pt-1"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AvailableAppointments;
