import { Button } from "antd";
import { PartitionOutlined } from "@ant-design/icons";
import { useOrg } from "@/store/org";
import logo from "@/assets/logo.png";

export default function Header() {
  const { toggleOpened } = useOrg();
  return (
    <div className="w-full h-16 flex items-center justify-between center px-4 border-b border-solid border-r-0 border-t-0 border-l-0 border-[#dc643a]  ">
      <div className=" font-bold h-full flex items-center mr-4">
        <img src={logo} className="h-2/3 w-auto " />
      </div>
      {/* <div className=" flex-1 flex items-center text-lg ">锦欣福星康养<span className=" text-sm align-bottom"></span></div> */}
      <div className=" hidden lg:block" onClick={toggleOpened}>
        <Button type="primary" icon={<PartitionOutlined />} />
      </div>
    </div>
  );
}
