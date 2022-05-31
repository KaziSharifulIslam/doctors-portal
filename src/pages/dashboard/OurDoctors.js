import Loading from 'pages/shared/Loading';
import React from 'react';
import { useQuery } from 'react-query';

const OurDoctors = () => {
    const {data:doctors, isLoading, refetch} = useQuery('doctors', ()=> fetch('http://localhost:5000/doctors').then(res=> res.json()));
if(isLoading) return <Loading/>
    return (
        <section className="dark:text-gray-400 dark:bg-gray-900 rounded-xl  body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white">Our Doctors</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div className="flex flex-wrap -m-2">
           {doctors?.map(doctor=> 
             <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={doctor._id}>
             <div className="h-full flex items-center dark:border-gray-800 border p-4 rounded-lg">
               <img alt="team" className="w-16 h-16 ring dark:bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={doctor.image} />
               <div className="flex-grow">
                 <h2 className="dark:text-gray-300 title-font font-medium">{doctor.name}</h2>
                 <p className="text-gray-500">{doctor.specialty}</p>
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