import React, { useEffect, useState } from 'react';
import planvisit from '../assets/planvisit.jpg';
import { MapPin } from 'lucide-react';
import MuseumCard from '../components/MuseumCard';
import MuseumInfoCard from '../components/MuseumInfoCard';
import { museums } from '@/assets/museumData';

function PlanYourVisit() {
  
    const [selectedMuseum, setSelectedMuseum] = useState(null);

    return (
        <div className='mt-[100px] flex flex-col'>
            <div className='relative h-64 sm:h-[400px] lg:h-[400px]'>
                <img src={planvisit} className="h-full w-full object-cover" alt="" />
                <div className='absolute opacity-40 inset-0 bg-black'></div>
            </div>

            <div className='absolute left-4 top-[155px] bg-blue-400 px-4 py-3 text-3xl text-white sm:left-10 sm:top-[170px] sm:text-5xl lg:left-0 lg:top-[170px] lg:px-5 lg:py-3 lg:pl-48 lg:text-7xl'>
                <span className='flex text-center items-center'>
                    <MapPin className='mr-3 size-8 sm:mr-5 sm:size-12 lg:size-16' />
                    <h1>Plan Your Visit</h1>
                </span>
            </div>

            <div className='py-10 flex flex-col items-center'>
                <h1 className='px-5 text-center text-4xl sm:text-6xl lg:text-8xl'>Check Out Museums</h1>

                <div className='flex w-full flex-col gap-8 p-5 lg:flex-row lg:justify-between lg:p-10'>
                    {/* Left side: MuseumInfoCard updates with selected museum */}
                    <div className='flex min-h-64 flex-col justify-center p-5 lg:h-[400px] lg:min-w-[450px]'>
                        <MuseumInfoCard
                            title={selectedMuseum ? selectedMuseum.infoTitle : "Did You Get Your Tickets"}
                            text={selectedMuseum ? selectedMuseum.infoText : "Welcome to TIXPLORE! Explore free spaces of the museum, or purchase tickets  and membership for more access..."}
                            museumTitle={selectedMuseum?.title}
                        />
                    </div>

                    {/* Right side: List of MuseumCards */}
                    <div className='flex flex-col gap-8 py-5 lg:gap-12 lg:p-10'>
                        {museums.map((museum, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedMuseum(museum)} // Click event to set the selected museum
                                className="relative cursor-pointer flex items-start"
                            >
                                <MuseumCard image={museum.image} title={museum.title} />  

                            </div>
                            
                        ))}
                        <hr className='bg-black outline' />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanYourVisit;
