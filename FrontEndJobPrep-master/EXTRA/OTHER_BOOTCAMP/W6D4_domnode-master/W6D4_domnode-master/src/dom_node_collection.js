class DOMNodeCollection {
  constructor(array) {
    this.htmlEls = array;
  }

  html(string) {
    if (!string) {
      return this.htmlEls[0].innerHTML;
    } else {
      this.htmlEls.forEach((el) => {
        el.innerHTML = string;
      });
    }
  }

  empty() {
    this.htmlEls.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(elements) {
    if (elements instanceof DOMNodeCollection) {
      this.htmlEls.forEach((node) => {
        elements.forEach((el) => {
          node.innerHTML += el.outerHTML;
        });
      });
    } else {
      this.htmlEls.forEach((node) => {
        node.innerHTML += elements.outerHTML;
      });
    }
  }

  attr(attribute, value) {}

  addClass() {}

  removeClass() {}
}

module.exports = DOMNodeCollection;
