export const SelectNumberOfTravellers=[
    {
        id:1,
        title:'Just Me',
        desc:'A lone traveller eager to discover parts of the world',
        icon:'✈️',
        people:'1 person'
    },
    {
        id:2,
        title:'We are A Couple',
        desc:'Ready for some alone time as much as for adventure',
        icon:'💘',
        people:'2 people'
    },
    {
        id:3,
        title:'My Family',
        desc:'Travelling always feels the best when done with the ones you cherish most',
        icon:'🏠',
        people:'3 to 5 people'
    },
    {
        id:3,
        title:'My Friends',
        desc:'A trip would not be complete without my frieds',
        icon:'🤗',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:"Cheap",
        desc:"I do not want to spend to much on this trip.",
        icon:'💵'
    },
    {
        id:2,
        title:"Moderate",
        desc:"I want to settle for a fair cost.",
        icon:'💰'
    },
    {
        id:2,
        title:"Pricey",
        desc:"ALL IN!!!!",
        icon:'💳'
    }
]


export const AI_PROMPT = 'Generate Travel Plan for Location : {location} for {totalDays} Days for {travellers} with a {budget} budget. Give me a Hotel list with HotelName, Hotel Address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Detail, Place Image url, geo location, ticket pricing, time to travel each loaction for 1 wekk with each day plan with best time to visit. Also suggest good restaurant to eat Lunch and Dinner with ratings, price, geo location and image url of their best food. In JSON format.'
