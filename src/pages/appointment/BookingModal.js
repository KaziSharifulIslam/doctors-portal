import { format } from "date-fns";
import React from "react";

const BookingModal = ({ date, treatment }) => {
  const { name, slots } = treatment;
  return (
    <div>
      <input type="checkbox" id="book-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="book-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>
          <form className="grid grid-cols-1 justify-items-center items-center gap-2 mt-4">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs "
              value={format(date, "PP")}
              disabled
            />

            <select class="select select-secondary w-full max-w-xs">
              <option disabled selected>
               Select Time
              </option>
              {slots.map(slot=><option>{slot}</option>)}
            </select>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <input
              type="submit"
              value="Book Now"
              className="btn btn-secondary text-white w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
