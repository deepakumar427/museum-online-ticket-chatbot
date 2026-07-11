import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { museums } from '../assets/museumData';
import { Clock, Ticket, Lightbulb, MapPinHouse } from 'lucide-react';
import ViewMuseumCard from '@/components/ViewMuseumCard';
import RestaurantCard from '@/components/RestaurantCard';
import restaurant1 from '../assets/restaurant1.jpg'
import restaurant2 from '../assets/restaurant2.jpg'

function ViewMuseumDetails() {
    const params = useParams();
    const urlTitle = params.museumTitle
        ;
    const museum = museums.find(museum => museum.title === urlTitle);

    return (
        <div className='mt-[100px] bg-[#FAF9F6] flex flex-col'>
            <section>
                <div className='relative h-64 w-full sm:h-[400px] lg:h-[400px]'>
                    <img
                        src={museum ? museum.image : 'defaultimage'}
                        className="h-full w-full object-cover"
                        alt={museum ? museum.title : "Museum Image"}
                    />
                    <div className='absolute opacity-65 inset-0 bg-black'></div>
                </div>

                <div className='absolute inset-x-0 top-[165px] px-5 text-center text-4xl text-white sm:top-[190px] sm:text-6xl lg:left-[220px] lg:right-auto lg:top-[190px] lg:px-5 lg:py-3 lg:text-left lg:text-8xl'>
                    <h1 className='break-words'>{museum ? museum.title : "Museum Not Found"}</h1>
                </div>

            </section>
            <section className='mt-16'>
                <div className='my-5 flex w-full flex-col items-center px-5 sm:px-10 lg:min-h-[800px] lg:px-16'>
                    <h1 className='text-center text-4xl sm:text-6xl lg:text-8xl'>Visiting Information</h1>
                    <div className='grid w-full grid-cols-1 items-stretch gap-16 pt-20 text-center lg:w-[80%] lg:grid-cols-3 lg:gap-8 lg:pt-28'>
                        <ViewMuseumCard title={"Purchase Ticket"}
                            icon={<Ticket className='size-16 ' />}
                            iconColor={"#318CE7"}
                            buttonText={"click to Get Ticket"}
                            path={`/tickets/${encodeURIComponent(museum.title)}`}
                            text={`Welcome to ${museum.title}! Experience museum exclusive offers and purchase tickets for full access to exclusive exhibits.Become a member today for unlimited General Admission ticket discounts, and a variety of exclusive benefits.Visit our 'Membership' section for more details.`} />

                        <ViewMuseumCard title={"Opening Hours"}
                            iconColor={"#FF6347"}
                            icon={<Clock className='size-16' />} optionalchildren={
                                <div className='details flex flex-col gap-5'>
                                    <p>Tuesdays to Thursdays and weekends: 10:00–18:00</p>
                                    <p>Fridays: 10:00–22:00</p>
                                    <p>Mondays: Closed</p>
                                    <p>The last admission time is thirty minutes before closing.</p>
                                    <p>The museum is open on all public holidays unless otherwise announced.</p>
                                </div>
                            } />

                        <ViewMuseumCard iconColor={"#FFC72C"} icon={<Lightbulb className='size-16' />} title={"Tips for Visiting"} text={"Bags and backpacks smaller than 30 cm x 42 cm x 10 cm are allowed in the galleries, but backpacks must be worn on the front of the body with the strap(s) slung over one or both shoulders. Larger items must be checked in to lockers or the cloakroom, available for rental.We welcome wheelchairs and baby strollers in the galleries. These are also available to borrow free of charge on a first-come, first-served basis."} />

                    </div>


                </div>
            </section>

            <section className='map-section mt-10'>
                <div className='flex min-h-[400px] w-full flex-col lg:flex-row'>
                    <div className='flex w-full flex-col gap-5 p-6 lg:w-[900px] lg:p-10 lg:pt-[5%]'>
                        <h1 className='text-4xl sm:text-6xl lg:text-6xl'>Getting Here</h1>
                        <span>Address</span>
                        <p>Verdant Bluffs district of Los Santos</p>
                    </div>
                    <div className='relative h-72 w-full overflow-hidden sm:h-[450px] lg:h-[450px]'>
                        <img
                            src={museum?museum.map:""}
                            className='h-full w-full  object-cover scale-150'
                            style={{ objectPosition: '145px -125px' }}
                            alt=""
                        />
                        <div className='absolute top-[180px] left-[36px] bg-black rounded-full p-2 animate-bounce marker'>
                            <MapPinHouse color='white' size={50} />
                        </div>
                    </div>
                </div>
            </section>

            <section className='Restaurant-section  mt-16'>
            <div className='my-5 flex min-h-[500px] w-full flex-col items-center'>
                    <h1 className='px-5 text-center text-4xl sm:text-6xl lg:text-6xl'>Nearby Restaurants and Shops</h1>
                    <div className='mt-12 flex w-full flex-col gap-2 lg:mt-20'>
                        <RestaurantCard image={restaurant1}
                        time1={"11:00 AM – 10:00 PM"}
                        time2={"11:00 AM - 8:00PM"}
                        location={"Cityhall Mall,Saket,India"}
                        desc={" Mamagoto has been India’s first pan-Asian café, blending street hawker cuisine with vibrant urban art and manga-inspired décor. Known for its quirky and colorful atmosphere, Mamagoto also offers a retail line of curry pastes and stir-fry sauces."}/>
                        
                        <hr className='border-black' />
                        
                        <RestaurantCard image={restaurant2}
                        time1={"12:00 PM – 11:00 PM"}
                        time2={"1:00 PM - 9:00PM"}
                        location={"Cityhall Mall,Saket,India "}
                        desc={" Experience the vibrant flavors of India and Southeast Asia at Sly Granny Cafe. With aromatic spices and bold ingredients, the dishes here are a journey through rich culinary traditions."}/>                 

                    </div>
                </div>
            </section>

        </div>
    );
}

export default ViewMuseumDetails;
