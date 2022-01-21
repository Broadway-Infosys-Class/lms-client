import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";

const { Header, Content, Footer, Sider } = Layout;
const MainComponent = (props: any) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false as boolean);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div onClick={() => history.push("/")} className="logo" />
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2021 @ all right reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainComponent;
