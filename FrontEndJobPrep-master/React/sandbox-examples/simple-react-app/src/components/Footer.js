import React, { Component } from "react";
// import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="container-fluid bg-dark text-white mt-5 ">
        <div className="container">
          <div className="row py-3">
            <div className="col-md-6 text-left">
              Designed by{" "}
              <a href="#" target="_blank">
                Develop
              </a>
              &#169; {new Date().getFullYear()}
            </div>
            <div className="col-md-6 text-right">
              <div>
                <span>Follow Us: </span>
                <a href="#" target="_blank">
                  <i className="fab fa-facebook-f px-3" />
                </a>
                <a href="#" target="_blank">
                  <i className="fab fa-twitter pr-3" />
                </a>
                <a href="#" target="_blank">
                  <i className="fab fa-youtube pr-3" />
                </a>
                <a href="#" target="_blank">
                  <i className="fab fa-github pr-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
