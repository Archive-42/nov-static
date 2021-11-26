class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
let a = new TreeNode("a");
let b = new TreeNode("b");
let c = new TreeNode("c");
let d = new TreeNode("d");
let e = new TreeNode("e");
let f = new TreeNode("f");
let g = new TreeNode("g");
let h = new TreeNode("h");
let i = new TreeNode("i");
let j = new TreeNode("j");
let k = new TreeNode("k");
let l = new TreeNode("l");
let m = new TreeNode("m");
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
h.left = i;
h.right = k;
i.right = j;
k.left = l;
l.right = m;
console.log( a );
console.log(h)
console.log('a.val: ', a.val);
console.log('b.val: ', b.val);
console.log('a.left: ', a.left);
console.log( 'a.right: ', a.right );
console.log("h.left: ", h.left);
const preO = [3, 9, 20, 15, 7];
const inO = [9, 3, 15, 20, 7];
function buildTree(preorder, inorder) {
  if (!preorder.length && !inorder.length) return null;
  let root = new TreeNode(preorder[0]);
  let rootIdx = inorder.indexOf(preorder[0]);
  let leftInorder = inorder.slice(0, rootIdx);
  let rightInorder = inorder.slice(rootIdx + 1);
  let leftPreorder = preorder.filter((val) => leftInorder.includes(val));
  let rightPreorder = preorder.filter((val) => rightInorder.includes(val));
  root.left = buildTree(leftPreorder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);
  return root;
}

