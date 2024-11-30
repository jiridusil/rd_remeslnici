import React, { useContext, useState } from "react";
import { ConfigProvider, Space, Switch } from "antd";
import { ThemeContext } from "../ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { themeWrapper, toggleTheme } = useContext(ThemeContext);

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            handleBg: themeWrapper === "dark" ? "black" : "white",
          },
        },
      }}
    >
      <div style={{ padding: "10px" }}> Dark mode:</div>
    <Space direction="vertical">
      <Switch
        checkedChildren="ON"
        unCheckedChildren="OFF"
        style={{ 
        background: themeWrapper === "dark" ? "green" : "gray",
        }}
        onChange={toggleTheme}
      />
    </Space>
    </ConfigProvider>
  );
};
