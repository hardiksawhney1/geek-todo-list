import React from 'react';
import { useFirebase } from '../../context/Firebase';



const Loginbutton = () =>{
  const firebase = useFirebase();
  return (
    <div>
      <button style={{ backgroundColor: '#F55B5B' }} className="text-white text-[14px] max-w-[290px] h-[50px] rounded-lg px-5 md:px-0 md:min-w-[22vw]" onClick={firebase.signInWithGoogle}>
        <i className="fa fa-google pr-3"></i> Continue With Google
      </button>
    </div>
  );
}


export {Loginbutton};
