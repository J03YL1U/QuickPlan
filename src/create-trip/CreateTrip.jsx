import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
  return (
    <div className='sm:px-10 md:px-3 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell me your preference</h2>
      <p className='mt-3 text-gray-500 text-xl'>Provide me with the following information and I will design the trip that you regret you never took</p>


      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where is your next adventure?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateTrip