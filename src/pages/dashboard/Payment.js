import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Loading from 'pages/shared/Loading';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L5ycwFcD9YuPHOIDavT4T1vxCZ4VT0NJsbVMLBsOdwfNrQfvAkScyIxzoAmcapWsGrRe0hG3RUPMBvk0HBxYxsa00uejp7M5h');
const Payment = () => {
    const { paymentId } = useParams();

    const url = `${process.env.REACT_APP_APP_SERVER_URI}/booking/${paymentId}`;
    const { data: appointment, isLoading } = useQuery('data', () => fetch(url, {
        method: 'get', headers: { 'content-type': 'application/json', 'authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    }).then(res => res.json()));
    if (isLoading) return <Loading />
    const { treatment, slot, price, date, patientName } = appointment;
    /**
     * without account
     * publishable test key : pk_test_qblFNYngBkEdjEZ16jxxoWSM
     * test key: sk_test_26PHem9AhJZvU623DfE1x4sd
     * 
     * 
    */

    return (
        <div>
            <section className="text-gray-400 bg-gray-900 body-font overflow-hidden rounded-xl">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full max-w-lg lg:pr-10 lg:py-6 mb-12 lg:mb-0 mx-auto">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Pay for - {treatment}</h2>
                            <h1 className="text-white text-3xl title-font font-medium mb-4">{treatment}</h1>
                            <p className="leading-relaxed mb-4"></p>
                            <div className="flex border-t border-gray-800 py-2">
                                <span className="text-gray-500">Patient Name</span>
                                <span className="ml-auto text-white">{patientName}</span>
                            </div>
                            <div className="flex border-t border-gray-800 py-2">
                                <span className="text-gray-500">Date</span>
                                <span className="ml-auto text-white">{date}</span>
                            </div>
                            <div className="flex border-t border-gray-800 py-2">
                                <span className="text-gray-500">Time</span>
                                <span className="ml-auto text-white">{slot}</span>
                            </div>

                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-white">${price}</span>
                                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Pay Now</button>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full max-w-lg lg:pr-10 lg:py-6 mb-6 lg:mb-0 mx-auto">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Pay for - {treatment}</h2>
                            <h1 className="text-white text-3xl title-font font-medium mb-6">{treatment}</h1>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm appointment={appointment} />
                            </Elements>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Payment;