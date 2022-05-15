import React from "react";
import appointment from "../../assets/images/appointment.png";
import doctor from "../../assets/images/doctor.png";
import Primarybutton from "../shared/Primarybutton";

const AppoinmentSection = () => {
  return (
    <section
      style={{ background: `url(${appointment})` }}
      className="my-20 px-4"
    >
      <div className="flex items-center justify-center container mx-auto">
        <div className="flex-1 lg:flex-3 hidden lg:block mt-[-100px] lg:mt-[-150px] ">
          <img src={doctor} alt="" />
        </div>
        <div className="flex-1 text-white py-20 xl:py-0">
          <h2 className="text-3xl mb-4 text-primary">Appointment</h2>
          <h3 className="text-4xl py-4">Make an apppoinment Today.</h3>
          <p className="mb-4">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <Primarybutton go="/appointment">Get Started</Primarybutton>
        </div>
      </div>
    </section>
  );
};

export default AppoinmentSection;
