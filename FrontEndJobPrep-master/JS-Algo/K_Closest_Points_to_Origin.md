### Given an array of _points_ where _points[i] = [xi, yi]_ represents a point on the X-Y plane and an integer k, return the k closest points to the origin _(0, 0)_.

### The distance between two points on the X-Y plane is the Euclidean distance _(i.e., √(x1 - x2)2 + (y1 - y2)2)._

### You may return the answer in any order. The answer is _guaranteed to be unique (except for the order that it is in)_.

<img width="658" alt="Screen Shot 2021-09-20 at 12 34 42 AM" src="https://user-images.githubusercontent.com/37787994/133969325-41c749e7-3f41-4bb5-8998-1f5a87bd3bf9.png">

_Simplest O(nlogn) answer, we sort the array, and then use slice to pick the nearst_

```Javascript
/*
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]

After the formular is [18 26 20], sort the order to become [18, 20, 26]
Accordingly, it becomes [[3,3],[-2,4],[5,-1]], pick the first two, the answer is [[3,3],[-2,4]]
*/
var kClosest = function(points, K) {
    points.sort((a,b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]))

    return points.slice(0,K)
};
```
