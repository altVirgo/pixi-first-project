import { Copyable } from "@/components/Copyable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

/**
 * 404页面
 */
export default function NotFound() {
  const loacation = useLocation();
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex">
      <div className="m-auto flex flex-col gap-y-4">
        <span className=" font-black text-2xl">
          404,{" "}
          <span className="text-[#f00]">
            <Copyable txt={location.pathname} />
          </span>{" "}
          页面未找到
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate(-1)}
        >
          <Button type="primary" color="orange">
            返回
          </Button>
        </span>
      </div>
    </div>
  );
}
