import { NavLink } from "react-router-dom";
const buttonStyle = {
  margin: "5px",
  textDecoration: "none",
};
const divStyle = {
  background: "lightgrey",
  borderRadius: "5px",
  margin: "5px",
};

const NavBarButtons = ({ info, setData }) => {
  return (
    <>
      {info.map(({ path, label }) => (
        <div style={divStyle} key={path}>
          <NavLink
            onClick={(e) => setData(e.target.innerHTML)}
            to={path}
            style={buttonStyle}
          >
            {label}
          </NavLink>
        </div>
      ))}
    </>
  );
};

export default NavBarButtons;
