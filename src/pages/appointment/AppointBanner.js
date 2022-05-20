import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "../../assets/images/chair.png";
import "./calender.css";

const AppointBanner = ({ date, setDate }) => {
  return (
    <div className="flex justify-center flex-col container mx-auto py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-around flex-col lg:flex-row-reverse">
          <div>
            {" "}
            <img
              src={chair}
              className="max-w-xs md:max-w-md  lg:max-w-lg rounded-lg shadow-2xl m-0 md:m-8"
              alt=""
            />
          </div>
          <div className="shadow-lg p-4 rounded-lg mt-4">
            <DayPicker mode="single" selected={date} onSelect={setDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointBanner;
