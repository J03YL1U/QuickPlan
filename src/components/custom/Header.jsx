import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openDialog,setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

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
        window.location.reload();
    }).catch((err) => {
        console.log(err);
        toast("Login failed please try again.")
        setOpenDialog(false);
    });
  }


  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img className="object-scale-down h-40 w-full" src={logo} />
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">
                Create A Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-full w-full rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload()
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
        )}
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
  );
}

export default Header;
