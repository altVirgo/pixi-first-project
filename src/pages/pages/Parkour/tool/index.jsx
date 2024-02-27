import { useEffect, useRef, useState } from "react";
import ParkourTool from "../lib/tool";
import { Button, Input } from "antd";
let parkourTool;
export default function Tool() {
  const ref = useRef();
  const [positions, setPositions] = useState();
  useEffect(() => {
    if (ref.current) {
      parkourTool = new ParkourTool(ref.current);
    }
  }, [ref]);
  const clear = () => {
    parkourTool.reset();
  };
  const exportMatrix = () => {
    setPositions(JSON.stringify(parkourTool.exportMatrix()));
  };
  const importMatrix = () => {
    parkourTool.importMatrix(JSON.parse(positions))
  }
  const exportArray = () => {
    setPositions(JSON.stringify(parkourTool.exportArray()));
  };
  const importArray = () => {
    parkourTool.importArray(JSON.parse(positions))
  }
  return (
    <div className="flex w-full h-full">
      <div className=" p-4 w-80 h-full flex flex-col">
        <div className=" mb-4">
          <Button type="primary" onClick={clear} className="mr-2">
            清除
          </Button>
          <Button type="primary" onClick={exportMatrix} className="mr-2">
            导出矩阵
          </Button>
          <Button type="primary" onClick={importMatrix}>
            导入矩阵
          </Button>
          <Button type="primary" onClick={exportArray} className="mr-2">
            导出数组
          </Button>
          <Button type="primary" onClick={importArray}>
            导入数组
          </Button>
        </div>
        <div className="flex-1">
          <Input.TextArea className=" h-full" value={positions} onChange={({target:{value}})=>setPositions(value)}></Input.TextArea>
        </div>
      </div>
      <div className=" flex-1">
        <div ref={ref} className="w-full h-full"></div>
      </div>
    </div>
  );
}
