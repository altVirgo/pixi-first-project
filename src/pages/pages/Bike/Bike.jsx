import { useEffect, useRef } from "react";
import BrakeBanner from './bikeCanvas'
import {useLocation} from "react-router";
export default function Bike() {
  const ref = useRef()
  useEffect(()=>{
    if(ref.current){
      console.log(new BrakeBanner(ref.current))
    }
  },[ref])
  return (
    <div ref={ref} >
      
    </div>
  );
}
