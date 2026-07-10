import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') ||
    'http://localhost:4000';

function loadRazorpay() {
    return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

function Membercard({ title, price, buttontext }) {
    const [isPaying, setIsPaying] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const startMembershipPayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast({ title: 'Please sign in', description: 'Sign in before purchasing a membership.', variant: 'destructive' });
            navigate('/signin');
            return;
        }

        setIsPaying(true);
        try {
            const sdkLoaded = await loadRazorpay();
            if (!sdkLoaded) throw new Error('Unable to load Razorpay checkout.');

            const headers = { Authorization: `Bearer ${token}` };
            const { data } = await axios.post(`${API_BASE}/api/v1/payment/membership/order`, {}, { headers });
            if (!data.success) throw new Error(data.message);

            const checkout = new window.Razorpay({
                key: data.key,
                amount: data.amount,
                currency: data.order.currency,
                name: 'TIXPLORE',
                description: 'Museum Membership',
                order_id: data.order.id,
                handler: async (payment) => {
                    try {
                        const verification = await axios.post(
                            `${API_BASE}/api/v1/payment/membership/verify`,
                            payment,
                            { headers }
                        );
                        if (!verification.data.success) throw new Error(verification.data.message);
                        toast({ title: 'Membership activated', description: 'Your payment was verified successfully.' });
                    } catch (error) {
                        toast({ title: 'Payment verification failed', description: error.response?.data?.message || error.message, variant: 'destructive' });
                    }
                },
                modal: { ondismiss: () => setIsPaying(false) },
                theme: { color: '#000000' },
            });
            checkout.open();
        } catch (error) {
            toast({ title: 'Could not start payment', description: error.response?.data?.message || error.message || 'Please try again.', variant: 'destructive' });
        } finally {
            setIsPaying(false);
        }
    };

    return (
        <div className='relative w-full rounded-2xl bg-[#40b8d1] p-6 shadow-xl transition sm:p-8 lg:w-[180%] lg:rounded-none lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center lg:hover:scale-105 lg:hover:-translate-x-6'>
            <div className='flex flex-col gap-3 text-white lg:w-[140%]'>
                <h1 className='text-3xl sm:text-5xl lg:text-5xl'>{title}</h1>
                <span className='text-2xl sm:text-4xl lg:text-4xl'>{price}</span>
            </div>

            <div className='mt-6 flex lg:mt-0 lg:justify-end lg:items-center'>
                <button
                    type='button'
                    onClick={startMembershipPayment}
                    disabled={isPaying}
                    className='w-full rounded-lg bg-black p-4 text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12 lg:absolute lg:right-0 lg:w-auto lg:rounded-none lg:px-16'
                >
                    {isPaying ? 'Opening checkout…' : buttontext}
                </button>
            </div>
        </div>
    );
}

export default Membercard;
