import React from "react";
import PlaceCard from "./PlaceCard";

function ActivitySection({ trip }) {

  const itinerary = Array.isArray(trip.TripData?.itinerary)
  ? trip.TripData.itinerary
  : trip.TripData?.itinerary
  ? [trip.TripData.itinerary]
  : [];

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {itinerary.map((activity, index) => (
          <div className="mt-5">
            <h2 className="font-medium text-lg">Day {activity?.day}</h2>
            <div className="grid grid-cols-2 gap-5">
              {activity.plan.map((place, index) => (
                <PlaceCard place={place} key={index}/>

              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;
