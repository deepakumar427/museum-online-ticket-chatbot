import { Ticket } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function ViewMuseumCard({ title, text,icon,iconColor ,optionalchildren,path,buttonText}) {
    const [IconColor,setIconColor]=useState(null);
    return (
        <div
        onMouseEnter={()=>setIconColor(iconColor)}
        onMouseLeave={()=>setIconColor(null)}
         className='relative flex h-full flex-col items-start gap-5 rounded-xl p-6 pb-8 pt-16 text-left shadow-custom transition-all hover:shadow-hoveredCustomShadow hover:scale-[1.03] lg:rounded-md lg:pt-20 lg:hover:scale-110'>
            <div className="absolute  rounded-full p-5 -top-10  " style={{backgroundColor:iconColor?IconColor:"transparent",color:IconColor?"white":"black"}}>
                {icon}
            </div>

            <h1 className='mb-4 text-2xl font-bold text-gray-900'>{title}</h1>

            <div className='text-sm leading-relaxed text-gray-600'>
                <div>
                    {text?text:''}
                    {optionalchildren?optionalchildren:''}
                </div>

            </div>
            {buttonText && path &&
                 <Link to={path} className='mt-5 w-full'>
                 <button className='w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg'> {buttonText}</button>
                </Link>
            }
           
        </div>
    )
}

export default ViewMuseumCard
