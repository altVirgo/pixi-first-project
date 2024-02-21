import { App as AntdApp, Button, Spin } from "antd";
import { lazy } from "react";
import { createHashRouter, RouterProvider, useNavigate, useSearchParams } from "react-router-dom";
import LazyImportComponent from "./components/LazyImportComponent";
import MainPage from "./pages/layout";

export default function App() {
  return <AppInner />;
}

function AppInner() {
  const router = createHashRouter([
    {
      id: "main",
      path: "/",
      element: <MainPage />,
      children: [
        {
          id: "bike",
          path: "/bike",
          element: <LazyImportComponent children={lazy(() => import("@/pages/pages/Bike/Bike.jsx"))} />,
        },
        {
          id: "parkour",
          path: "/parkour",
          element: <LazyImportComponent children={lazy(() => import("@/pages/pages/Parkour/index.jsx"))} />,
        },
      ],
    },
    {
      id: "404",
      path: "*",
      element: <NotFound />,
    },
  ]);
  
  console.log(router,location.href);
  return (
    <div className="w-full h-full overflow-hidden">
      <AntdApp className="w-full h-full">
        <RouterProvider router={router} fallbackElement={<Spin />} />
      </AntdApp>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center relative">
      <div className="m-auto">
        <Spin tip={<span className="text-3xl font-black">404</span>}></Spin>
      </div>
      <div className="absolute top-4 right-4">
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
    </div>
  );
}
