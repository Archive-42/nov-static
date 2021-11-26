import { useState } from "react";
import NavBarMainText from "../NavBarMainText";
import NavBarButtons from "../NavBarButtons";
import NavBarLogo from "../NavBarLogo";

const NavBar = () => {
  const buttonInfo = [
    { path: "/", label: "Home" },
    { path: "/sample", label: "Sample Survey" },
    { path: "/sensory", label: "Sensory Preferences" },
    { path: "/report", label: "Report" },
  ];

  const [data, setData] = useState("Home");

  return (
    <div className="navbar">
      <div style={{ display: "flex" }}>
        <div className="navbar-image">
          <NavBarLogo />
        </div>
        <div className="navbar-text" style={{ marginLeft: "100px" }}>
          <NavBarMainText />
          {data}
        </div>
      </div>
      <div
        className="navbar-buttons"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <NavBarButtons setData={setData} info={buttonInfo} />
      </div>
    </div>
  );
};

export default NavBar;
