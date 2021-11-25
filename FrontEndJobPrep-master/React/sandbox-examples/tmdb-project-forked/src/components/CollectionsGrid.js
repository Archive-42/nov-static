import React from "react";
import { collections } from "../utils/data";
import { List, Typography } from "antd";

import CollectionItem from "./CollectionItem";

import colBest2019 from "../assets/collections/colBest2019.jpg";
import colBestDecade from "../assets/collections/colBestDecade.jpg";
import colBestFrench from "../assets/collections/colBestFrench.jpg";
import colBestHorror from "../assets/collections/colBestHorror.jpg";
import colBestScifi from "../assets/collections/colBestScifi.jpg";
import colBiggestBoxOfficeFlops from "../assets/collections/colBiggestBoxOfficeFlops.jpg";
import colLargestGrossing from "../assets/collections/colLargestGrossing.jpg";
import colMostPopularOnes from "../assets/collections/colMostPopularOnes.jpg";

const { Title } = Typography;

const images = {
  colBest2019,
  colBestDecade,
  colBestFrench,
  colBestHorror,
  colBestScifi,
  colBiggestBoxOfficeFlops,
  colLargestGrossing,
  colMostPopularOnes
};

const CollectionsGrid = () => (
  <div
    style={{
      background: "#fff",
      padding: "2rem"
    }}
  >
    <Title level={2}>Collections</Title>
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        lg: 4
      }}
      dataSource={collections}
      renderItem={collection => (
        <List.Item>
          <CollectionItem
            collection={collection}
            image={images[collection.id]}
          />
        </List.Item>
      )}
    />
  </div>
);

export default CollectionsGrid;
