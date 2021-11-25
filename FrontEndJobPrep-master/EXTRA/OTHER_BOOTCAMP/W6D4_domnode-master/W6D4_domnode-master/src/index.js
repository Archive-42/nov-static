const DOMNodeCollection = require("./dom_node_collection");

function $l(selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    const NodeList = document.querySelectorAll(selector);
    let array = Array.from(NodeList);
    return new DOMNodeCollection(array);
  }
}

window.$l = $l;
