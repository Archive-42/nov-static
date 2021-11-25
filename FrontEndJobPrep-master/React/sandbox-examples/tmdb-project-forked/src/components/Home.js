import React, { useState } from "react";

import HomeMenu from "./HomeMenu";
import GridMovies from "./GridMovies";

import { paramsToString } from "../utils/helpers";
import { URLS } from "../utils/constants";

const Home = () => {
  const [current, setCurrent] = useState("");
  const [queryParams, setQueryParams] = useState({});

  const handleClick = e => {
    setCurrent(e.key);
    setQueryParams(e.item.props.queryparams);
  };

  return (
    <>
      <HomeMenu
        handleClick={handleClick}
        current={current}
        setCurrent={setCurrent}
        setQueryParams={setQueryParams}
      />
      <GridMovies
        title="Movies"
        url={`${URLS.discoverMovie}?${paramsToString(queryParams)}`}
      />
    </>
  );
};

export default Home;
