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
