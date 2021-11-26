import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar, Footer, AppContextProvider } from "./components";
import {
  BodyTextHome,
  BodyTextReport,
  BodyTextSample,
  BodyTextSensory,
} from "./components/BodyComponents";

const App = () => {
  return (
    <div style={{ width: "75%", margin: "auto", marginTop: "150px" }}>
      <AppContextProvider>
        <BrowserRouter>
          <div>
            <NavBar />
          </div>
          <Switch>
            <Route path="/sample">
              <BodyTextSample />
            </Route>
            <Route path="/report">
              <BodyTextReport />
            </Route>
            <Route path="/sensory">
              <BodyTextSensory />
            </Route>
            <Route exact path="/">
              <BodyTextHome />
            </Route>
          </Switch>
          <div>
            <Footer />
          </div>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
};

export default App;
