import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Embark on a new adventure with Quick Plan:</span>  Your AI assitant making trips easy for everyone.
      </h1>
      <p className='text-xl text-gray-500 text-center'>Your quick and personal trip planner taking into account your interest, budjet but most importantly your time</p>
      
      <Link to={'/create-trip'}>
        <Button>Start your Trip</Button>
      </Link>
      
    </div>
    
  )
}

export default Hero