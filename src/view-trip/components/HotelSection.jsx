import React from 'react'
import background from '../../assets/background.jpg';
import { Link } from 'react-router-dom';

function HotelSection({trip}) {
  return (
    <div>
        <h2 className='font-bold mt-5 text-xl'>Hotel Recommendations</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {trip?.TripData?.travelPlan?.hotels?.map((hotel,index) =>(
                <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank' key={index}>
                    <div className='hover:scale-105 transition-all'>
                        <img  src={background} className='rounded-lg'/>
                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                            <h2 className='text-sm'>💵{hotel?.price}</h2>
                            <h2 className='text-sm'>⭐{hotel?.rating} stars</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default HotelSection