Array.prototype.bubbleSort = function () {
  const sorted_arr = this.slice();
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i] > sorted_arr[i + 1]) {
        [sorted_arr[i], sorted_arr[i + 1]] = [sorted_arr[i + 1], sorted_arr[i]];
        sorted = false;
      }
    }
  }
  return sorted_arr;
};

String.prototype.substrings = function () {
  let subs = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length + 1; j++) {
      subs.push(this.slice(i, j));
    }
  }
  return subs;
};
