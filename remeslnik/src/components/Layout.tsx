import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

// const items = new Array(5).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const items = [
  {    key: 1, label: 'Seznam řemeslníků' , href: '/contractors' },
  {    key: 2, label: 'Přidat řemeslníka', href: '/add-contractor'  },
  {    key: 3, label: 'Simple insert', href: '/simple-insert'  },
  {    key: 4, label: 'Kontakt', href: '/contact'  },
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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Domů</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Tady bude patička.....Řemeslník ©{new Date().getFullYear()} Created by Jiří Dušil
      </Footer>
    </Layout>
  );
};