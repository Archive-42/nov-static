import AppContext from "../../context/AppContext";
// import sampleData from "./data/sample.json";
// import bonusData from "./data/bonus.json";
// import spiData from "./data/spi.json";

const AppContextProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export default AppContextProvider;
