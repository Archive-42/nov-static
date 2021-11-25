import React, { useEffect, useState } from "react";
import { Icon, Layout, Menu } from "antd";
import { Link, useRouteMatch } from "react-router-dom";

import { menuItems } from "../utils/data";

const { Header } = Layout;

const NavBar = () => {
  const [menuPosition, setMenuPosition] = useState("");
  const match = useRouteMatch();

  useEffect(() => {
    setMenuPosition(menuItems.find((item) => item.path === match.path).key);
  }, [match.path]);

  console.log(match);

  return (
    menuPosition && (
      <Header style={{ height: "48px" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[menuPosition]}
          style={{ lineHeight: "48px" }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>
                <Icon type={item.icon} />
                {item.text}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    )
  );
};

export default NavBar;
