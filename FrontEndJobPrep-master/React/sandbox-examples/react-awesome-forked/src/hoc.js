import React from "react";

class HocComponent extends React.Component {
  render() {
    // return "hello, hoc";
    return this.props.text;
  }
}

export { HocComponent };

export const toUpperCaseHoc = function (WrappedCompoent) {
  return class Hoc extends React.Component {
    render() {
      const { text } = this.props;
      const text2Upper = text.toUpperCase();
      return <WrappedCompoent text={text2Upper} />;
    }
  };
};
