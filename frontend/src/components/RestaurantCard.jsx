import React, { useState } from 'react';
import { MapPinCheck } from 'lucide-react';

function RestaurantCard({ image, name, desc, time1, time2, location }) {
  const [changecolor, setChangeColor] = useState(null);

  return (
    <div
      onMouseEnter={() => setChangeColor('#FF6347')}
      onMouseLeave={() => setChangeColor(null)}
      className='flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:justify-around lg:gap-8 lg:px-28 transform transition-transform duration-300 animate-ease-in'
      style={{ backgroundColor: changecolor ? changecolor : '' }}
    >
      <div
        className='h-56 w-full lg:h-[255px] lg:w-[650px] transform transition-transform duration-300 ease-in-out'
        style={{ transform: changecolor ? 'translateX(10px)' : 'translateX(0)' }}
      >
        <img
          src={image}
          alt='restaurantimage'
          className='w-full h-full object-cover cursor-pointer'
        />
      </div>

      <div
        className='flex flex-col gap-5 pt-4 w-full transform transition-transform duration-300 ease-in-out'
        style={{ transform: changecolor ? 'translateX(10px)' : 'translateX(0)' }}
      >
        <h3 className='mb-3 text-3xl font-bold text-gray-900'>{name}</h3>
        <p className='mb-6 max-w-2xl leading-relaxed text-gray-600'>{desc}</p>
        <div className='mb-6 flex flex-col gap-2'>
          <div>
            <span className='font-semibold text-gray-900'>Monday-Saturday:</span>{' '}
            <span className='text-gray-600'>{time1}</span>
          </div>
          <div>
            <span className='font-semibold text-gray-900'>Sunday:</span>{' '}
            <span className='text-gray-600'>{time2}</span>
          </div>
        </div>
        <span className='flex items-center gap-2 text-sm font-medium text-gray-500'>
          <MapPinCheck className='inline animate-pulse' />
          {location}
        </span>

        <span className='flex items-center gap-2 text-sm font-medium text-gray-500'>
          Tixplore DiscountPoints: Accepted
          <span className='rounded-md bg-blue-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-blue-700'>Member only</span>
        </span>
      </div>
    </div>
  );
}

export default RestaurantCard;
