import Loading from 'pages/shared/Loading';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const OurDoctors = () => {
  const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctors', { method: 'get', headers: { 'content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
    .then(res => res.json()));
  if (isLoading) return <Loading />

  const deleteDoctor = id => {
    const url = `http://localhost:5000/doctor/${id}`;
    fetch(url, { method: 'DELETE', headers: { 'authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount) {
          refetch();
          toast.success('Doctor Deleted successfully.')
        }
      })

  }
  return (
    <section className="dark:text-gray-400 rounded-xl py-12 body-font mb-12">
      <div className="container px-5 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-12">Our Doctors</h1>
        <div className="flex flex-wrap -m-2">
          {doctors?.map(doctor =>
            <div className="p-2 md:w-1/2 w-full" key={doctor._id}>
              <div className="h-full flex items-center dark:border-gray-700 border p-4 rounded-lg">
                <img alt="team" className=" w-16 h-16 ring dark:bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={doctor.image} />
                <div className="flex-grow">
                  <h2 className="dark:text-gray-300 title-font font-medium">{doctor.name}</h2>
                  <p className="text-gray-500">{doctor.specialty}</p>
                  <p className="text-gray-500 text-xs hidden md:block">{doctor.email}</p>
                </div>
                <div className="flex-grow">
                  <h2 className="dark:text-gray-300 title-font font-medium">Action</h2>
                  <div className="flex gap-1 flex-wrap justify-center">
                    <button className="btn btn-xs btn-info" >Details</button>
                    <label htmlFor="doctor-delete-modal" className="btn btn-xs btn-warning">Delete</label>
                  </div>
                  {/* modal content */}
                  {/* modal content */}
                  <div className='modal-container'>
                    <input type="checkbox" id="doctor-delete-modal" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure to delete the doctor?</h3>
                        <p className="py-4">This action can't be undone!</p>
                        <div className="modal-action">
                          <label className="btn btn-sm btn-info mr-2" htmlFor="doctor-delete-modal" >Cancel</label>
                          <label htmlFor="doctor-delete-modal" className="btn btn-sm btn-warning " onClick={() => deleteDoctor(doctor._id)}>Delete</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>

    </section>
  );
};


export default OurDoctors;