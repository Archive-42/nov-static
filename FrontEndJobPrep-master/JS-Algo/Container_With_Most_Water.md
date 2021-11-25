### Given n non-negative integers _a1, a2, ..., an_ , where each represents a point at coordinate _(i, ai)_. n vertical lines are drawn such that the two endpoints of the line _i_ is at _(i, ai) and (i, 0)._ Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

_Notice that you may not slant the container._

<img width="654" alt="Screen Shot 2021-09-17 at 12 02 00 AM" src="https://user-images.githubusercontent.com/37787994/133739071-ac21f73b-edc2-47cc-af4a-4c72dfe3d98e.png">

```Javascript
/**
 * @param {number[]} height
 * @return {number}
 */
 /*
 Time complexity : O(n). Single pass.

Space complexity : O(1). Constant space is used.
Two pointer Yeah!!
 */
var maxArea = function(height) {
    let l = 0, r = height.length - 1, area = 0;
    while(l < r) {
        area = Math.max(area, Math.min(height[l], height[r]) * (r - l));
        if(height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }
    return area;
};
```
