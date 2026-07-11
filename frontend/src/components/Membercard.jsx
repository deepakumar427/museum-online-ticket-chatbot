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
        <div className='relative flex w-full max-w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-[#40b8d1] p-8 shadow-2xl md:flex-row md:p-10'>
            <div className='flex min-w-0 flex-col gap-3 text-white'>
                <h1 className='text-3xl sm:text-5xl lg:text-5xl'>{title}</h1>
                <span className='text-2xl sm:text-4xl lg:text-4xl'>{price}</span>
            </div>

            <div className='flex min-w-0'>
                <button
                    type='button'
                    onClick={startMembershipPayment}
                    disabled={isPaying}
                    className='w-full rounded-full bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                >
                    {isPaying ? 'Opening checkout…' : buttontext}
                </button>
            </div>
        </div>
    );
}

export default Membercard;
