#### Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such* that they add up to `target`.

#### You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

#### You can return the answer in any order.

<img width="445" alt="Screen Shot 2021-10-25 at 1 18 24 AM" src="https://user-images.githubusercontent.com/37787994/138659774-8fd1b20d-e798-431d-8771-870584e41d05.png">


1. Very straightforward O(n^2) solution
```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        for(let j = i + 1; j < nums.length; j++) {
            if(nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};
``` 


2. Hashmap O(n) solution

```JS
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// O(n) hashmap solution
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++) {
        if(map.has(target - nums[i])) {
            // map.get will get the 1st number index and current number index
            return [map.get(target - nums[i]), i];
        }
        // set the number and its index
        map.set(nums[i], i)
    }
    return [];
}
``` 
