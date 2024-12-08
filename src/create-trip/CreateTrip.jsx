import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectNumberOfTravellers } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import logo from '../assets/logo.png';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {

  const[place,setPlace] = useState();

  const[formData, setFormData] = useState([]);

  const [openDialog,setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

  const OnGenerateTrip=async ()=>{
    
    const user = localStorage.getItem("user");
    if(!user){
      setOpenDialog(true);
      return;
    }

    if(!formData?.location || !formData?.budget || !formData?.people){
      toast("Please fill all the details.")
      return;
    }else{
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
      .replace('{location}',formData?.location.label)
      .replace('{totalDays}',formData?.period)
      .replace('{travellers}',formData?.people)
      .replace('{budget}',formData?.budget)

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveToDB(result?.response?.text());
    }
  }

  const SaveToDB= async(TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    
    await setDoc(doc(db, "AITrips", docId), {
      userSelection:formData,
      TripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);

    navigator('/view-trip/'+docId);
  }

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp)=>{
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
    }).catch((err) => {
        console.log(err);
        toast("Login failed please try again.")
        setOpenDialog(false);
    });
  }


  return (
    <div className='sm:px-10 md:px-3 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell me your preference🌤️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Provide me with the following information and I will design the trip that you regret you never took</p>


      <div className='mt-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where is your next adventure?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
            }}
          />
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>For how many days are you planning to go on your trip?</h2>
        <Input placeholder={'No of days'} type="number"
          onChange={(e)=>handleInputChange('period',e.target.value)}
        />
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How much are you willing to spend?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow cursor-pointer ${formData?.budget==item.title&&'shadow-lg border-black'}`}
                onClick={()=>handleInputChange('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-700'>{item.desc}</h2>
              </div>  
            ))}
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Who is coming with you on this new adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectNumberOfTravellers.map((item,index) => (
              <div key={index} className={`p-4 border rounded-lg hover:shadow cursor-pointer ${formData?.people==item.people&&'shadow-lg border-black'}`}
                onClick={()=>handleInputChange('people', item.people)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-700'>{item.desc}</h2>
              </div>  
            ))}
        </div>
      </div>

      <div className='mt-10 justify-center flex'>
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
          {loading ? 
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>: 'Generate Trip'
          }</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Sign in with Google</DialogTitle>
            <DialogDescription>
              <img className="object-scale-down h-40 w-full" src={logo} alt="Logo" />
              <span>Sign in to the App with Google authentication securely</span>
              <Button onClick={login} className="w-full mt-5 gap-4 items-center">
                <FcGoogle className="h-7 w-7" /> Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      
    </div>
  )
}

export default CreateTrip