import {React, useEffect} from "react";
import {Loginbutton} from "../LoginButton";
import { loginpage, geekyants } from "../../assets_images";

import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
const Loginpage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(()=>{
    if(firebase.isLoggedIn){
      navigate("/dashboard");
    }
  }, [firebase, navigate])
  return (
    <div className="bg-gradient h-screen w-screen flex flex-col justify-center items-center gap-[10vh] md:flex-row md:gap-[0vh]" >
      <img src={loginpage} alt="Logo" className="w-4/5 md:w-[55.4vw]" />
      <div className="font-poppins font-semibold text-base min-w-[23.4vw] flex flex-col gap-3 md:pl-[6vw] md:text-[1.5vw]">
        <img src={geekyants} className="w-[152px] md:w-[12.8vw]"  />
        <div className="font-Poppins ">
          <p className="">Log In to Your Account</p>
        </div>
        <div><Loginbutton /></div>
      </div>
    </div>
  );
};

export default Loginpage;
