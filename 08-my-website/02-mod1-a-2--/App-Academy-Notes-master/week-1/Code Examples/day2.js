// function isFive(num) {
// if (num ===5){
// return ture;
// }
//   else {
//     return false;
//   }
// }

// //console.log(isFive(5)); // => true
// console.log(isFive(13)); // => false



// function logBetween(lowNum,highNum){
//     for (let i = lowNum; i <= highNum ; i += 1){
//       console.log(i);
//     }


// }






//     logBetween(14, 6);




    // function printFives(max){
    //     for (let i = 0; i<= max ; i++){
    //       if (i % 5 === 0){

    //         console.log(i);

    //       }

    //     }


    //     }
    //     printFives(20) // prints out:



    //     function logBetweenStepper(min, max, step){
    //         for (let i = min; i<= max ; i += step){
    //           if (i <= max){

    //             console.log(i);

    //           }



    // }
    // }
    // // Examples:
    // logBetweenStepper(5, 9, 1); // prints out:



    // function countVowels(word) {
    //     let vCount =0;
    //      for (let i=0 ; i <= word.length -1 ; i++){
    //           if (word.charAt(i) == "a" || word.charAt(i) == "e" || word.charAt(i) == "i" || word.charAt(i) == "o" || word.charAt(i) == "u") {
    //           vCount += 1;
    //      }


    //      }

    //       return vCount;

    //     };






        // Is Substring
        // So far you've learned how to write your own loops but there are some methods that will iterate for you.
        //  One such method is the String#indexOf() method.

        // Write a function isSubstring that takes in two strings,
        // searchString and subString.
        // The function should return true if subString is a part of thesearchString,
        // regardless of upper or lower case, and false if otherwise.

        function isSubstring(searchString, subString) {
            let lowerSearchStr = searchString.toLowerCase();
            let lowerSubStr = subString.toLowerCase();
            return lowerSearchStr.indexOf(lowerSubStr) !== -1;

          }

          console.log(isSubstring("The cat went to the store", "he cat went")); // => true
          console.log(isSubstring("Time to program", "time")); // => true
          console.log(isSubstring("Jump for joy", "joys")); // => false
