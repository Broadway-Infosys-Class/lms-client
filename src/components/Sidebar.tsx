import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true as boolean);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Menu theme="dark" defaultSelectedKeys={[""]} mode="inline">
      <Menu.Item
        onClick={() => {
          history.push("/books");
        }}
        key="1"
        icon={<BookOutlined />}
      >
        Books
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push("/members");
        }}
        key="2"
        icon={<TeamOutlined />}
      >
        Members
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          history.push("/genre");
        }}
        key="2"
        icon={<MenuOutlined />}
      >
        Genre
      </Menu.Item>      



      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
