import React, { useState } from "react";
import PropTypes from "prop-types";
import "./caraousel.css";
import CarouselImage from "../caraousel-image/CarouselImage";
import useRect from "../hooks/useRect";
import SlideIndicator from "../slide-indicator/SlideIndicator";
import useInterval from "../hooks/useInterval";

export default function Caraousel(props) {
  let data = props.data;

  const [rects, wrapperRef] = useRect();
  const [total] = useState(20);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoPlay] = useState(true);
  // const [delay, setDelay] = useState(2000);

  //console.log(`Current is ${current}`);

  // const decrement = current => {
  //   // console.log(`Current is ${current}`);
  //   let newVal = current - 1;
  //   // console.log(`New Value 1 is ${newVal}`);
  //   if (newVal < 0) {
  //     newVal = total + newVal;
  //   }

  //   // console.log(`New Values is ${newVal}`);
  //   setCurrent(newVal);
  // };

  const increment = current => {
    let newVal = current + 1;
    if (newVal >= 20) {
      newVal = newVal - total;
    }

    setCurrent(newVal);
  };

  //  const handleIncrement = useCallback(() => increment(current), []);

  useInterval(
    () => {
      increment(current);
    },
    autoplay && props.autoplay ? props.slideshowDelay : null
  );

  //console.log(rects);

  return (
    <React.Fragment>
      <div
        className="slide-show-container"
        ref={wrapperRef}
        style={{
          "--slider-height": props.sliderHeightInpx
            ? props.sliderHeightInpx + "px"
            : "400px"
        }}
      >
        {data.map((item, idx) => {
          //console.log(`Current is ${current}`);
          let selected = idx === current ? "selected" : "";
          let distance = idx - current;
          let newPostion = `${distance * (rects && rects.width)}px`;
          return (
            <div
              id={`car-img-${idx}`}
              className={`slide ${selected}`}
              key={idx}
              style={{
                left: newPostion
              }}
              onClick={() => {
                window.open(item.target);
              }}
            >
              <CarouselImage
                imageCaptionStyle={props.imageCaptionStyle}
                data={item}
                active={current === idx}
                titleVisible={props.titleVisible}
                excerptVisible={props.excerptVisible}
              />
            </div>
          );
        })}
        {props.indicatorVisible && (
          <SlideIndicator
            count={total}
            active={current}
            onSelect={newCurrent => {
              setAutoPlay(false);
              setCurrent(newCurrent);
              /**
               * Since user has chose a particular slide, this module
               * gives user some time to review that slide before starting
               * autoplay again after 5 seconds.
               */
              setTimeout(() => setAutoPlay(true), 5000);
            }}
            color="white"
          />
        )}
      </div>

      {/* <span
        id="car-nav-prev"
        className="car-nav"
        onClick={() => decrement(current)}
      >
        {" "}
      </span>
      <span
        id="car-nav-next"
        className="car-nav"
        onClick={() => increment(current)}
      >
        {" "}
      </span> */}
    </React.Fragment>
  );
}

Caraousel.propTypes = {
  autoplay: PropTypes.bool.isRequired,
  indicatorColor: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired
    })
  ),
  titleVisible: PropTypes.bool.isRequired,
  excerptVisible: PropTypes.bool.isRequired,
  indicatorVisible: PropTypes.bool.isRequired,
  sliderHeightInpx: PropTypes.number.isRequired,
  imageCaptionstyle: PropTypes.object
};

Caraousel.defaultProps = {
  autoplay: true,
  indicatorColor: "white",
  data: (function() {
    let data = new Array(20).fill(0);
    data = data.map((image, index) => {
      return {
        image: `https://picsum.photos/seed/${index + 1}/800/450`,
        id: index,
        title: "This is Sample Title",
        excerpt:
          "This is a sample excerpt.This is a sample excerpt.This is a sample excerpt.This is a sample excerpt.",
        target: `http://${index}.com`
      };
    });
    return data;
  })(),
  titleVisible: true,
  excerptVisible: true,
  indicatorVisible: true,
  sliderHeightInpx: 400,
  slideshowDelay: 3000,
  imageCaptionstyle: {}
};
