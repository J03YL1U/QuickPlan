import { Button } from "@/components/ui/button";
import { IoLocationSharp } from "react-icons/io5";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotoApi";

function PlaceCard({ place }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName
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
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          alt="Placeholder image of the place"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetail}</p>
          <h2 className="mt-2">🕙 {place.timeToTravel}</h2>
          <Button size="sm">
            <IoLocationSharp />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
