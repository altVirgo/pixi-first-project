// import * as service from "@/api/index";
// import dayjs from "dayjs";
import { useEffect } from "react";
import { Modal, Button } from "antd";
import videoSrc from "@/assets/video.mp4";
import LivePlayer from "./LivePlayer";
// import { useQuery } from "react-query";

export default function VideoDialog({ data, type, open, onClose }) {
  return (
    <Modal
      width="840px"
      open={open}
      onCancel={onClose}
      title={`${data.channel||"监控"}(${data.serialNumber})`}
      destroyOnClose
      footer={
        <div className="w-full flex justify-center gap-x-8">
          <Button type="default" onClick={onClose}>
            关闭
          </Button>
        </div>
      }
    >
      <div className="h-max-[60vh]">
        {type === "monitor" ? (
          <LivePlayer data={data} />
        ) : (
          <video height="100%" width="100%" autoPlay src={data.videoUrl} controls className=" bg-black"></video>
        )}
      </div>
    </Modal>
  );
}
