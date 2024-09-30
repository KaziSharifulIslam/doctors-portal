import auth from "firebase.init";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import './myappointment.css';

const MyAppointments = () => {
  const [showModal, setShowModal] = useState(null)
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { data: appointments, isLoading, error, refetch } = useQuery('appointments', () => fetch(`https://doctors-portal-ks.herokuapp.com/appointments/?email=${user?.email}`, {
    method: 'GET',
    headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  })
    .then(res => {
      // console.log('res', res);
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem('accessToken');
        navigate('/login')
      }
      return res.json();
    }))
  const deleteAppointment = () => {
    fetch(`https://doctors-portal-ks.herokuapp.com/appointment/delete/${user?.email}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success('Appointment deleted!');
          setShowModal(null)
          refetch();
        }
      })
  }

  if (error) {
    console.log(error)
    return;
  }
  if (isLoading) {
    return <Loading />
  }

  // console.log(appointments)
  return (
    <div className="overflow-x-auto  shadow-xl rounded-lg my-12 mx-2 md:mx-auto max-w-4xl">
      <table className="table w-full  ">
        <thead className="sticky top-0">
          <tr>
            <th>SL</th>
            <th>Patient Name</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Email</th>
            <th>Status</th>
            <th>Transaction ID</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <>
              <tr>
                <td colSpan="100%">
                  <Loading />
                </td>

              </tr>
              {appointments?.length < 1 && <tr>
                <td colSpan="100%">
                  <p className="p-4 m-4 text-center ">No records Found!</p>
                </td>
              </tr>}
            </>
          ) : (
            appointments?.map((a, index) => (
              <tr key={index}>
                <td className="text-xs">{index + 1}</td>
                <td className="text-xs">{a.patientName}</td>
                <td className="text-xs">{a.treatment}</td>
                <td className="text-xs">{a.date}</td>
                <td className="text-xs">{a.slot}</td>
                <td className="text-xs">${a.price}</td>
                <td className="text-xs">{a.email}</td>
                <td className="text-xs">{a.paid ? <span className="text-white bg-success w-full block text-center px-2 py-1 rounded font-bold uppercase">PAID</span> : <span className="text-white bg-warning px-2 py-1 rounded font-bold uppercase">UNPAID</span> } </td>
                <td className="text-xs">{a.transactionId ? <span className="text-info ml-2">{a.transactionId} </span> : <Link to={`/dashboard/payment/${a._id}`} className="btn w-full btn-xs btn-info text-white mr-2">Pay</Link>}</td>
                <td className="text-xs">
                  <label onClick={() => setShowModal(a)} htmlFor="delete-modal" className="btn btn-xs btn-warning">Delete</label>
                  
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
      {
        showModal && <DeleteModal showModal={showModal} deleteAppointment={deleteAppointment} />
      }
    </div>
  );
};

const DeleteModal = ({ deleteAppointment, showModal }) => {
  return <>
    <input type="checkbox" id="delete-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Are you sure to delete the appointment</h3>
        <h4 className="text-lg mt-4">Appointment: {showModal.treatment}</h4>
        <div className="modal-action">
          <label htmlFor="delete-modal" className="btn">Cancel!</label>
          <button onClick={deleteAppointment} className="btn btn-warning">Delete</button>
        </div>
      </div>
    </div>
  </>
}


export default MyAppointments;
