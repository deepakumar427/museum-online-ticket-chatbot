import ImageSlider from '@/components/ImageSlider'
import Membercard from '@/components/Membercard'
import React from 'react'

function MemberShipPage() {
  return (
    <div className='mt-[100px]'>
      
      <div className='bg-black pt-20'>
        <h1 className='intro-title inline bg-white px-5 py-3 text-4xl text-black sm:text-6xl lg:px-10 lg:text-8xl animate-fade-right'>Become a Member </h1>
      </div>

      <section className=''>
        <div className=''>
          <div className='flex w-full flex-col bg-black px-5 pt-10 lg:flex-row lg:px-0 lg:pr-2'>
            
            <div className='w-full py-16 text-white lg:w-[550px] lg:flex-shrink-0 lg:px-10 lg:py-48'>
              <h1 className='text-4xl mb-8 animate-jump'>Unlock Exclusive Perks with Our Membership Program</h1>
              <div className='flex flex-col gap-5 text-base leading-relaxed transition sm:text-xl lg:text-xl animate-fade-up'>
                <p>Discover exclusive benefits with our membership program, designed to enhance your experience with local dining and shopping. As a member, you gain access to special offers and discounts at a curated selection of nearby restaurants and shops. </p>
                <p>Enjoy priority reservations, exclusive deals, and personalized recommendations tailored just for you. Whether you're exploring new culinary delights or discovering unique retail experiences, our membership ensures you get the most out of your local adventures.</p>
                <p>Join now to start enjoying these exclusive perks and more!</p>
              </div>
            </div>

            <div className='mt-6 flex w-full items-center justify-center p-4 lg:mt-[100px]'>
              <div className='w-full lg:w-auto animate-jump-in'>
                <Membercard title={"Member"} price={"Rs 500"} buttontext={"Join Today"} />
              </div>
            </div>



          </div>
        </div>
      </section>
      <div className='pb-28 bg-black pt-28 text-white flex flex-col gap-28'>
        <h1 className='text-center text-4xl sm:text-6xl lg:text-7xl'>Explore More</h1>
      <ImageSlider />

      </div>

    </div>
  )
}

export default MemberShipPage
