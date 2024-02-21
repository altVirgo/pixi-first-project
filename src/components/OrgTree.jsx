import { Tree, Input } from "antd";
import { service } from "@/api/index";
import * as R from "ramda";
import { useThrottleFn } from "ahooks";
// import { useUser } from "@/store/user";
import { useQuery } from "react-query";
import { ORG } from "@/common/queryKey";
import { useEffect, useMemo, useState } from "react";
import { useOrg } from "@/store/org";
import { type } from "ramda";
const { Search } = Input;
/**
 * 业务组织树
 */

export default function OrgTree({ onSelect }) {
  const { org, setOrg } = useOrg();
  const [keys, setKeys] = useState([]);
  const [expandedKeys,setExpandKeys] = useState([])
  const dataToTree = (arr,parentId)=>{
    return arr?.filter((item)=>item.parentId===parentId).map((item)=>{return {...item,children:dataToTree(arr,item.id)}})
  }
  const { data } = useQuery(
    [ORG],
    () => service.org.getTree(),
    // {select:(res)=>{

    //   // return dataToTree(res.map((item)=>{return {...item,key:item.id}}),0)
    // }},
    {
      onSuccess:(res)=>{
        setExpandKeys(res?.map(item=>item.id))
      }
    }
  );
  const [kw, setKw] = useState();
  
  const { run } = useThrottleFn(
    async (e) => {
      setKw(e.target.value ? e.target.value : "");
    },
    { wait: 300 }
  );

  const travelTreeData = (data, childrenProp = "children", filter, map = (e, children) => ({ ...e, children })) => {
    //
    if (R.isNil(data) || R.isEmpty(data)) {
      return [];
    }
    return R.map((e) => {
      const rest = R.pickBy((_, key) => key !== childrenProp, e);
      if (R.isNil(rest)) {
        return undefined;
      }

      let childs = e[childrenProp];
      let children;
      if (childs && childs.length) {
        children = travelTreeData(childs, childrenProp, filter, map);
      }
      if (children?.length || filter(rest)) {
        if (type(map) === "Function") {
          return map(rest, children);
        } else {
          return { ...rest, children };
        }
      } else {
        return undefined;
      }
    })(data)?.filter((e) => !!e);
  };
  const treeData = useMemo(() => {
    return travelTreeData(dataToTree(data?.map((item)=>{return {...item,key:item.id}}),0), "children", (t) => {
      return !kw || t.name.indexOf(kw) > -1;
    });
  }, [data, kw]);

  // useEffect(()=>{
  //     R.isEmpty(kw)||R.isNil(kw)?setExpandKeys(data?.map(item=>item.id)): setExpandKeys([1,4,1705,1704,1703,1200,33,32])
  // },[treeData])
  return (
    <div className="w-full h-full overflow-y-auto pb-[60px]">
      <Input
        style={{
          marginBottom: 8,
        }}
        placeholder="请输入关键字"
        onChange={run}
      />
      <Tree
        treeData={treeData}
        fieldNames={{ title: "name", value: "id" }}
        expandedKeys={expandedKeys}
        showSearch
        showLine
        selectedKeys={keys}
        onExpand={(v)=>setExpandKeys(v)}
        onSelect={(_, { node }) => {
          setOrg(node);
          setKeys([node.id]);
          if (type(onSelect) === "Function") {
            onSelect(node);
          }
        }}
      />
    </div>
  );
}
