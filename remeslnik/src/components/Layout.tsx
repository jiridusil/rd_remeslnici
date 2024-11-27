import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';


const { Header, Content, Footer } = Layout;

// const items = new Array(5).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const items = [
  { key: 1, label: 'Seznam řemeslníků', href: '/' },
  { key: 2, label: 'Přidat řemeslníka', href: '/add-contractor' },
  { key: 3, label: 'Kontakt', href: '/contact' },
]

export const TopHeader: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, minWidth: 0 }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <main style={{ minHeight: 'calc(100vh - 200px)', padding: '32px 0' }}>
            <Outlet />
          </main>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by Jiří Dušil
      </Footer>
    </Layout>
  );
};