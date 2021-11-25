import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import { useParams } from "react-router-dom";

import GridMovies from "./GridMovies";

import { collections } from "../utils/data";
import { URLS } from "../utils/constants";
import { paramsToString } from "../utils/helpers";

const CollectionMovies = () => {
  const [collection, setCollection] = useState({
    queryString: {},
  });
  let { colId } = useParams();

  useEffect(() => {
    setCollection(collections.find((collection) => collection.id === colId));
  }, [colId]);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={collection.title}
      />
      <GridMovies
        url={`${URLS.discoverMovie}?${paramsToString(collection.queryString)}`}
      />
    </>
  );
};

export default CollectionMovies;
