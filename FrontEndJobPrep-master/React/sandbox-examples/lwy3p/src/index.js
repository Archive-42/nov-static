import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "./index.css";

class ReactSlickDemo extends React.Component {
  render() {
    var settings = {
      dots: true,
    };
    return (
      <div className="container">
        <Slider {...settings}>
          <div>
            <img src="https://github.com/bgoonz/BGOONZ_BLOG_2.0/blob/master/static/images/cool%20annimation.gif?raw=true" />
          </div>
          <div>
            <img src="https://github.com/bgoonz/BGOONZ_BLOG_2.0/blob/master/static/images/sine-wav-bak.gif?raw=true" />
          </div>
          <div>
            <img src="https://github.com/bgoonz/BGOONZ_BLOG_2.0/blob/master/static/images/green-spruce.png?raw=true" />
          </div>
          <div>
            <img src="https://github.com/bgoonz/BGOONZ_BLOG_2.0/blob/master/static/images/mini-logo.png?raw=true" />
          </div>
        </Slider>
      </div>
    );
  }
}

ReactDOM.render(<ReactSlickDemo />, document.getElementById("container"));
