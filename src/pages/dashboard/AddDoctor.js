import Loading from 'pages/shared/Loading';
import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))
    if (isLoading) return <Loading />

    // 3 ways to store image 
    /**
     * 1. third party store
     * 2. own storage
     * 3. mongodb
     * 
     * validation.
     * 1. yup file validation for image 
     *
     * 2. imagebb
     * 
    */

    const onSubmit = data => {
        const imagebbApiKey = '3101e939fc0da0dff8ff9abf4fe236fd'
        const formData = new FormData();
        formData.append('image', data.image[0])
        const url = `https://api.imgbb.com/1/upload?key=${imagebbApiKey}`
        fetch(url, { method: 'post', body: formData }).then(res => res.json())
            .then(result => {
                console.log(result);
                if(result.data.display_url){
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: result.data.display_url
                    }
                    console.log(doctor);
                    fetch('http://localhost:5000/doctor', {method: 'post', headers: {'content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('accessToken')}`}, body: JSON.stringify(doctor)})
                    .then(res =>{
                        console.log(res);
                       return res.json();
                    })
                    .then(added=> {
                        if(added.message) toast.info('Doctor Already Exist!!')
                        if(added.insertedId) toast.success('Doctor Added Successfully!!')
                    })
                }
            })
   }
  
  
   return (
        <div>
            <h2 className='text-2xl'>Add a new doctor.</h2>
            <div className="my-12">


                <form
                    className="grid grid-cols-1 items-center gap-2 w-full max-w-md mx-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Doctor Name</span>
                            <span className="label-text"> {errors.name?.type === 'required' && "Name is required"}</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder='Doctor Name'
                            {...register("name", { required: true, maxLength: 20 })}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Doctor Email</span>
                            <span className="label-text"> {errors.email?.type === 'required' && "Email is required"}</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder='Doctor Email'
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Doctor's Specialty</span>
                        </label>
                        <select
                            name="specialty"
                            className="select select-secondary dark:select-accent w-full"
                            {...register("specialty")}
                        >
                            {services.map(service => (
                                <option key={service._id} value={service.name}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                            <span className="label-text"> {errors.phone?.type === 'required' && "Phone Number is required"}</span>
                        </label>
                        <input type="number"
                            placeholder="Phone Number"
                            className="input input-bordered   w-full"

                            {...register("phone", { required: true, maxLength: 14, minLength: 11 })}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                            <span className="label-text"> {errors.image?.type === 'required' && "Image is required"}</span>
                        </label>
                        <input type="file"
                            className="w-full block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            {...register("image", { required: true })}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Add Doctor"
                        className="btn btn-accent text-white w-full"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;