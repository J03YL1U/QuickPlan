import React from 'react'
import background from '../../assets/background.jpg';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';

function InfoSection({trip}){
  return (
    <div>
        <img src={background} className='h-[300px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
              <h2 className='font-bold text-2xl'>{trip?.userSelection?.location.label}</h2>
              <div className='flex gap-3'>
                <h2 className='p-1 px-5 bg-gray-200 rounded-full text-gray-500'>📅{trip.userSelection?.period} Days</h2>
                <h2 className='p-1 px-5 bg-gray-200 rounded-full text-gray-500'>🪙{trip.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-5 bg-gray-200 rounded-full text-gray-500'>🧑‍🤝‍🧑No. of Travellers: {trip.userSelection?.people}</h2>
              </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
  
}

export default InfoSection
