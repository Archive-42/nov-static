import React from "react";
import { Typography } from "antd";

import SearchAutoComplete from "./SearchAutoComplete";

const { Title, Text } = Typography;

const SearchController = () => (
  <div
    style={{
      background: "#fff",
      padding: "6rem 24px",
      minHeight: "calc(100vh - 64px - 53px - 69px)",
      textAlign: "center",
    }}
  >
    <Title level={2}>Search movies</Title>
    <Text>Search the entire The Movie Database</Text>
    <br />
    <br />
    <SearchAutoComplete />
  </div>
);

export default SearchController;
