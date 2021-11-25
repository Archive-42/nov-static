Array.prototype.myEach = function(callback) {
  for(let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
}

Array.prototype.myMap = function(callback) {
  let arr = [];
  for(let i = 0; i < this.length; i++) {
    arr.push(callback(this[i]));
  }
  return arr;
}

Array.prototype.myReduce = function (callback, acc) {
  let initial = 0;
  if (!acc) {
    acc = this[0];
    initial = 1;
  }
  for (let i = initial; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }
  return acc;
}