import { ArrowRight } from 'lucide-react'
import React from 'react'

function FooterButton({text}) {
  return (
    <>
<button
  className='mt-7 flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30'
>
    <p className='flex items-center justify-center'>
    {text}
    <ArrowRight />
    </p>
  

</button>
    </>
  )
}

export default FooterButton
