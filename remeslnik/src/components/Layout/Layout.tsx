import React, { useContext, useEffect } from "react";
import { ConfigProvider, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeContext } from "../ThemeContext";

const { Header, Content, Footer } = Layout;

const items: MenuProps["items"] = [
  { key: 1, label: <Link to="/">Seznam řemeslníků</Link> },
  { key: 2, label: <Link to="/add-contractor">Přidat řemeslníka</Link> },
  { key: 3, label: <Link to="/contact">Kontakt</Link> },
];

export const TopHeader: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { themeWrapper } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor = themeWrapper === "dark" ? "black" : "white";
  }, [themeWrapper]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeWrapper === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Header style={{ display: "flex", alignItems: "center", 
          background: themeWrapper === "dark" ? "black" : "white" }}>
          <div className="demo-logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ flex: 1, minWidth: 0 }}
            items={items}
          ></Menu>
          <ThemeToggle />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div
            style={{
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <main
              style={{ minHeight: "calc(100vh - 200px)", padding: "32px 0" }}
            >
              <Outlet />
            </main>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Jiří Dušil
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};
