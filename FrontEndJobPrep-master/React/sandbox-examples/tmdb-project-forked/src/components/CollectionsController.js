import React, { Component } from "react";
import { Card, List, PageHeader, Typography } from "antd";
import {
  Route,
  Link,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import { paramsToString } from "./functions";
import { collections } from "./data";

import GridMovies from "./GridMovies";

/**
 * Image imports
 */
import colBest2019 from "/assets/collections/colBest2019.jpg";
import colBestDecade from "/assets/collections/colBestDecade.jpg";
import colBestFrench from "/assets/collections/colBestFrench.jpg";
import colBestHorror from "/assets/collections/colBestHorror.jpg";
import colBestScifi from "/assets/collections/colBestScifi.jpg";
import colBiggestBoxOfficeFlops from "/assets/collections/colBiggestBoxOfficeFlops.jpg";
import colLargestGrossing from "/assets/collections/colLargestGrossing.jpg";
import colMostPopularOnes from "/assets/collections/colMostPopularOnes.jpg";

const { Title } = Typography;

function CollectionsController() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:colId`} component={CollectionMovies} />
      <Route path={match.url} component={CollectionsGrid} />
    </Switch>
  );
}

class CollectionsGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: {
        colBest2019,
        colBestDecade,
        colBestFrench,
        colBestHorror,
        colBestScifi,
        colBiggestBoxOfficeFlops,
        colLargestGrossing,
        colMostPopularOnes,
      },
      collections,
    };
  }

  render() {
    return (
      <div
        style={{
          background: "#fff",
          padding: "2rem",
        }}
      >
        <Title level={2}>Collections</Title>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={this.state.collections}
          renderItem={(collection) => (
            <List.Item>
              <CollectionItem
                collection={collection}
                image={this.state.images[collection.id]}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function CollectionItem({ collection, image }) {
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
}

function CollectionMovies({ url, query_params }) {
  let { colId } = useParams();
  console.log(paramsToString(query_params));

  return (
    <>
      <PageHeader onBack={() => window.history.back()} title={colId} />
      <GridMovies url={url} />
    </>
  );
}

export default CollectionsController;
