import { PlayCircleOutlined } from "@ant-design/icons";
import img from "@/assets/preview.jpg";
import { useDialog } from "@/store/video";
import { useState } from "react";
import { useEffect } from "react";
import { isVideo,isImage } from "@/common/util";
import * as R from "ramda";
import { Card } from "antd";

export default function Poster({ data, type }) {
  const { openDialog} = useDialog();
  // const [ url, setUrl] = useState('')
  // useEffect(()=>{
  //   setUrl(data.fileName?'http://124.222.207.17:8080/photos/'+data?.fileName:data.url)
  // },[data])
  
  return (
    <Card className="w-full pb-4 bg-slate-100">
      <div className="group/img w-full relative cursor-pointer overflow-hidden mb-1" onClick={()=>openDialog({data,type})}>
        {/* {
            isImage(data?.url)?<img src={data?.url||img} alt="" className=" overflow-hidden h-full w-full" />:
            isVideo(data?.url)?<video height="100%" width="100%" autoPlay src={data?.url} controls className=" bg-black"></video>:<img src={img} alt="" className=" overflow-hidden h-full w-full" />
        } */}
        <img src={data.imageUrl||data.coverPhoto||img} alt="" className=" overflow-hidden h-full w-full" />
        <div className="flex w-full h-full absolute z-10 top-[-1000px] left-0 bg-transparent justify-center white group-hover/img:top-0 animate-pulse">
          <PlayCircleOutlined className=" text-7xl text-white/50 " color=" white" />
        </div>
      </div>
      <div className=" px-4 py-1 pb-4">
        <div className="font-bold">{data.channel||'监控'}</div>
        <div className="text-ellipsis">{data.serialNumber}</div>
      </div>
    </Card>
  );
}
