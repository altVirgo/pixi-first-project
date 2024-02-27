import { useEffect, useRef } from "react";
import ParkourGame from "./lib/game";
export default function PageParkour() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let parkourGame = new ParkourGame(ref.current);
      console.log(parkourGame)
    }
  }, [ref]);
  return (
    <div ref={ref} className=" w-full h-full">
    </div>
  );
}
