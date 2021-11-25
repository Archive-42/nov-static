import React from "react";
import { Card, List } from "antd";
import { Link, useRouteMatch } from "react-router-dom";

const CollectionItem = ({ collection, image }) => {
  let match = useRouteMatch();

  return (
    <Card cover={<img alt={collection.title} src={image} />}>
      <List.Item.Meta
        title={
          <Link to={`${match.url}/${collection.id}`}>{collection.title}</Link>
        }
      />
    </Card>
  );
};

export default CollectionItem;
