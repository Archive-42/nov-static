import React from "react";
import "./SlideIndicator.scss";

function SlideIndicator({ count, active, onSelect, color }) {
  let indicators = new Array(count).fill("");

  return (
    <React.Fragment>
      <div
        className="indicator-container"
        style={{
          "--color": color
        }}
      >
        {indicators.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`indicator-box ${active === idx ? "active" : ""}`}
              onClick={() => {
                onSelect(idx);
              }}
            >
              <div className="indicator" />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SlideIndicator;
