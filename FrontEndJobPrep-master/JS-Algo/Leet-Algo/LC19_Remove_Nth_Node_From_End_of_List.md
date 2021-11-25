LC19_Remove Nth Node From End of List

移除链表中的倒数第 n 元素

**_快慢指针精髓的体现_**

---

1 2 3 4 5 n = 2

fast

slow

---

1 2 3 4 5 i < 2 移动 fast

slow (i = 0)fast **(i = 1)fast**

---

1 2 3 4 5 只要 fast 和 fast 后面的节点还存在, 就移动 slow 和 fast

​ slow fast

---

1 2 3 5

​ slow.next = slow.next.next

```javascript
var removeNthFromEnd = function (head, n) {
  let slow = head,
    fast = head;
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  if (!fast) return (head = head.next); //如果fast指向undefined了，就证明这数组只有一元素，直接移除即可
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  //如果fast没有下一节点了，证明要移除的是最后一元素，那么直接移除即可，不管fast指针了。
  slow.next = slow.next.next;
  return head;
};
```
