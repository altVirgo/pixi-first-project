import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "./header";
import { Outlet } from "react-router-dom";
/**
 * 主页
 */
export default function MainPage() {
  return <MainInner />
}

function MainInner() {

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
