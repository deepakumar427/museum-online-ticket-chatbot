import React, { useState } from 'react';
import axios from 'axios';
import { Ticket, Minus, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || 'http://localhost:4000';
const ticketTypes = [
  { key: 'adult', label: 'Adult', note: 'Ages 18–64', price: 250 },
  { key: 'senior', label: 'Senior', note: 'Ages 65+', price: 150 },
  { key: 'child', label: 'Child', note: 'Ages 7–17', price: 100 },
];

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

export default function TicketBooking() {
  const { museumTitle } = useParams();
  const museum = decodeURIComponent(museumTitle || 'Museum visit');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tickets, setTickets] = useState({ adult: 1, senior: 0, child: 0 });
  const [isPaying, setIsPaying] = useState(false);
  const total = ticketTypes.reduce((sum, type) => sum + tickets[type.key] * type.price, 0);

  const updateCount = (type, change) => setTickets((current) => ({ ...current, [type]: Math.max(0, current[type] + change) }));
  const pay = async () => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/signin'); return; }
    setIsPaying(true);
    try {
      if (!await loadRazorpay()) throw new Error('Unable to load Razorpay checkout.');
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.post(`${API_BASE}/api/v1/payment/ticket/order`, { event: museum, tickets }, { headers });
      if (!data.success) throw new Error(data.message);
      new window.Razorpay({
        key: data.key, amount: data.amount, currency: data.order.currency, order_id: data.order.id,
        name: 'TIXPLORE', description: `${museum} tickets`, theme: { color: '#0f172a' },
        handler: async (payment) => {
          try {
            const verified = await axios.post(`${API_BASE}/api/v1/payment/verifyPayment`, { ...payment, ticketId: data.ticketId, bookedTickets: tickets }, { headers });
            if (!verified.data.success) throw new Error(verified.data.message);
            toast({ title: 'Tickets booked', description: 'Your payment was verified successfully.' });
          } catch (error) { toast({ title: 'Payment verification failed', description: error.response?.data?.message || error.message, variant: 'destructive' }); }
        },
        modal: { ondismiss: () => setIsPaying(false) },
      }).open();
    } catch (error) {
      toast({ title: 'Could not start payment', description: error.response?.data?.message || error.message, variant: 'destructive' });
    } finally { setIsPaying(false); }
  };

  return <main className="min-h-screen bg-slate-50 px-5 pb-20 pt-36 text-slate-900"><div className="mx-auto max-w-4xl"><p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-700"><Ticket size={18} /> Ticket booking</p><h1 className="max-w-3xl text-4xl font-bold sm:text-6xl">Plan your visit to {museum}</h1><div className="mt-10 grid gap-7 md:grid-cols-[1.5fr_0.8fr]"><section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-2xl font-bold">Choose tickets</h2><div className="mt-5 divide-y divide-slate-100">{ticketTypes.map((type) => <div key={type.key} className="flex items-center justify-between gap-4 py-5"><div><h3 className="font-semibold">{type.label}</h3><p className="text-sm text-slate-500">{type.note} · ₹{type.price}</p></div><div className="flex items-center gap-3 rounded-full border border-slate-200 p-1"><button onClick={() => updateCount(type.key, -1)} className="rounded-full p-2 hover:bg-slate-100" aria-label={`Remove ${type.label}`}><Minus size={16}/></button><span className="w-5 text-center font-semibold">{tickets[type.key]}</span><button onClick={() => updateCount(type.key, 1)} className="rounded-full bg-slate-900 p-2 text-white hover:bg-slate-700" aria-label={`Add ${type.label}`}><Plus size={16}/></button></div></div>)}</div></section><aside className="h-fit rounded-3xl bg-slate-900 p-6 text-white shadow-xl"><p className="text-sm uppercase tracking-widest text-cyan-300">Order summary</p><h2 className="mt-3 text-2xl font-bold">General admission</h2><div className="my-6 border-y border-white/15 py-5"><div className="flex justify-between text-slate-300"><span>Total</span><strong className="text-3xl text-white">₹{total}</strong></div></div><button onClick={pay} disabled={!total || isPaying} className="w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50">{isPaying ? 'Opening checkout…' : 'Proceed to payment'}</button><p className="mt-4 text-xs leading-5 text-slate-400">Secure payment is processed by Razorpay.</p></aside></div></div></main>;
}
