Array.prototype.uniq = function() {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
}

Array.prototype.twoSum = function () {
  let ans = [];
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === 0) {
        ans.push([i,j]);
      }
    }
  }
  return ans;
}

Array.prototype.transpose = function() {
  let ans = [];

  for (let index = 0; index < this[0].length; index++) {
    let subarr = [];
      for (let sub = 0; sub< this.length; sub++) {
        subarr.push(this[sub][index]);
      }
    ans.push(subarr);
  }
  return ans;
}