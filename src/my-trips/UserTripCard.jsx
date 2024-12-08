import React, {useState, useEffect} from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotoApi";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location.label,
    };
    const result = await GetPlaceDetails(data).then((response) => {
      // console.log(response.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        response.data.places[0].photos[3].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <div className="flex justify-center items-center">
          <img
            src={photoUrl}
            alt="Placeholder image"
            className="object-cover rounded-xl h-[220px] w-[220px]"
          />
      </div>
      <div>
        <h2 className="font-bold text-lg flex justify-center items-center">
          {trip?.userSelection?.location?.label}
        </h2>
        <h2 className="text-sm text-gray-500 flex justify-center items-center">
          {trip?.userSelection.period} Days trip with a {trip?.userSelection.budget} budget for {trip?.userSelection.people}
        </h2>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCard;
