import { sliderimageData } from '../assets/sliderImagesData.js'
import React from 'react'
import { Link } from 'react-router-dom'

function ImageSlider() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {sliderimageData.map((slide, index) => (
        <Link key={index} to="/membership" className="group relative min-h-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={slide.imageUrl} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-110 group-hover:opacity-45" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative flex h-full min-h-72 flex-col justify-end p-7">
            <span className="mb-3 inline-block w-fit rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md">Member benefit</span>
            <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">{slide.title}</h3>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">{slide.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ImageSlider
