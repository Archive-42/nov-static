import React from "react";

import * as d3 from "d3";

class Line extends React.Component {
  // 'types' can only be used in a .ts file.ts
  // propTypes: {
  //   path: React.PropTypes.string,
  //   stroke: React.PropTypes.string,
  //   fill: React.PropTypes.string,
  //   strokeWidth: React.PropTypes.number
  // },

  getDefaultProps() {
    return {
      stroke: "blue",
      fill: "none",
      strokeWidth: 1,
    };
  }

  render() {
    let { path, stroke, fill, strokeWidth } = this.props;
    return (
      <path d={path} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    );
  }
}

class DataSeries extends React.Component {
  // propTypes: {
  //   colors: React.PropTypes.func,
  //   data: React.PropTypes.object,
  //   interpolationType: React.PropTypes.string,
  //   xScale: React.PropTypes.func,
  //   yScale: React.PropTypes.func
  // },

  getDefaultProps() {
    return {
      data: [],
      interpolationType: "cardinal",
      // colors: d3.scale.category10()
      colors: d3.scaleOrdinal(d3.schemeCategory10),
    };
  }

  render() {
    let { data, colors, xScale, yScale, interpolationType } = this.props;

    let line = d3
      .line()
      .x((d) => {
        return xScale(d.x);
      })
      .y((d) => {
        return yScale(d.y);
      });
    // .curve(interpolationType);

    let color = d3.scaleOrdinal(d3.schemeCategory10);

    let lines = data.points.map((series, id) => {
      return <Line path={line(series)} stroke={color(id)} key={id} />;
    });

    return (
      <g>
        <g>{lines}</g>
      </g>
    );
  }
}

class LineChart extends React.Component {
  // propTypes: {
  //   width: React.PropTypes.number,
  //   height: React.PropTypes.number,
  //   data: React.PropTypes.object.isRequired
  // },

  getDefaultProps() {
    return {
      width: 600,
      height: 300,
    };
  }

  render() {
    let { width, height, data } = this.props;

    let xScale = d3
      // .scale
      // .ordinal()
      .scaleOrdinal()
      .domain(data.xValues)
      .range([0, width]);

    let yScale = d3
      .scaleLinear()
      .range([height, 10])
      .domain([data.yMin, data.yMax]);

    return (
      <svg width={width} height={height}>
        <DataSeries
          xScale={xScale}
          yScale={yScale}
          data={data}
          width={width}
          height={height}
        />
      </svg>
    );
  }
}

export { LineChart };
