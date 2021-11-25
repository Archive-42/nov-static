import React from "react";
import PropTypes from "prop-types";

import "./CarouselImage.scss";

export default function CarouselImage(props) {
  return (
    <div className="slide-image-container">
      <img className="slide-image" src={props.data.image} alt="sample" />
      <div
        className={`image-caption ${props.active ? "active" : ""}`}
        style={props.imageCaptionStyle}
      >
        <a href={props.target}>
          {props.titleVisible && <h2>{props.data.title}</h2>}
          {props.excerptVisible && <p>{props.data.excerpt}</p>}
        </a>
      </div>
    </div>
  );
}

CarouselImage.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired
  }),
  titleVisible: PropTypes.bool.isRequired,
  excerptVisible: PropTypes.bool.isRequired,
  imageCaptionStyle: PropTypes.object
};
