### Given _n_ pairs of parentheses, write a function to _generate all combinations of well-formed parentheses_.

---

**Example 1:**  
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

**Example 2:**  
Input: n = 1
Output: ["()"]

---

```
3 3 => 2 3 => 1 3 => 0 3 => 0 2 => 0 1 => 0 0  res: ['((()))']
1 3 => 1 2 => 0 2 => 0 1 => 0 0 res: ['((()))', '(()())']
1 2 => 1 1 => 0 1 => 0 0  res: ['((()))', '(()())', '(())()']
1 1 => 1 0 RETURN because l > r, not a parenthesis

2 3 => 2 2 => 1 2 => 0 2 => 0 1 => 0 0  res: ['((()))', '(()())', '(())()', '()(())']
1 2 => 1 1 => 0 1 => 0 0  res: ['((()))', '(()())', '(())()', '()(())', '()()()']
1 1 => 1 0   RETURN because l > r, not a parenthesis

2 2 => 2 1  RETURN because l > r, not a parenthesis

3 3 => 3 2 RETURN because l > r, not a parenthesis

return res: ['((()))', '(()())', '(())()', '()(())', '()()()']
```

```JS
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];

    function go(l, r, s) {
        if(l > r) return;
        if(l === 0 && r === 0) {
            res.push(s);
            return;
        }
        if(l > 0) {
            go(l - 1, r, s + '(');
        }
        if(r > 0) {
            go(l, r - 1, s + ')');
        }
    }

    go(n, n, '');
    return res;
};
```
