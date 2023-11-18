import React, { useState } from "react";
import { Layout as DefaultLayout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import { UnorderedListOutlined, PlusOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = DefaultLayout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to="/">Listado de lenguajes</Link>,
    "1",
    <UnorderedListOutlined />
  ),
  getItem(<Link to="create">Crear lenguaje</Link>, "2", <PlusOutlined />),
];

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e) => {
    setCurrentRoute(e.key);
  };

  return (
    <DefaultLayout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <br />
        <br />
        <br />
        <Menu
          theme="dark"
          selectedKeys={[currentRoute]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <DefaultLayout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "40px",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Prueba React ©2023 Fabián Fernández
        </Footer>
      </DefaultLayout>
    </DefaultLayout>
  );
}

export default Layout;
