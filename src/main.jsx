
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import zhCn from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import MainApp from "./App";
import { client } from "./common/client";
import "./index.css";
import "./index.less";
// import "@/assets/iconfont/iconfont.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ConfigProvider
        locale={zhCn}
        theme={{
          token: { 
              colorPrimary: '#dc643a',
           },
        }}
      >
        <StyleProvider
          hashPriority="high"
          transformers={[legacyLogicalPropertiesTransformer]}
        >
          <App className="w-full h-full bg-white">
            <MainApp />
          </App>
        </StyleProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
