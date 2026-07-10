import { sliderimageData } from '../assets/sliderImagesData.js'
import React from 'react'
import { Link } from 'react-router-dom'

function ImageSlider() {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {sliderimageData.map((slide, index) => (
        <Link key={index} to="/membership" className="group relative min-h-72 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <img src={slide.imageUrl} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-500 group-hover:scale-110 group-hover:opacity-45" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative flex h-full min-h-72 flex-col justify-end p-7">
            <span className="mb-3 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">Member benefit</span>
            <h3 className="text-3xl font-semibold text-white">{slide.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">{slide.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ImageSlider
