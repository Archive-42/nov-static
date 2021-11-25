import React, { useEffect } from "react";
import { Icon, Menu } from "antd";

import { subMenuItems } from "../utils/data";

const HomeMenu = ({ handleClick, current, setCurrent, setQueryParams }) => {
  useEffect(() => {
    setCurrent(`${subMenuItems[0].key}:${subMenuItems[0].data[0].key}`);
    setQueryParams(subMenuItems[0].data[0].queryParams);
  }, []);

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={{
        backgroundColor: "#232323",
        textAlign: "right",
        paddingRight: "1rem"
      }}
    >
      {subMenuItems.map(subMenu => (
        <Menu.SubMenu
          key={subMenu.key}
          title={
            <span className="submenu-title-wrapper">
              <Icon
                type={subMenu.icon}
                theme="twoTone"
                twoToneColor="#22ce94ff"
              />
              {subMenu.name}
            </span>
          }
        >
          {subMenu.data.map(item => (
            <Menu.Item
              key={`${subMenu.key}:${item.key}`}
              queryparams={item.queryParams}
              style={{ textAlign: "initial" }}
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};

export default HomeMenu;
