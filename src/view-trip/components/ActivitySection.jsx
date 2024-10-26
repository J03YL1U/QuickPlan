import React from 'react'

function ActivitySection({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Visit</h2>

        <div>
            {trip.TripData?.travelPlan?.itinerary.map((activity,index)=>(
                <div>
                    <h2>{activity?.day}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ActivitySection
