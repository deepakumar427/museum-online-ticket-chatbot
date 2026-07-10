import { Ticket } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function ViewMuseumCard({ title, text,icon,iconColor ,optionalchildren,path,buttonText}) {
    const [IconColor,setIconColor]=useState(null);
    return (
        <div
        onMouseEnter={()=>setIconColor(iconColor)}
        onMouseLeave={()=>setIconColor(null)}
         className='relative flex min-h-80 flex-col items-center gap-5 rounded-xl p-6 pt-16 text-center shadow-custom transition-all hover:shadow-hoveredCustomShadow hover:scale-[1.03] lg:min-h-0 lg:rounded-md lg:pt-20 lg:hover:scale-110'>
            <div className="absolute  rounded-full p-5 -top-10  " style={{backgroundColor:iconColor?IconColor:"transparent",color:IconColor?"white":"black"}}>
                {icon}
            </div>

            <h1 className='text-2xl sm:text-3xl lg:text-3xl'>{title}</h1>

            <div>
                <p>
                    {text?text:''}
                    {optionalchildren?optionalchildren:''}
                </p>

            </div>
            {buttonText && path &&
                 <Link to={path}>
                 <button className='mt-5 bg-black text-white p-3 rounded-sm '> {buttonText}</button>
                </Link>
            }
           
        </div>
    )
}

export default ViewMuseumCard
