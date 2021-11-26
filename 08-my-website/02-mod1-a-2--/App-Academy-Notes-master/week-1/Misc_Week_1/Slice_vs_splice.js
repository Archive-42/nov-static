
2020 - 08 - 13 - 20 - 57 - 37.png






/*1. The splice() method returns the removed item(s) in an array and slice() method returns the selected element(s) in an array, as a new array object.

2. The splice() method changes the original array and slice() method doesn’t change the original array. (splice mutates, slice does not)

3. The splice() method can take an unlimited (n) number  of arguments:

Argument 1: Index, Required.An integer that specifies at what position to add / remove items, Use negative values to specify the position from the end of the array.

    Argument 2: Optional.The number of items to be removed.If set to 0(zero), no items will be removed.And if not passed, all item(s) from provided index will be removed.

        Argument 3…n: Optional.The new item(s) to be added to the array.
*/


let array = [1, 2, 3, 4, 5];
console.log(array.splice(2));
// shows [3, 4, 5], returned removed item(s) as a new array object.

console.log(array);
// shows [1, 2], original array altered.

let array2 = [6, 7, 8, 9, 0];
console.log(array2.splice(2, 1));
// shows [8]

console.log(array2.splice(2, 0));
//shows [] , as no item(s) removed.

console.log(array2);
// shows [6,7,9,0]

let array3 = [11, 12, 13, 14, 15];
console.log(array3.splice(2, 1, "Hello", "World"));
// shows [13]

console.log(array3);
// shows [11, 12, "Hello", "World", 14, 15]
/*
negative indexing illustration:
-5 - 4 - 3 - 2 - 1
    |  |  |  |  |
    let array4 = [16, 17, 18, 19, 20];
             |  |  |  |  |
    0  1  2  3  4
*/
console.log(array4.splice(-2, 1, "me"));
// shows  [19]

console.log(array4);
// shows [16, 17, 18, "me", 20]


//If Argument(1) is NaN, it is treated as if it were 0.


let array5 = [21, 22, 23, 24, 25];
console.log(array5.splice(NaN, 4, "NaN is Treated as 0"));
// shows [21,22,23,24]

console.log(array5);
// shows ["NaN is Treated as 0",25]
//If Argument(2) is less than 0 or equal to NaN, it is treated as if it were 0.


let array6 = [26, 27, 28, 29, 30];
console.log(array6.splice(2, -5, "Hello"));
// shows []

console.log(array6);
// shows [26,27,"Hello",28,29,30]

console.log(array6.splice(3, NaN, "World"));
// shows []

console.log(array6);
// shows [26,27,"Hello","World",28,29,30]



//If Argument(1) or Argument(2) is greater than Array’s length, either argument will use the Array’s length.


let array7 = [31, 32, 33, 34, 35];
console.log(array7.splice(23, 3, "Add Me"));
// shows []

console.log(array7);
// shows [31,32,33,34,35,"Add Me"]

console.log(array7.splice(2, 34, "Add Me Too"));
// shows [33,34,35,"Add Me"]

console.log(array7);
// shows [31,32,"Add Me Too"]
//4. The slice() method can take 2 arguments:
/*
Argument 1: Required.An integer that specifies where to start the selection(The first element has an index of 0).Use negative numbers to select from the end of an array.

    Argument 2: Optional.An integer that specifies where to end the selection.If omitted, all elements from the start position and to the end of the array will be selected.Use negative numbers to select from the end of an array.
*/

let array = [1, 2, 3, 4, 5]
console.log(array.slice(2));
// shows [3, 4, 5], returned selected element(s).

console.log(array.slice(-2));
// shows [4, 5], returned selected element(s).
console.log(array);
// shows [1, 2, 3, 4, 5], original array remains intact.

let array2 = [6, 7, 8, 9, 0];
console.log(array2.slice(2, 4));
// shows [8, 9]

console.log(array2.slice(-2, 4));
// shows [9]

console.log(array2.slice(-3, -1));
// shows [8, 9]

console.log(array2);
// shows [6, 7, 8, 9, 0]

//If either argument is NaN, it is treated as if it were 0.

let array3 = [11, 12, 13, 14, 15];
console.log(array3.slice(NaN, NaN));
// shows []

console.log(array3.slice(NaN, 4));
// shows [11,12,13,14]

console.log(array3);
// shows [11,12,13,14,15]



//If either argument is greater than the Array’s length, either argument will use the Array’s length


let array4 = [16, 17, 18, 19, 20];
console.log(array4.slice(23, 24));
// shows []

console.log(array4.slice(23, 2));
// shows []

console.log(array4.slice(2, 23));
// shows [18,19,20]

console.log(array4);
// shows [16,17,18,19,20]
