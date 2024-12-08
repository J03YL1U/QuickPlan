import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Mauritius for 3 days for Couple with a Cheap Budget. Give me a Hotel list with HotelName, Hotel Address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Detail, Place Image url, geo location, ticket pricing, time to travel each loaction for 1 week with each day plan with best time to visit. In JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Mauritius\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\",\n    \"bestTimeToVisit\": \"May to December (winter season for less rain and humidity)\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Le Palmiste Resort & Spa\",\n      \"hotelAddress\": \"Coastal Road, Trou-aux-Biches, Mauritius\",\n      \"price\": \"USD 70 - 100/night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/le_palmiste.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": -20.0144,\n        \"longitude\": 57.5653\n      },\n      \"rating\": 4.0,\n      \"description\": \"Offers good value, close to the beach and various amenities.\"\n    },\n    {\n      \"hotelName\": \"Coin de Mire Attitude\",\n      \"hotelAddress\": \"Royal Road, Bain Boeuf, Mauritius\",\n      \"price\": \"USD 60 - 90/night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/coin_de_mire.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": -20.0103,\n        \"longitude\": 57.5759\n      },\n      \"rating\": 3.5,\n      \"description\": \"Direct beach access, budget-friendly option in a lively area.\"\n    },\n    {\n      \"hotelName\": \"Veranda Pointe aux Biches Hotel\",\n      \"hotelAddress\": \"Coastal Road, Pointe aux Biches, Mauritius\",\n      \"price\": \"USD 80-110/night (approx)\",\n      \"hotelImageUrl\": \"https://example.com/veranda.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": -20.0197,\n        \"longitude\": 57.5622\n      },\n      \"rating\": 4.2,\n      \"description\": \"Family-friendly, offers various activities, located on a beautiful beach.\"\n    }\n    // Add more hotels as needed\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Grand Baie\",\n          \"placeDetail\": \"Explore the bustling town, shops, and restaurants.\",\n          \"placeImageUrl\": \"https://example.com/grand_baie.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": -20.0197,\n            \"longitude\": 57.5805\n          },\n          \"ticketPricing\": \"Free (except shopping/dining)\",\n          \"timeToTravel\": \"1 hour from most locations\"\n        },\n        {\n          \"placeName\": \"Pereybere Beach\",\n          \"placeDetail\": \"Relax on the white sand beach, swim, and snorkel.\",\n          \"placeImageUrl\": \"https://example.com/pereybere.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": -20.0080,\n            \"longitude\": 57.5728\n          },\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"15 minutes from Grand Baie\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Port Louis\",\n          \"placeDetail\": \"Visit the capital city, explore the Central Market, Caudan Waterfront.\",\n          \"placeImageUrl\": \"https://example.com/port_louis.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": -20.1609,\n            \"longitude\": 57.5012\n          },\n          \"ticketPricing\": \"Free (except museums/attractions)\",\n          \"timeToTravel\": \"1-1.5 hours from northern beaches\"\n        },\n        {\n          \"placeName\": \"Champ de Mars Racecourse\",\n          \"placeDetail\": \"Experience horse racing (seasonal)\",\n          \"placeImageUrl\": \"https://example.com/champ_de_mars.jpg\",\n          \"geoCoordinates\": {\n             \"latitude\": -20.1685,\n             \"longitude\": 57.4966\n          },\n          \"ticketPricing\": \"Varies\",\n          \"timeToTravel\": \"10 minutes from Port Louis\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Ile aux Cerfs\",\n          \"placeDetail\": \"Catamaran trip to this paradise island, water sports, relaxation.\",\n          \"placeImageUrl\": \"https://example.com/ile_aux_cerfs.jpg\",\n          \"geoCoordinates\": {\n             \"latitude\": -20.2297,\n             \"longitude\": 57.7458\n          },\n          \"ticketPricing\": \"USD 40-60 for catamaran tours\",\n          \"timeToTravel\": \"1.5-2 hours by boat from the east coast\"\n        }\n      ]\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});
