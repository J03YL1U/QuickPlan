import React from "react";
import HotelCard from "./HotelCard";

function HotelSection({ trip }) {
  return (
    <div>
      <h2 className="font-bold mt-5 text-xl">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {trip?.TripData?.hotels?.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index}></HotelCard>
        ))}
      </div>
    </div>
  );
}

export default HotelSection;
