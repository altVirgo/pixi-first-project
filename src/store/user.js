// /**
//  *
//  */

// import { oa } from "@/api/oa";
// import { client } from "@/common/client";
import { TOKEN } from "@/common/queryKey";
import { atom, useRecoilState } from "recoil";
// /**
//  * 当前用户
//  */
// const userAtom = atom({
//   key: "current-user",
//   default: null,
// });


/**
 * 当前用户ssoToken
 */
const ssoTokenAtom = atom({
  key: "current-user-token",
  default: null,
});

/**
 * 当前令牌
 */
const tokenAtom = atom({
  key: "current-token",
  default: undefined,
  effects: [
    ({ onSet }) => {
      onSet((val) => {
        if (val) {
          sessionStorage.setItem(TOKEN, val);
        } else {
          sessionStorage.removeItem(TOKEN);
        }
      });
    },
  ],
});

/**
 *
 * @returns {{user:{name:string, userCode:string, orgId:number,orgPaths:string,regionCode:string}, sign:{sdkAppId:string,userSig:string}}}
 */
export const useUser = () => {
  const [token, setToken] = useRecoilState(tokenAtom);
  
  return {
    token,
    setToken
  };
};
