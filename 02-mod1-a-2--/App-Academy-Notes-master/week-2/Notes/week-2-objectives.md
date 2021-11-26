# Monday ------------------------------------------------------------

## **Objectives**

## **Running JS Locally**

- **Match the commands `ls, cd, pwd` to their descriptions**

  - **`ls`** : lists all files and subdirectories in the current directory.
  - **`cd [path]`** : changes the current directory to the directory specified by the _path_ argument.
  - **`pwd`** : The present working directory command lists the path from your current location starting from root.

- **Given a folder structure diagram, a list of 'cd (path)' commands and target files, match the paths to the target files.**

  ![pic of file tree](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Module-JavaScript/js-local/rose-file-structure.png)
  **Referencing the above file structure - if you are currently in the Notes directory what would running the command pwd return?**

  - `/Desktop/Homework/Notes`

* **Use VSCode to create a folder. Within the folder create a .js file containing console.log('hello new world'); and save it.**

  - **`Manually`**:
  - To manually create a folder in VSCode, click the 'new folder' button.
  - To create a file within that folder, click on the folder to enter it, and then selected 'new file' to create a file (you can change the type of file it is by appending the correct ext. type)

  - **`Via Terminal`**
  - Use mkdir to create a folder.
  - cd to your new folder.
  - use touch command to create a js file.
  - use code . command to open VSCode with your pwd.

* **Use node to execute a JavaScript file in the terminal**
  - Type in **`node <fileName.js>`** into your terminal to execute.

---

# Tuesday -----------------------------------------------------------

# **Objectives**

## **POJO (Plain Old Javascript)**

- **Label variables as either `Primitive` vs. `Reference`**

  - **Primitive** : Boolean, Null, Undefined, Number, String.
  - **Reference** : Object (Arrays are a type of object)
  - Remember that **primitive** types are immutable!

- **Identify when to use `.` vs `[]` when accessing values of an object**

  - **When accessing object keys**: Bracket notation needs to refer to that key in quotations, dot notation doesn't.

  - **When accessing object keys via a variable**: Bracket notation can refer to that key w/o use of quotations, dot notation can't do this at all.

  - Choose the square bracket when the property name is determined at runtime, or if the property name is not a valid identifier.

  - Choose the dot property acccesor when the property name is known ahead of time.

- **Use the `obj[key] !== undefined` pattern to check if a given variable that contains a key exists in an object**

  ```js
  function keyInObjectArray(objArray, keyString) {
  for (let i = 0; i < objArray.length; i++) {
    let obj = objArray[i];
    if (obj[keyString] !== undefined) {
      return true;
    }
  }
  return false;
  ```

- **Utilize `Object.keys` and `Object.values` in a function**
  ```js
  function breakDownObj(obj) {
  	return [...Object.keys(obj), ...Object.values(obj)];
  }
  ```
- **Iterate through an object using a for in loop**
  ```js
  function appleCounter(appleObj) {
  	let counter = 0;
  	for (let key in appleObj) {
  		let mini = key.toLowerCase();
  		if (mini.includes("apple")) {
  			counter++;
  		}
  	}
  	return counter;
  }
  ```

* **Define a function that utilizes `...rest syntax` to accept an arbitrary number of arguments**

  ```js
  function restSum(...nums) {
  	return [...nums].reduce((a, b) => a + b);
  }
  ```

* **Use `...spread syntax` for Object literals and Array literals**
  ```js
  function spreadItOut(array1, array2) {
  	return [...array1, ...array2];
  }
  ```

- **Destructure an array to reference specific elements**

  ```js
  let bigArray = ["apple", 14, 32, 100, { name: "party" }, ["pineapple"]];

  [fruit, num1, num2, num3, party, pineapple] = bigArray;
  ```

* **Destructure an object to reference specific values**
  ```js
  let mario = {
  	name: "mario",
  	profession: "plumber",
  	siblings: {
  		name: "Luigi",
  		fears: "ghosts",
  	},
  };
  ```
  ```js
  let {
  	siblings: { fears },
  } = mario;
  ```
* **Write a function that accepts a array as an argument and returns an object representing the count of each character in the array**
  ```js
  function stringConverter(string) {
  	let count = {};
  	for (let i = 0; i < string.length; i++) {
  		let char = string[i];
  		if (count[char] === undefined) {
  			count[char] = 1;
  		} else {
  			count[char]++;
  		}
  	}
  	return count;
  }
  ```

---

# Wednesday ---------------------------------------------------------

# **Objectives**

## **Callbacks**

