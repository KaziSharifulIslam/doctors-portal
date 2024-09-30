import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckoutForm = ({ appointment }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { price, patientName, email, _id } = appointment;

    useEffect(() => {
        fetch('https://doctors-portal-ks.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret)
            })
    }, [price])

    const handleSubmit = async e => {
        setProcessing(true);
        setSuccess('')
        e.preventDefault();
        if (!stripe || !elements) {
            return;

        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card,
        });

        if (error) {
            setCardError(error.message)
            console.log(error.message);
        } else {
            console.log(paymentMethod);
            setCardError('');
        }

        // confirm card payemnt 
        const { paymentIntent, error: cardError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: email
                    },
                },
            },
        );
        if (cardError) {
            setCardError(cardError?.message);
            setProcessing(false)
            setSuccess('')
        } else {
            setTransactionId(paymentIntent.id);
            fetch(`https://doctors-portal-ks.herokuapp.com/appointment/${_id}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json', authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                body: JSON.stringify({ transactionId: paymentIntent.id })
            }).then(res => res.json()).then(data => {
                if (data.modifiedCount) {
                    setCardError('');
                    setProcessing(false);
                    setSuccess('Congrates! Your payement is successful!!');
                    toast.success('Your Payemnt is Completed.');
                }
            })
        }
    }
    return <>
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm mt-4 btn-accent' type="submit" disabled={!stripe || !clientSecret || processing}>
                {processing ? <><Spinner /> processing...</> : 'Pay Now'}
            </button>
            {cardError && <p className='text-red-400 my-2'>{cardError}</p>}
            {success && <p className='text-green-400 my-2'>{success} <br /> Transaction_id: {transactionId}</p>}
        </form>
    </>
}

const Spinner = () => {
    return <>
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </>
}


export default CheckoutForm;