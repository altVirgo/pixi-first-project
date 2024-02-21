import React from "react";

function logErrorToMyService(error, errorInfo) {
  console.error(error, errorInfo);
}

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full h-full flex">
          <div className="m-auto space-y-4">
            <h1>Something went wrong.</h1>
            <p className="text-red-600 overflow-clip">{`${this.state.error}`}</p>
            <p className="font-black font-darkBlue">
              按f12，重新进入该页面，复现错误，截图发给技术人员处理
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