Given multiple plausible reasons, identify why functions are called “First Class Objects” in JavaScript.
Given a code snippet containing an anonymous callback, a named callback, and multiple console.logs, predict what will be printed
Write a function that takes in a value and two callbacks. The function should return the result of the callback that is greater.
Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#map.
Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#filter.
Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#every.

// 1. Given multiple plausible reasons, identify why functions are called "First Class Objects" in JavaScript.
// Here are some of the reasons:
// A function is an instance of the Object type
// You can store the function in a variable
let negate = function (num) {
return num _ -1;
};
// You can pass the function as a parameter to another function
function player(callback) {
console.log('Lebron');
callback();
}
player(function () {
console.log('Los Angeles');
});
// You can return the function from a function
function sport() {
return (function team() {
return "I'm a returned function"
})
}
let newFunc = sport();
console.log(newFunc())
// 2. Given a code snippet containing an anonymous callback, a named callback, and multiple console.logs, predict what will be printed
function player(callback) {
console.log('Lebron');
callback();
}
function sport() {
console.log('Basketball');
}
const teamInfo = function () {
console.log('Lakers');
sport();
player(sport);
player(function () {
console.log('Los Angeles');
});
console.log('California');
};
teamInfo();
// 3. Write a function that takes in a value and two callbacks. The function should return the result of the callback that is greater.
function greaterValue(value, cb1, cb2) {
// compare cb1 invoked with value to cb2 invoked with value
// return the greater result
let res1 = cb1(value);
let res2 = cb2(value);
if (res1 > res2) {
// if this is false, we move out of if statement
return res1;
}
return res2;
}
let negate = function (num) {
return num _ -1;
};
let addOne = function (num) {
return num + 1;
};
console.log(greaterValue(3, negate, addOne));
console.log(greaterValue(-2, negate, addOne));
// 4. Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#map.
function myMap(arr, callback) {
// iterate through the array, perform the cb on each element
// return a new array with those new values
let mapped = [];
for (let i = 0; i < arr.length; i++) {
// remember that map passes three args with each element.
let val = callback(arr[i], i, arr);
mapped.push(val);
}
return mapped;
}
let double = function (num) {
return num _ 2;
};
console.log(myMap([1, 2, 3], double));
// 5. Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#filter.
function myFilter(arr, callback) {
let filtered = [];
for (let i = 0; i < arr.length; i++) {
let element = arr[i];
if (callback(element, i, arr)) {
filtered.push(element);
}
}
return filtered;
}
// 6. Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of Array#every.
function myEvery(arr, callback) {
for (let i = 0; i < arr.length; i++) {
let element = arr[i];
if (callback(element, i, arr) === false) {
return false;
}
}
return true;
}
// Initialize calculation functions to variables to put in array.
let add = function (n1, n2) {
return n1 + n2;
};
let subtract = function (n1, n2) {
return n1 - n2;
};
let multiply = function (n1, n2) {
return n1 _ n2;
};
let divide = function (n1, n2) {
return n1 / n2;
};
let mod = function (n1, n2) {
return n1 % n2;
};
let isDivisible = function (n1, n2) {
if (mod(n1, n2) === 0) {
return true;
}
return false;
};
// Initialize array containing calculation functions
let funcArray = [add, subtract, multiply, divide, mod, isDivisible];
// Initialize function taking two numbers and an array
// of functions as parameters
let calculateAll = function (n1, n2, arrayOfFuncs) {
let ansArray = [];
arrayOfFuncs.forEach(function (callback) {
ansArray.push(callback(n1, n2));
});
return ansArray;
};
// Initialize a function taking two numbers, an array
// of functions, and a users choice of which to call
// as parameters
let calculateChosen = function (n1, n2, arrayOfFuncs, choice) {
return arrayOfFuncs[choice](n1, n2);
};
// Call the function, passing in 10, 2, and an
// array of functions
console.log(calculateAll(10, 2, funcArray));
// Call the function, passing in 10, 2, and the
// users choice of operation
console.log(calculateChosen(10, 2, funcArray, 1));

# Thursday ---------------------------------------------------------

# **Objectives**

## **Scope Lesson**

Identify the difference between const, let, and var declarations
Explain the difference between const, let, and var declarations
Predict the evaluation of code that utilizes function scope, block scope, lexical scope, and scope chaining
Define an arrow function
Given an arrow function, deduce the value of this without executing the code
Implement a closure and explain how the closure effects scope
Define a method that references this on an object literal
Utilize the built in Function#bind on a callback to maintain the context of this
Given a code snippet, identify what this refers to
