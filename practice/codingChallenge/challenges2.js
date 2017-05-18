//chapter4

//set ups
//
// class Link {
//   constructor(value){
//     this.value = value;
//     this.next = null;
//   }
// }
//
// class Tree {
//   constructor(value){
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }
//
//
// a = new Tree("a")
// b = new Tree("b")
// c = new Tree("c")
// d = new Tree("d")
// e = new Tree("e")
// f = new Tree("f")
// g = new Tree("g")
// h = new Tree("h")
//
// a.left = b
// a.right = c
// b.left = d
// b.right = e
// c.left = f
// c.right = g
// d.left = h

//implement BFS and DFS for a graph

class Node {
  constructor(value){
    this.value = value;
    this.edges = [];
  }
}

let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");

a.edges.push(b);
b.edges.push(c);
c.edges.push(d);
d.edges.push(e);
d.edges.push(b);
e.edges.push(a);

function bfs(node, target){
  let visited = new Set();
  let queue = [];
  queue.push(node);

  while(queue.length !== 0){
    // console.log(queue)
    let currentNode = queue.shift();
    if(!visited.has(currentNode)){ // Not visited
      visited.add(currentNode);
      if(currentNode.value === target) return currentNode;
      for(let i = 0; i < currentNode.edges.length; i++){
        queue.push(currentNode.edges[i]);
      }
    }
  }
  return false;
}

// dfs recursive

function dfs(node, target){
  let visited = new Set();

  function dfsRecursive(node, visited, target){
    if(node.value === target) return node;

    visited.add(node);
    for(let i = 0; i < node.edges.length; i++){
      if(!visited.has(node.edges[i])){
        return dfsRecursive(node.edges[i], visited, target);
      } else {
        return false;
      }
    }
  }
  return dfsRecursive(node, visited, target);
}

///////////////////////////////////////////////////////////
//create a Binary tree with an array.

function createBinarySearchTree(array){

  if(array.length === 0){
    return null;
  }

  let mid = Math.floor(array.length / 2);
  let node = new Node(array[mid]);

  node.left = createBinarySearchTree(array.slice(0, mid));
  node.right = createBinarySearchTree(array.slice(mid + 1, array.length));
  return node;
}

// createBinarySearchTree([1,2,3,4,5,6,7,8]);

///////////////////////////////////////////////////////////////////
//List of depths
//Solution options:
//1) Use 2 queues to keep track of each level
//2) Begin by placing a root and a null then place a null inside after each level
//3) Use a level counter that keeps track of the elements in the level and a current counter which keeps track of how many nodes there are for the next round.

function levelDepths(head){
  let currrentCount = 1;//keeps track of the currrentCount
  let nextCount = 0; //counts up for the nextCount.
  let queue = [head];
  let current;
  let previousLink = null;
  let currentLink;
  let arrayOfHead =[];

  while(queue.length !== 0){
    currrentCount -= 1;
    current = queue.shift();
    currentLink = new Link(current.value); //Creates new Linked List Node.

    //check if the linked node is a head node.
    if(previousLink === null){
      arrayOfHead.push(currentLink.value);
    }

    //push child nodes into queue. Increment the next value
    if(current.left !== null){
      queue.push(current.left);
      nextCount += 1;
    }
    if(current.right !== null){
      queue.push(current.right);
      nextCount += 1;
    }

    //attach the linked lists
    if(previousLink !== null){
      previousLink.next = currentLink;
    }

    previousLink = currentLink;

    //reset if you are at the last node.
    if(currrentCount <= 0){
      currrentCount = nextCount;
      nextCount = 0;
      previousLink = null;
    }
  }

  return arrayOfHead;
}

///////////////////////////////////////////////////////////////
//Check if the tree is a balanced Tree. depth of two nodes has to be 1 or less.


function balancedTree(head){
  let stack = [{node: head, depth: 0}];
  let maxDepth = -Infinity;
  let minDepth = Infinity;

  while(stack.length){
    let current = stack.pop();

    //if current is a leaf
    if(current.node.left === null && current.node.right === null){
      maxDepth = Math.max(maxDepth, current.depth);
      minDepth = Math.min(minDepth, current.depth);

      //depth is greater than 1 short circuit
      if(Math.abs(maxDepth - minDepth) > 1){
        return false;
      }
    }

    //push the child into stack
    if(current.node.left) stack.push({node: current.node.left, depth: current.depth + 1 });
    if(current.node.right) stack.push({node: current.node.right, depth: current.depth + 1});
  }
  return true;
}

