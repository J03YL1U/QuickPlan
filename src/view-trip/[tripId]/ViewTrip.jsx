import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';
import Hotel from '../components/HotelSection';
import HotelSection from '../components/HotelSection';
import ActivitySection from '../components/ActivitySection';

const ViewTrip = () => {

  const {tripId} = useParams(); //to get dynamic id
  const [trip, setTrip] = useState([]);

  useEffect(()=>{
    tripId&&GetTripData();
  },[tripId]);

  //Refer to https://firebase.google.com/docs/firestore/query-data/get-data
  const GetTripData = async() =>{
    const docRef=doc(db, 'AITrips', tripId); //get trip from database using primary key
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    }else{
      console.log("No Such Document");
      toast('No Trip Found');
    }
  }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Info section */}
      <InfoSection trip={trip}>

      </InfoSection>

      {/* Recommended Hotels */}
      <HotelSection trip={trip}>

      </HotelSection>

      {/* Daily Plan */}
      <ActivitySection trip={trip}>

      </ActivitySection>

      {/* Footer */}
    </div>
  )
}

export default ViewTrip