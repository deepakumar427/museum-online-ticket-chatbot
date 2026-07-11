import React from 'react'
import FooterButton from './FooterButton'
import HocConditionalRendering from './HocConditionalRendering'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='grid grid-cols-1 gap-8 bg-[#4169E1] px-6 py-16 text-center text-white md:grid-cols-2 lg:grid-cols-4 '>
      
      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='mb-4 text-2xl font-bold text-white'>Get Tickets</h1>
        <p className='mb-6 text-sm leading-relaxed text-blue-50/90'>Visitors can purchase exhibition tickets onsite or online. Events, and cinema screenings may require separate tickets. Children ages 6 and below do not need a ticket.</p>
        <Link to={'/plan-your-visit'}>
          <FooterButton text={"Get Tickets"} />
        </Link>
      </div>
      
      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='mb-4 text-2xl font-bold text-white'>Plan Your Visit</h1>
        <p className='mb-6 text-sm leading-relaxed text-blue-50/90'>Discover the wonders of our museum through our website. Let us guide you in planning a memorable visit.</p>
        <Link to={'/plan-your-visit'}>
        <FooterButton  text={"Learn More"} />
        </Link>

      </div>

      <div className='px-5 flex flex-col items-center justify-between'>
        <h1 className='mb-4 text-2xl font-bold text-white'>Become a Member</h1>
        <p className='mb-6 text-sm leading-relaxed text-blue-50/90'>We offers an exclusive experience of contemporary visual culture for people of all ages and backgrounds. You will get access to Private Viewings, priority lanes, priority bookings, and much more.</p>
        <Link to={"/membership"}>
        <FooterButton text={"Not a Member Yet"} />
        </Link>

      </div>

      <div className='px-5 flex flex-col justify-between items-center'>
        <h1 className='mb-4 text-2xl font-bold text-white'>Frequently Asked Questions</h1>
        <p className='mb-6 text-sm leading-relaxed text-blue-50/90'>For information about visiting, ticketing, school visits, accessibility, membership, and more, contact us directly.</p>
        <Link to={"/FAQ"}>
        <FooterButton  text={"FAQ"} />

        </Link>
      
      </div>

    </div>
  )
}

export default HocConditionalRendering(Footer)
