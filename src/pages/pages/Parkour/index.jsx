import { useEffect, useRef } from "react";
import Parkour from "./Parkour";
export default function Bike() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let parkour = new Parkour(ref.current);
      console.log(parkour)
    }
  }, [ref]);
  return (
    <div ref={ref}>
    </div>
  );
}
