import auth from "firebase.init";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '../shared/Loading'

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  // console.log(user);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetch(`https://doctors-portal-ks.herokuapp.com/appointments/?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAppointments(data);
      });
  }, [user]);
  return (
    <div className="overflow-x-auto  border rounded-lg my-12 mx-2">
      <table className="table w-full">
        <thead className="sticky top-0">
          <tr>
            <th>SL</th>
            <th>Patient Name</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length < 1 ? <Loading />  :  appointments?.map((a, index) => (
            <tr key={index}>
              <td className="text-xs">{index + 1}</td>
              <td className="text-xs">{a.patientName}</td>
              <td className="text-xs">{a.treatment}</td>
              <td className="text-xs">{a.date}</td>
              <td className="text-xs">{a.slot}</td>
              <td className="text-xs">{a.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
