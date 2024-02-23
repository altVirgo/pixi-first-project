import { useEffect, useRef } from "react";
import Parkour from "./lib";
export default function PageParkour() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let app = new Parkour(ref.current);
      console.log(app)
    }
  }, [ref]);
  return (
    <div ref={ref}>
    </div>
  );
}
