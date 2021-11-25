### Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in _any order_.

### A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

<img width="541" alt="Screen Shot 2021-09-24 at 9 38 24 PM" src="https://user-images.githubusercontent.com/37787994/134758302-714ba1dd-6ef1-4c91-8e03-eeef2a2a76c0.png">


**Complexity can't possibly be below 4^n, since there are up to 4^n outputs for input of length n.**

```JS
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl', 
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    
    // we need this, otherwise cannot pass "" case,
    // where expected is [], we output [""]
    if(!digits.length) return [];
    const res = [];
    
    function dfs(s, i) {
        if(i === digits.length) {
            res.push(s);
            return;
        }
        // For example, digits is "23"
        // map[digits[i]] = map[digits[0]] = 'abc'
        // letter traverse abc, get a, b, c in each iteration
        for(let letter of map[digits[i]]) {
            // s + current letter, i + 1 move to next digits
            dfs(s + letter, i + 1)
        }
    }
    
    // initialize to empty and 0 index
    dfs('', 0);
    return res;
};
```
