import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CollectionMovies from "./components/CollectionMovies";
import CollectionsGrid from "./components/CollectionsGrid";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import SearchController from "./components/SearchController";

const { Content, Footer } = Layout;

const App = () => (
  <Router>
    <Layout className="layout">
      <NavBar />
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/collections/:colId"
            component={CollectionMovies}
          />
          <Route exact path="/collections/" component={CollectionsGrid} />
          <Route exact path="/search" component={SearchController} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>&copy; 2021 ·bgoonz</Footer>
    </Layout>
  </Router>
);

export default App;
