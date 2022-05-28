import { format } from "date-fns";
import auth from "firebase.init";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
  const formatedDate = format(date, "PP");
  const [user] = useAuthState(auth);
  const { _id, name, slots } = treatment;
  const handleBooking = (e) => {
    e.preventDefault();
    const slot = e.target.slot.value;
    const booking = {
      treatment: name,
      treatmentId: _id,
      date: formatedDate,
      slot: slot,
      patientName: user.displayName,
      email: user.email,
      phone: e.target.phone.value,
    };
    fetch("https://doctors-portal-ks.herokuapp.com/booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(
            `${booking.treatment} is appointed on ${formatedDate} at ${slot}`
          );
          refetch();
          setTreatment(null);
        } else {
          toast.error(
            `${booking.treatment} is already appointed on ${formatedDate} at ${slot}`
          );
        }
      });
    // console.log(booking);
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
          <h3 className="font-bold text-lg text-secondary dark:text-accent">
            Booking for: {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 justify-items-center items-center gap-2 mt-4"
          >
            <input
              type="text"
              placeholder="date"
              className="input input-bordered input-primary dark:input-accent w-full max-w-xs "
              value={format(date, "PP")}
              name="date"
              disabled
            />

            <select
              name="slot"
              className="select select-secondary dark:select-accent w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              defaultValue={user?.displayName }
              disabled={user.displayName}
              className="input input-bordered w-full max-w-xs"
              name="name"
              required
            />

            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full max-w-xs"
              name="email"
              required
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="input input-bordered   w-full max-w-xs"
              name="phone"
              
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
