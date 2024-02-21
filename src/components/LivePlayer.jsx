import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useToggle } from 'ahooks'
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function LivePlayer({ data: { hlsUrl, coverPhoto } }) {
  const videoRef = useRef();
  const [loading, { set }] = useToggle(true); 
  const playerOptions = {
    type: "application/vnd.apple.mpegURL",
    src: hlsUrl,
    preload: true,
    autoplay: true,
    isLoop: false,
    poster: coverPhoto,
    playsinline: true,
    crossOrigin: false,
    controls: "progress,current,durration,volume",
  };
  let hls;
  const initMedia = () => {
    videoRef.current.preload = playerOptions.preload || true;
    videoRef.current.autoplay = playerOptions.autoplay || false;
    videoRef.current.poster = playerOptions.poster || "";
    if (playerOptions.playsinline) {
      videoRef.current.setAttribute("playsinline", playerOptions.playsinline);
      videoRef.current.setAttribute("webkit-playsinline", playerOptions.playsinline);
      videoRef.current.setAttribute("x5-playsinline", playerOptions.playsinline);
      videoRef.current.setAttribute("x5-video-player-type", "h5");
      videoRef.current.setAttribute("x5-video-player-fullscreen", false);
    }
    if (playerOptions.crossOrigin) {
      videoRef.current.crossOrigin = playerOptions.crossOrigin;
    }
    if (
      playerOptions.type &&
      (playerOptions.type === "application/x-mpegURL" || playerOptions.type === "application/vnd.apple.mpegURL")
    ) {
      try {
        if (Hls.isSupported()) {
          if (!hls) {
            hls = new Hls();
          }
          // console.log(hls)
          hls.loadSource(playerOptions.src);
          hls.attachMedia(videoRef.current);
          if (playerOptions.autoplay) {
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
              videoRef.current.play();
              set(false)
            });
          }
        } else {
          console.warn("HLS is not supported on your browser");
          videoRef.current.src = playerOptions.src;
          if (playerOptions.autoplay) {
            videoRef.current.addEventListener("loadedmetadata", function () {
              videoRef.current.play();
              set(false)
            });
          }
        }
      } catch (e) {
        console.log(e);
        console.warn("hls.js is required to support m3u8");
        videoRef.current.src = playerOptions.src;
      }
    } else {
      videoRef.current.src = playerOptions.src;
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      initMedia();
    }
    return () => {
      hls && hls.destroy();
    };
  }, [videoRef]);
  // return <div id="monitor-container" className=" w-[60vw] h-[60vh]" ref={videoRef}></div>;
  return (
    <div className="w-full h-full bg-black ">
      <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 60,
                }}
                spin
              />
            }
          ><video ref={videoRef} className=" w-full h-full"></video></Spin>
    </div>
  );
}
