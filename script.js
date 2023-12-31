/*eslint-disable*/

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insert(value) {
    let newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      while (true) {
        if (value < currentNode.value) {
          if (!currentNode.left) {
            currentNode.left = newNode;
            return this;
          }
  
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = newNode;
            return this;
          }

          currentNode = currentNode.right;
        }
      }
      
    }
  }

  remove(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    let parentNode = null;
    while(currentNode){
      if(value < currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if(value > currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.value === value) {
        //We have a match, get to work!
        
        //Option 1: No right child: 
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.root = currentNode.left;
          } else {
            
            //if parent > current value, make current left child a child of parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            
            //if parent < current value, make left child a right child of parent
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
        
        //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if(parentNode === null) {
            this.root = currentNode.right;
          } else {
            
            //if parent > current, make right child of the left the parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
            
            //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
        
        //Option 3: Right child that has a left child
        } else {

          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while(leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          
          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if(parentNode === null) {
            this.root = leftmost;
          } else {
            if(currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
      return true;
      }
    }
  }

  find(value) {
    if (!this.root) {
      return false;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return 'It doesnt exist';
  }

  levelOrder(func = null) {
    if (this.root === null) return 'No!';

    const values = [];
    const queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();
      values.push(current.value);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }

    if (func === null) return values;
    else return values.map(num => func(num));
  }

  inOrder(func = null) {
    if (this.root === null) return false;
    let currentNode = this.root;
    let values = [];
    let stack = [];

    while (currentNode !== null || stack.length > 0) {
      while (currentNode !== null) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }

      currentNode = stack.pop();
      values.push(currentNode.value);
      currentNode = currentNode.right;
    }
    if (func === null) return values;
    else return values.map(val => func(val));
  }

  preOrder(func = null) {
    if (this.root === null) return false;
    let values = [];
    let stack = [];
    let currentNode = this.root;
    stack.push(currentNode);

    while (stack.length > 0) {
      currentNode = stack.pop();
      values.push(currentNode.value);

      if (currentNode.right !== null) stack.push(currentNode.right);
      if (currentNode.left !== null) stack.push(currentNode.left);
    }

    if (func === null) return values;
    else return values.map(val => func(val));
  }

  postOrder(func = null) {
    if (this.root === null) return false;

    let values = [];
    let stack1 = [];
    let stack2 = [];
    stack1.push(this.root);
    
    while (stack1.length > 0) {
      let current = stack1.pop();
      stack2.push(current.value) ;

      if (current.left !== null) stack1.push(current.left);
      if (current.right !== null) stack1.push(current.right);
    }

    while (stack2.length > 0) {
      values.push(stack2.pop());
    }

    if (func === null) return values;
    else return values.map(val => func(val));
  }

  height(node) {
    // You can get a node by assigning a var to the .find() method

    let depth = 0;

    let q = [];

    q.push(node);
    q.push(null);
    
    while (q.length > 0) {
      let temp = q.shift();

      if (temp == null) {
        depth += 1;
      }

      if (temp !== null) {
        if (temp.left !== null) {
          q.push(temp.left);
        }

        if (temp.right !== null) {
          q.push(temp.right);
        }
      } 
      
      else if (q.length > 0) {
        q.push(null);
      }
      
    }
    return depth - 1;
  }

  depth(node) {
    return this.height(this.root) - this.height(node);
  }

  isBalanced() {
    let left = this.root.left;
    let right = this.root.right;

    let diff = this.height(left) - this.height(right);
    if (diff <= 1 && diff >= -1) return 'Balanced';
    else return 'Not Balanced';
  }

  rebalance() {
    if (this.isBalanced() == 'Not Balanced') {
      let order = this.inOrder();
      this.root = this.buildTree(order);
      return console.log(prettyPrint(tree.root));
    } else {
      return 'Tree is already Balanced';
    }
  }
}

// let array = [1,2,4,5,8,14,16]
const tree = new Tree(randomNums())
console.log(tree)

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function removeDuplicates(array) {
  array.sort((a, b) => a - b)
  return array.filter((el, index) => array.indexOf(el) === index)
}

function randomNums() {
  let array = [];
  for (let i = 0; i < 7; i++) {
    array.push(Math.floor(Math.random() * 100))
  }
  return array;
}

console.log(prettyPrint(tree.root))