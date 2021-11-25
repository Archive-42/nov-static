function range(start, end) {
  if (start + 1 === end) {
    return [start];
  } else {
    return [start].concat(range(start + 1, end));
  }
}

function sumRec(arr) {
  if (arr.length === 0) {
    return 0;
  } else {
    return arr[0] + sumRec(arr.slice(1));
  }
}

function exponent(base, exp) {
  if (exp === 0) {
    return 1;
  } else {
    return base * exponent(base, exp - 1);
  }
}

function exponent2(base, exp) {
  if (exp === 0) {
    return 1;
  } else if (exp === 1) {
    return base;
  } else if (exp % 2 === 0) {
    return exponent2(base, exp / 2) ** 2;
  } else {
    return base * exponent2(base, (exp - 1) / 2) ** 2;
  }
}

let arr = [1, 2, 3];
function fibonacci(n) {
  if (n === 1) {
    return [0, 1];
  } else {
    let fibs = fibonacci(n - 1);
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
    return fibs;
  }
}

function deepDup(arr) {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      ans.push(deepDup(arr[i]));
    } else {
      ans.push(arr[i]);
    }
  }
  return ans;
}

function bsearch(arr, target) {
  if (arr.length === 0) {
    return -1;
  } else if (arr[0] != target && arr.length === 1) {
    return -1;
  }
  // debugger
  let mid = Math.floor(arr.length / 2);
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] > target) {
    return bsearch(arr.slice(0, mid), target);
  } else {
    let answer = bsearch(arr.slice(mid + 1, arr.length + 1), target);
    if (answer >= 0) {
      return mid + 1 + bsearch(arr.slice(mid + 1, arr.length + 1), target);
    } else {
      return -1;
    }
  }
}

// bsearch([1, 2, 3, 4, 5], 4)

function mergesort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = mergesort(arr.slice(0, mid));
  let right = mergesort(arr.slice(mid, arr.length));
  return myMerge(left, right);
}
function myMerge(arr1, arr2) {
  if (arr1.length === 0) {
    return arr2;
  } else if (arr2.length === 0) {
    return arr1;
  } else {
    if (arr1[0] < arr2[0]) {
      return [arr1[0]].concat(myMerge(arr1.slice(1), arr2));
    } else {
      return [arr2[0]].concat(myMerge(arr1, arr2.slice(1)));
    }
  }
}
// mergesort([6, 3, 1])

function subsets(arr) {
  if (arr.length === 0) {
    return [[]];
  } else {
    let subs = subsets(arr.slice(1));

    return subs.concat(subs.myMap((subarr) => subarr.concat(arr[0])));
  }
}

// subsets([0, 1, 2])
