import React from 'react'
import { Link } from 'react-router-dom'

function MuseumInfoCard({title,text,museumTitle}) {
  return (
    <div className='flex flex-col'>
        <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
        <span className='leading-relaxed text-gray-600'>{text}</span>
        {museumTitle ? (
          <Link to={`/tickets/${encodeURIComponent(museumTitle)}`} className='mt-10'>
            <button className='rounded-full bg-black px-6 py-3 text-white transition hover:scale-105'>Get Tickets</button>
          </Link>
        ) : <p className='mt-10 text-sm text-slate-500'>Choose a museum to purchase tickets.</p>}
    </div>
  )
}

export default MuseumInfoCard
