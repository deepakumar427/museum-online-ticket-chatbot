import React, { Suspense, useEffect, useState } from 'react'
import ImageSlider from './ImageSlider'
import EventComponent from './EventComponent'

function Container() {
  const [color1, setColor1] = useState('#fc578a'); // Initial color for first div
  const [color2, setColor2] = useState('#8f8afa'); // Initial color for second div
  const [color3, setColor3] = useState('hsl(19, 84%, 56%)'); // Initial color for third div

  useEffect(()=>{
    const handleScroll=()=>{
      const scrollPosition=window.scrollY;
      if (scrollPosition < 1300) {
        setColor1('#0a81db');
        setColor2('#EBD7B2');
        setColor3("#d85e31")
      } else if (scrollPosition >= 1300 && scrollPosition < 1800) {
        setColor1('#fc578a'); // Initial color
        setColor2('#d57e48');
        setColor3('#2fbf49')

        
      } else if (scrollPosition >= 1800) {
        setColor1('#ff6347'); // Another color
        setColor2('#4169E1');
        setColor3('#603bb5')
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[])

  return (
    <div >
      <div className='relative grid grid-cols-1 bg-[#4169E1] lg:h-[2600px] lg:grid-cols-3 lg:bg-transparent'>
        <div className='hidden h-full bg-[#fc578a] lg:block' style={{backgroundColor:color1, transition:'background-color 0.5s ease-in'}}></div>
        <div className='hidden h-full bg-[#8f8afa] lg:block' style={{backgroundColor:color2, transition:'background-color 0.5s ease-in'}}></div>
        <div className='hidden h-full bg-[#ed6c31] lg:block'  style={{backgroundColor:color3, transition:'background-color 0.5s ease-in'}}></div>

        <div className='col-span-1 flex flex-col items-center justify-around py-12 text-white lg:absolute lg:inset-0 lg:py-4' >
          <div className='flex flex-col items-center justify-center'>
            <h1 className='container-title'>Events</h1>
            <EventComponent/>
          </div>
          
          
          <div className='flex flex-col  justify-center items-center'>
            <div className='relative flex flex-col items-center justify-center sm:block'>
              <h1 className='container-title  top-0 '>Become a</h1>
              <h1 className='container-title sm:absolute sm:top-28'>Member</h1>
            </div>
            <div className='mt-10 sm:mt-52'>
            <ImageSlider/>
            </div>
          </div>

          <div className=''>
            
          </div>

        </div>
      </div>


      
      
    </div>
  )
}
export default Container
