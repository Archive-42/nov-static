const romanConverter = (numString) => {
  var nums = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };
  var result = "";
  var keys = Object.keys(nums);
  var i = keys.length - 1;

  while (i >= 0) {
    var int = keys[i];
    while (numString >= parseInt(int)) {
      numString -= int;
      result += nums[int];
    }
    i--;
  }
  return result;
};

export default romanConverter;
