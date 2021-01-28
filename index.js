class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Error");
    }
  }
  remove(key) {
    // no children. sever parent link to key.
    if (this.key && this.left === null && this.right === null) {
      if (this.key > this.parent.key) {
        this.parent.right = null;
      } else {
        this.parent.left = null;
      }
    }
    // one child.
    else if (this.key && !!this.left !== !!this.right) {
      if (this.key > this.parent.key) {
        this.parent.right = this.left || this.right;
      } else {
        this.parent.left = this.left || this.right;
      }
    }
    // multiple children
    else if (this.key) {
      const replacementNode = this.right._findMin();
      replacementNode.remove(replacementNode.key);
      this.key = replacementNode.key;
      this.value = replacementNode.value;
    }
    // tree traversal
    else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
}

function sumTree(t) {
  if (!t) {
    return 0;
  }
  return sumTree(t.left) + t.value + sumTree(t.right);
}

function treeDepth(tree, depth = 0) {
  if (!tree) return depth;
  const leftDepth = treeDepth(tree.left, depth + 1);
  const rightDepth = treeDepth(tree.right, depth + 1);
  return leftDepth > rightDepth ? leftDepth : rightDepth;
}

function isBST(tree) {
  const left =
    tree.left === null || (tree.key > tree.left.key && isBST(tree.left));
  const right =
    tree.right === null || (tree.key < tree.right.key && isBST(tree.right));
  return left && right;
}

function findLargest(tree) {
  if (!tree.right) return tree;
  return findLargest(tree.right);
}
function countNodes(tree) {
  if (!tree) return 0;
  return 1 + countNodes(tree.left) + countNodes(tree.right);
}
function traverseUp(tree, positiveInt) {
  if (positiveInt < 0) throw new Error("positiveInt must be positive");
  if (!positiveInt) return tree;
  return traverseUp(tree.parent, positiveInt - 1);
}

// this question is mean
function thirdLargest() {}

function balanced(tree) {
  const queue = [{ ...tree, depth: 1 }];
  const leafDepth = [];
  while (queue.length) {
    const current = queue.shift();
    if (!current.left && !current.right) {
      leafDepth.push(current.depth);
      continue;
    }
    if (current.left) queue.push({ ...current.left, depth: current.depth + 1 });
    if (current.right)
      queue.push({ ...current.right, depth: current.depth + 1 });
  }
  let balanced = true;
  for (let i = 0; i < leafDepth.length; i++) {
    const restOfArray = [...leafDepth.slice(0, i), ...leafDepth.slice(i + 1)];
    for (num of restOfArray) {
      if (Math.abs(leafDepth[i] - num) > 1) balanced = false;
    }
  }
  return balanced;
}

function sameBST(arr1, arr2) {
  if (arr1[0] !== arr2[0]) return false;
  if (arr1.length !== arr2.length) return false;
  if (!arr1.every(num=>arr2.includes(num))) return false;
  
}

function main() {
  console.log(sameBST([3,5,4,6,1,0,2],[3,1,5,2,4,6,0]))
}
main();
