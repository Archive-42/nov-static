"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//! Single Linked List
var Node = function Node(val) {
  _classCallCheck(this, Node);

  this.value = val;
  this.next = null;
};

var LinkedList =
/*#__PURE__*/
function () {
  function LinkedList() {
    _classCallCheck(this, LinkedList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(LinkedList, [{
    key: "addToTail",
    value: function addToTail(val) {
      var newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }

      this.tail = newNode;
      this.length++;
      return this;
    }
  }, {
    key: "removeTail",
    value: function removeTail() {
      if (!this.head) return undefined;
      var current = this.head;
      var newTail = current;

      while (current.next) {
        newTail = current;
        current = current.next;
      }

      this.tail = newTail;
      this.tail.next = null;
      this.length--;

      if (this.length === 0) {
        this.head = null;
        this.tail = null;
      }

      return current;
    }
  }, {
    key: "addToHead",
    value: function addToHead(val) {
      var newNode = new Node(val);

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }

      this.length++;
      return this;
    }
  }, {
    key: "removeHead",
    value: function removeHead() {
      if (!this.head) return undefined;
      var currentHead = this.head;
      this.head = currentHead.next;
      this.length--;

      if (this.length === 0) {
        this.tail = null;
      }

      return currentHead;
    }
  }, {
    key: "contains",
    value: function contains(target) {
      var node = this.head;

      while (node) {
        if (node.value === target) return true;
        node = node.next;
      }

      return false;
    }
  }, {
    key: "get",
    value: function get(index) {
      if (index < 0 || index >= this.length) return null;
      var counter = 0;
      var current = this.head;

      while (counter !== index) {
        current = current.next;
        counter++;
      }

      return current;
    }
  }, {
    key: "set",
    value: function set(index, val) {
      var foundNode = this.get(index);

      if (foundNode) {
        foundNode.value = val;
        return true;
      }

      return false;
    }
  }, {
    key: "insert",
    value: function insert(index, val) {
      if (index < 0 || index > this.length) return false;
      if (index === this.length) return !!this.addToTail(val);
      if (index === 0) return !!this.addToHead(val);
      var newNode = new Node(val);
      var prev = this.get(index - 1);
      var temp = prev.next;
      prev.next = newNode;
      newNode.next = temp;
      this.length++;
      return true;
    }
  }, {
    key: "remove",
    value: function remove(index) {
      if (index < 0 || index >= this.length) return undefined;
      if (index === 0) return this.removeHead();
      if (index === this.length - 1) return this.removeTail();
      var previousNode = this.get(index - 1);
      var removed = previousNode.next;
      previousNode.next = removed.next;
      this.length--;
      return removed;
    }
  }, {
    key: "size",
    value: function size() {
      return this.length;
    }
  }]);

  return LinkedList;
}();

exports.Node = Node;
exports.LinkedList = LinkedList;
