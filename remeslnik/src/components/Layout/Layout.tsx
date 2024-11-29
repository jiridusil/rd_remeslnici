import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer } = Layout;

const items: MenuProps["items"] = [
  { key: 1, label: <Link to="/">Seznam řemeslníků</Link> },
  { key: 2, label: <Link to="/add-contractor">Přidat řemeslníka</Link> },
  { key: 3, label: <Link to="/contact">Kontakt</Link> },
];

export const TopHeader: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
          items={items}
        >
        </Menu>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <main style={{ minHeight: "calc(100vh - 200px)", padding: "32px 0" }}>
            <Outlet />
          </main>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Created by Jiří Dušil
      </Footer>
    </Layout>
  );
};
