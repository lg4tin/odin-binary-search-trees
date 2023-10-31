/*eslint-disable*/

class Node {
  constructor(value) {
    this.data = value;
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

  delete(value) {
    let currentNode = this.root;
    if (currentNode === null) return currentNode;

    
/*
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.right) {
        currentNode = currentNode.right;
      } else if (value === currentNode.value) {
        return currentNode.value;
      }
    }
  */
    
  }

  find(value) {
    let currentNode = this.root;
    
    while(true) {
      if (value < currentNode.left) {
        currentNode = currentNode.left;
      } else if (value > currentNode.right) {
        currentNode = currentNode.right;
      } else if (value === currentNode.data) {
        console.log(currentNode);
        return currentNode
      }
    }
  }
  
}

let array = [1,2,4,5,8,14,16]
const tree = new Tree(array)
console.log(tree)


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function removeDuplicates(array) {
  array.sort((a, b) => a - b)
  return array.filter((el, index) => array.indexOf(el) === index)
}
