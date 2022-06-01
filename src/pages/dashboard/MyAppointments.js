import auth from "firebase.init";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";

const MyAppointments = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { data: appointments, isLoading, error, refetch } = useQuery('appointments', () => fetch(`http://localhost:5000/appointments/?email=${user?.email}`, {
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
  if (isLoading) return <Loading />
  const deleteAppointment = () => {
    fetch(`http://localhost:5000/appointment/delete/${user?.email}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          toast.success('Appointment deleted!')
          refetch();
        }
      })
  }

  if (error) {
    console.log(error)
    return;
  }

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
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="100%">
                <Loading />
              </td>
            </tr>
          ) : (
            appointments?.map((a, index) => (
              <tr key={index}>
                <td className="text-xs">{index + 1}</td>
                <td className="text-xs">{a.patientName}</td>
                <td className="text-xs">{a.treatment}</td>
                <td className="text-xs">{a.date}</td>
                <td className="text-xs">{a.slot}</td>
                <td className="text-xs">{a.email}</td>
                <td className="text-xs">
                  <button className="btn btn-xs btn-success mr-2">Pay</button>
                  <label htmlFor="appointment-delete-modal" className="btn btn-xs btn-warning">Delete</label>
                </td>
                <td>
                  {/* modal content */}
                  <div>
                    <input type="checkbox" id="appointment-delete-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure to delete the appointment?</h3>
                        <p className="py-4">This action can't be undone!</p>
                        <div className="modal-action">
                          <label className="btn btn-sm btn-info mr-2 " htmlFor="appointment-delete-modal" >Cancel</label>
                          <label className="btn btn-sm btn-warning" htmlFor="appointment-delete-modal" onClick={deleteAppointment}>Delete</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
          {appointments?.length < 1 && <tr>
            <td colSpan="100%">
              <p className="p-4 m-4 text-center ">No records Found!</p>
            </td>
          </tr>}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
