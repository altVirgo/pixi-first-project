import { Suspense } from "react";
// 实现懒加载
export default function LazyImportComponent(props) {
  return (
    <Suspense>
      <props.children />
    </Suspense>
  );
}
