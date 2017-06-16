//Graph//

const Vertex = function(value){
  this.value = value;
  this.outEdge = [];
  this.inEdge = [];
};

const Edge = function(start, end){
  this.start = start;
  this.end = end;

  // console.log(this)
  start.outEdge.push(this);
  end.inEdge.push(this);
};

Edge.prototype.destroy = function(){
  let outEdgeIndex = this.start.outEdge.indexOf(this);
  let inEdgeIndex = this.end.inEdge.indexOf(this);

  this.start.outEdge.splice(outEdgeIndex);
  this.end.inEdge.splice(inEdgeIndex);

  this.start = null;
  this.end = null;
  return;
};


let v1 = new Vertex(1);
let v2 = new Vertex(2);
let v3 = new Vertex(3);
let v4 = new Vertex(4);
let v5 = new Vertex(5);

let e1 = new Edge(v1, v2);
let e2 = new Edge(v1, v3);
let e3 = new Edge(v1, v4);
let e4 = new Edge(v2, v3);
let e5 = new Edge(v3, v5);
let e6 = new Edge(v4, v5);

let vertices = [v1, v2, v3, v4, v5];

// iterate through the array and push vertices that do not have in-edges into a queue.
// keep track of the count of

function topologicalSort(vertices){
  let queue = [];  //shift and push
  let inEdgeCount = {};
  let sorted = [];

  for(let i = 0; i < vertices.length; i++){
    inEdgeCount[vertices[i].value] = vertices[i].inEdge.length;
    if(!vertices[i].inEdge.length){
      queue.push(vertices[i]);
    }
  }

  while(queue.length > 0){
    let currentVertex = queue.shift();
    sorted.push(currentVertex);
    for(let i = 0; i < currentVertex.outEdge.length; i++){
      inEdgeCount[currentVertex.outEdge[i].end.value] -= 1;
      if(inEdgeCount[currentVertex.outEdge[i].end.value] === 0){
        queue.push(currentVertex.outEdge[i].end);
      }
    }
  }

  return sorted;
}

// topologicalSort(vertices);
