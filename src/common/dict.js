
import { useQuery } from "react-query";
import { service } from "@/api/index";
import { DICT,CACHE } from "@/common/queryKey";
export const WarnType = {
    0: "未带帽子",
    2: "未带口罩",
    4: "未穿制服",
    6: "吸烟",
    7: "老鼠",
}

export const Valid = {
    1:"有效",
    2:"无效",
    0:"未标记"
} 

export const Status = {
    1:"已处理",
    0:"未处理"
} 


export function useDict(type) {
    return useQuery([DICT, type], () => service.dict.query(type));
}

export function useGroup(){
    return useQuery([CACHE,'group'],()=>service.cache.group())
}