/////////////////////////////////////////////////////////////////////////////
//Validate BST








/////////////////////////////////////////////////////////////////////////
//find the in order successor

//if right child exists. return the left most child
//else
  //go up to parent until the node is node's parent's left node.

function nextNode(node){
  let current = node;
  //if right child exists, return the left most child
  if(current.right){
    current = current.right;
    while(current.left !== null){
      current = current.left;
    }
    return current;
  }
  //if right child does not exist, return the node that is node's parent's left node
  else{
    if(current.parent === null) return null;
    while(current.parent.left !== current && current.parent !== null){
      current = current.parent;
    }
    if(current.parent === null){
      return null;
    }
    else {
      return current.parent;
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
//Topological Sort
// dependency graph.

class Graph{
  constructor(value){
    this.value = value;
    this.out = [];
    this.in = [];
  }

  static addEdges(node1, node2){
    node1.out.push(node2);
    node2.in.push(node1);
  }

  static removeEdges(node1, node2){
    let indexNode2 = node1.out.indexOf(node2);
    let indexNode1 = node2.in.indexOf(node1);
    node1.out.splice(indexNode2);
    node2.in.splice(indexNode1);
  }
}


let a = new Graph("a");
let b = new Graph("b");
let c = new Graph("c");
let d = new Graph("d");
let e = new Graph("e");
let f = new Graph("f");

Graph.addEdges(a,d);
Graph.addEdges(f,b);
Graph.addEdges(b,d);
Graph.addEdges(f,a);
Graph.addEdges(d,c);

function topologicalSort(array){
  let order = [];
  let visited = new Set();

  for(let i = 0; i < array.length; i++){
    if(visited.has(array[i])){
      continue;
    }
    topologicalSortUtil(array[i]);
  }

  function topologicalSortUtil(node1){

    if(visited.has(node1)){
      return;
    }

    visited.add(node1);
    node1.out.forEach((n) => {
      topologicalSortUtil(n); // recurse
    });

    order.push(node1.value);
  }

  return order.reverse(); // could use stack
}

// array = [a,b,c,d,e,f];
// topologicalSort(array);

///////////////////////////////////////////////////////////
//common ancestors
//if the node has points to the parent
//find the depth of two node then place them in the same level.
//Move both at the same time.

//if no pointer to parent
//DFS. When you find the target return that target back
// else return null
//when a node receives two not null values, then that is the diverge point. return that value back.

function lca(root, n1, n2){
  if(root === null) return null;
  if(root === n1 || root === n2) return root;

  let left = lca(root.left, n1, n2);
  let right = lca(root.right, n1, n2);

  //receive two not null values. Found diverge point
  if(left !== null && right !== null) return root;
  //return null if both sides are null
  if(left === null && right === null) return null;

  //return the side that is not null
  left !== null ? left : right;
}

/////////////////////////////////////////////////////////////////////////
// check if tree2 is a subtree of tree1

//use preorder traversal and compare the two strings
//you have to sub the nulls with a mark

function checkSubString(tree1, tree2){
  let ordered1 = preOrder(tree1, []);
  let ordered2 = preOrder(tree2, []);

  if(ordered1.indexOf(ordered2) !== -1){
    return true;
  } else {
    return false;
  }
}

function preOrder(tree, order){
    if(tree === null){
      return order.push("!!");
      // return;
    }

    order.push(tree.value);
    preOrder(tree.left, order);
    preOrder(tree.right, order);

    return order.toString();
}

/////////////////////////////////////////////////////////
//parentheses

var isValid = function(s) {
    let par = {
        "(": ")",
        "{": "}",
        "[": "]"
    };

    let stack = [];

    for(let i = 0; i < s.length; i++){
        let char = s[i];

        if(par[char]){      //checks front parentheses
            stack.push(char);
        }else{              //checks back parentheses
            if(par[stack[stack.length - 1]] === char){
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.length === 0 ? true : false;
};
