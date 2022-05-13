import React, { useState } from "react";
import Footer from "../shared/Footer";
import AppointBanner from "./AppointBanner";
import AvailableAppointments from "./AvailableAppointments";

const Appointment = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <AppointBanner date={date} setDate={setDate} />
      <AvailableAppointments date={date}  />
      <Footer/>
    </div>
  );
};

export default Appointment;
