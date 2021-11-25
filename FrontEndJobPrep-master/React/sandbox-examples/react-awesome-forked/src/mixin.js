import React from "react";
// import { decorate as mixin } from "react-mixin";
import { render } from "react-dom";
import createReactClass from "create-react-class";

// class FooComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

const propsMixin = {
  getDefaultProps: () => {
    return {
      name: "foo"
    };
  }
};

const propsMixin2 = {
  getDefaultProps: () => {
    return {
      // name: "foo2"   // Invariant Violation, Tried to merge two objects with the same key
      title: "ftile"
    };
  }
};

const FooComponent = createReactClass({
  mixins: [propsMixin, propsMixin2],
  // getDefaultProps: function() {
  //   return {
  //     name: "thom"
  //   };
  // },
  render: function() {
    return <h1>Hello props, {this.props.name}</h1>;
  }
});

export { FooComponent };

// implement mixin with js
const mixinjs = function(obj, mixins) {
  const newObj = obj;
  if (obj == null || obj.prototype == null) {
    return newObj;
  }
  newObj.prototype = Object.create(obj.prototype);
  for (let prop in mixins) {
    if (mixins.hasOwnProperty(prop)) {
      newObj.prototype[prop] = mixins[prop];
    }
  }

  return newObj;
};

const manMixins = {
  speak: function() {
    console.log("I'm " + this.name);
  }
};

const Man = function() {
  this.name = "wang";
};

const manCanSpeak = mixinjs(Man, manMixins);

const man = new manCanSpeak();

man.speak();
