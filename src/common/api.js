import {message} from "antd";
import axios from "axios";
import qs from "qs";
import {TOKEN} from "./queryKey";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    timeout: 120000,
    headers: {
        "tenant-id": 1,
        "Content-Type": "application/json",
        "Authorization": "Bearer ",
    },
    paramsSerializer: {
        serialize: function (params) {
            return qs.stringify(params, {arrayFormat: "repeat", allowDots: true});
        },
    },
});

api.interceptors.request.use(async (config) => {
    const auth = sessionStorage.getItem(TOKEN);
    if (auth) {
        config.headers = {
            ...config.headers,
            Authorization: "Bearer " + auth,
        };
    }
    return config;
});

api.interceptors.response.use(
    ({data, headers}) => {
        // if (headers.auth) {
        //     sessionStorage.setItem(WXCT_TOKEN, headers.auth);
        // }
        if (data instanceof Blob) {
            return data;
        } else if (data.code === 0) {
            if(data.data && data.data.list === null && data.data.total === null){
                location.href = 'http://portal.jxfxky.com/portal/error.html'
            }
            return data.data && data.data.list === null ? {list: [], total: []} : data.data;
        } else if (data.code === 401) {
            // message.error(data.msg);
            location.href = 'http://portal.jxfxky.com/'
        } else {
            message.error(data.msg || "未知错误，请联系技术人员");
            // todo 收集错误信息
            console.error(`errorMsg=${data.errorMsg}, message=${data.msg}`);
            //
            throw data.msg;
        }
    },
    (err) => {
        console.error(err);
        if (err?.code === "ECONNABORTED") {
            message.error("网络异常，请联系网络管理员检测");
        } else if (err?.code === "ERR_BAD_RESPONSE") {
            message.error("接口异常，请联系技术人员处理");
        }
        return Promise.reject(err);
    }
);
