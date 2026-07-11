import React, { useState } from 'react';
import museum1 from '../assets/museum1.jpg';
import { Link } from 'react-router-dom';

function MuseumCard({ image, title }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='flex w-full flex-col gap-5 sm:flex-row sm:gap-8 lg:justify-end lg:gap-10'>
            <div
                className='h-56 w-full sm:h-[240px] sm:w-1/2 lg:w-[400px]'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} >
                
                <img
                    src={image}
                    className='h-full w-full rounded-xl object-cover shadow-md transition-all hover:scale-110'
                    alt=""
                />

            </div>
            <div className='flex flex-1 flex-col items-start justify-between gap-5 sm:gap-8 lg:flex-none lg:items-center lg:gap-12'>
                <h1  onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`museum-title mb-4 break-words text-3xl font-bold text-gray-900 lg:w-[400px] ${isHovered ? 'no-underline' : ''}`}
                >
                {title}
                </h1>
                <div className='w-full sm:w-1/2 lg:w-[50%]'>
                <Link to={`/view/${encodeURIComponent(title)}`}>
                <button className='w-full rounded-lg bg-black px-8 py-3 text-white transition-transform hover:-translate-y-1 md:w-auto'>View</button>
                </Link>
                </div>
                
            </div>
           
            
        </div>
    );
}

export default MuseumCard;
