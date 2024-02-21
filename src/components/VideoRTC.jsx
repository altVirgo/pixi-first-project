import { useLogger } from "@/common/log";
import { useRTC } from "@/store/rtc";
// import { useUser } from "@/store/user";
import { LoadingOutlined } from "@ant-design/icons";
import { useMount } from "ahooks";
import { useEffect } from "react";

/**
 *
 */
export function VideoRTC({ u, rootClassName }) {
  const log = useLogger();
  const { tuiCallEngine, setRtcState, hangup } = useRTC();
  // const { user } = useUser();
  const isMe = u.userID === user.userCode;

  // 播放视频流
  function toggleStream(u) {
    if (isMe) {
      if (u.isVideoAvailable) {
        tuiCallEngine.openCamera(u.userID).catch((e) => log.error(e));
      } else {
        if (u.joined) {
          tuiCallEngine.closeCamera().catch((e) => log.error(e));
        }
      }
      if (u.isAudioAvailable) {
        tuiCallEngine.openMicrophone(u.userID).catch((e) => log.error(e));
      } else {
        if (u.joined) {
          tuiCallEngine.closeMicrophone().catch((e) => log.error(e));
        }
      }
    } else {
      //  当前设备准备好之后
      if (u.isVideoAvailable) {
        tuiCallEngine
          .startRemoteView({ userID: u.userID, videoViewDomID: u.userID })
          .catch((e) => log.error(e));
      }
    }
  }

  useMount(() => {
    setRtcState({
      action: "user",
      payload: { userID: u.userID, rendered: true }, // 标记播放该用户的video准备好
    });
  });

  // 监听
  useEffect(() => {
    if (u.rendered) {
      toggleStream(u);
    }
  }, [u]);

  return (
    <div
      className={`shadow shadow-[#d9d9d9] bg-[#d9d9d9] relative h-full ${rootClassName}`}
      id={u.userID}
    >
      <div className="absolute top-0 left-0 right-0 h-[2rem] z-[10] flex bg-[#d9d9d9] bg-opacity-40">
        <span className="my-auto font-black p-1">
          {u.userName}
          {isMe ? `(我)` : ""}
        </span>
      </div>
      {u.isVideoAvailable === true ? (
        <></>
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex">
          <LoadingOutlined className="m-auto text-4xl" />
        </div>
      )}
      <div className="absolute left-0 bottom-0 right-0 top-auto h-[40px] flex z-[9] bg-[#d9d9d9] bg-opacity-40 text-white">
        <div
          className={`my-auto mx-6 w-full grid grid-cols-${isMe ? 3 : 2} gap-${
            isMe ? 4 : 2
          }`}
        >
          <div className="m-auto flex flex-col">
            <span
              className="mx-auto h-[2rem] w-[2rem] rounded-full bg-black bg-opacity-30 flex"
              onClick={() => {
                if (isMe) {
                  if (u.isVideoAvailable) {
                    setRtcState({
                      action: "user",
                      payload: { userID: u.userID, isVideoAvailable: false },
                    });
                  } else {
                    setRtcState({
                      action: "user",
                      payload: { userID: u.userID, isVideoAvailable: true },
                    });
                  }
                }
              }}
            >
              <i
                className={`m-auto iconfont ${
                  u.isVideoAvailable
                    ? "icon-shexiangtou"
                    : "icon-shexiangtou_guanbi"
                } text-xl cursor-pointer`}
              />
            </span>
          </div>
          <div className="m-auto flex flex-col">
            <span
              className="mx-auto h-[2rem] w-[2rem] rounded-full bg-black bg-opacity-30 flex"
              onClick={() => {
                if (isMe) {
                  if (u.isAudioAvailable) {
                    setRtcState({
                      action: "user",
                      payload: { userID: u.userID, isAudioAvailable: false },
                    });
                  } else {
                    setRtcState({
                      action: "user",
                      payload: { userID: u.userID, isAudioAvailable: true },
                    });
                  }
                }
              }}
            >
              <i
                className={`m-auto iconfont ${
                  u.isAudioAvailable ? "icon-maikefeng2" : "icon-maikefengguan"
                } text-xl cursor-pointer`}
              ></i>
            </span>
          </div>
          {isMe ? ( // 只能挂断自己的
            <div className="m-auto flex flex-col">
              <span
                className="mx-auto h-[2rem] w-[2rem] bg-[#f00] rounded-full flex"
                onClick={() => hangup()}
              >
                <i className="m-auto iconfont icon-guaduan text-[#fff] text-xl cursor-pointer"></i>
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
