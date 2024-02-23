import { useEffect, useRef } from "react";
import Parkour from "./lib";
import { Form } from "antd";
export default function PageParkour() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let app = new Parkour(ref.current);
      console.log(app);
    }
  }, [ref]);
  return (
    <div>
      <div className="fixed">
        <Form>
          <Form.Item name='width'></Form.Item>
          <Form.Item name='higth'></Form.Item>
          <Form.Item name=''></Form.Item>
        </Form>
      </div>
      <div ref={ref}></div>
    </div>
  );
}
