import React from "react";
import { Icon } from "antd";

const IconText = ({ style, type, text }) => {
  return (
    <span style={style}>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
};

export default IconText;
