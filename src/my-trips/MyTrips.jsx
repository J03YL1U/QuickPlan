import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import UserTripCard from "./UserTripCard";

function MyTrips() {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }

    
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    try {
      const querySnapshot = await getDocs(q);
      const trips = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>
        {userTrips.map((trip, index) => (
          <UserTripCard key={index} trip={trip} className="object-cover rounded-xl"/>
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
