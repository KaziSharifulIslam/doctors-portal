import { format } from "date-fns";
import React from "react";

const BookingModal = ({ date, treatment, setTreatment}) => {
  const { name, slots } = treatment;
  const handleBooking = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const serviceName = name;
    const patientName = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const slot = e.target.slot.value;
    const booking = {date, patientName, serviceName, phone, email, slot };
    console.log(booking);
    setTreatment(null)
  };
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
          <h3 className="font-bold text-lg text-secondary">
            Booking for: {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 justify-items-center items-center gap-2 mt-4"
          >
            <input
              type="text"
              placeholder="date"
              className="input input-bordered input-primary w-full max-w-xs "
              value={format(date, "PP")}
              name="date"
              disabled
            />

            <select
              name="slot"
              className="select select-secondary w-full max-w-xs"
            >
              {slots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered input-primary w-full max-w-xs"
              name="name"
              required
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="input input-bordered input-primary w-full max-w-xs"
              name="phone"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
              name="email"
              required
            />
            <input
              type="submit"
              value="Book Now"
              className="btn btn-accent text-white w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
