// 1
// var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
// getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)

// No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).

function getMaxProfit(stockPricesYesterday){
  let minPrice = stockPricesYesterday[0];
  let profit = - Infinity;

  for(let i = 1; i < stockPricesYesterday.length; i++){
    let currentPrice = stockPricesYesterday[i];
    let potentialPrice = currentPrice - minPrice;
    profit = Math.max(profit, potentialPrice);
    minPrice = Math.min(minPrice, currentPrice);
  }
  return profit;
}

//2
// You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

// input [1, 7, 3, 4]
// output [84, 12, 28, 21]


function productOfEveryIntegers(integers){
  let result = [];

  let lowerProduct = 1;
  for(let i = 0; i < integers.length; i++){
    result[i] = lowerProduct;
    lowerProduct *= integers[i];
  }

  let upperProduct = 1;
  for(let j = integers.length - 1; j >= 0; j--){
    result[j] *= upperProduct;
    upperProduct *= integers[j];
  }

  return result;
}


// 3

// Given an array of integers, find the highest product you can get from three of the integers.

function highestThreeProduct(array){
  let highestThree = - Infinity;
  let highestTwo = array[0] * array[1];
  let lowestTwo = array[0] * array[1];
  let high = Math.max(array[0], array[1]);
  let low = Math.min(array[0], array[1]);

  for(let i = 2; i < array.length; i++){
    let currentNum = array[i];

    highestThree = Math.max(highestThree, highestTwo * high, highestTwo * low);

    highestTwo = Math.max(highestTwo, high * currentNum);
    lowestTwo = Math.max(lowestTwo, low * currentNum);

    high = Math.max(currentNum, high);
    low = Math.max(currentNum, low);
  }

  return highestThree;
}

// 4
// Write a function mergeRanges() that takes an array of meeting time ranges and returns an array of condensed ranges.

// input: [
//   {startTime: 0,  endTime: 1},
//   {startTime: 3,  endTime: 5},
//   {startTime: 4,  endTime: 8},
//   {startTime: 10, endTime: 12},
//   {startTime: 9,  endTime: 10},
// ]

// output: [
//     {startTime: 0, endTime: 1},
//     {startTime: 3, endTime: 8},
//     {startTime: 9, endTime: 12},
// ]


function mergeRanges(array){
  let answer = [];

  let sortedArray = array.slice().sort(function(a,b){
    return a.startTime > b.startTime ? 1 : -1;
  });

  let current = sortedArray[0];
  let objectToPush;
  for(let i = 1; i < sortedArray.length; i++){

    if(current.endTime >= sortedArray[i].startTime){
      current = merge(current, sortedArray[i]);
    }
    else {
      answer.push(current);
      current = sortedArray[i];
    }
  }
  answer.push(current);
  return answer;
}

function merge(obj1, obj2){
  return {
    startTime: Math.min(obj1.startTime, obj2.startTime),
    endTime: Math.max(obj1.endTime, obj2.endTime)
  };
}

// interview solution
function mergeRanges(array){
  let sortedArray = array.slice().sort(function(a, b){
    return a.startTime > b.startTime ? 1 : -1;
  });

  let answer = [sortedArray[0]];

  for(let i = 1; i < sortedArray.length; i++){
    let currentTime = sortedArray[i];
    let previousTime = answer[answer.length - 1];

    if(currentTime.startTime <= previousTime.endTime){
      previousTime.endTime = Math.max(currentTime.endTime, previousTime.endTime);
    }
    else {
      answer.push(currentTime);
    }
  }

  return answer;
}


// 5
// possible change

function changePossible(amount, denomination){
  let waysOfDoingNCent = [];
  for(let i = 0; i <= amount; i++){
    waysOfDoingNCent.push(0);
  }
  waysOfDoingNCent[0] = 1;

  denomination.forEach(function(coin){
    for(let startAmount = coin; startAmount <= amount; startAmount ++){
      let remainder = startAmount - coin;
      waysOfDoingNCent[startAmount] += waysOfDoingNCent[remainder];
    }
  });

  return waysOfDoingNCent[amount];
}



// 6
// rectangle Love

// var myRectangle = {
//   // coordinates of bottom-left corner
//   leftX: 1,
//   bottomY: 5,
//   // width and height
//   width: 10,
//   height: 4,
// };

function rectangle(rec1, rec2){
  let overlapX = overlap(rec1.leftX, rec1.width, rec2.leftX, rec2.width);
  let overlapY = overlap(rec1.bottomY, rec1.height, rec2.bottomY, rec2.height);

  if(overlapX.width === null || overlapY.width === null){
   return {
      leftX: null,
      bottomY: null,
      width: null,
      height: null,
    };
  }

  return {
    leftX: overlapX.start,
    bottomY: overlapY.start,
    width: overlapX.width,
    height: overlapY.height
  };
}

function overlap(startPoint1, width1, startPoint2, width2){
  let highestStartPoint = Math.max(startPoint1, startPoint2);
  let lowestEndPoint = Math.min(startPoint1 + width1, startPoint2 + width2);

  if(highestStartPoint >= lowestEndPoint){
    return {start: null, width: null};
  }

  let overlapWidth = lowestEndPoint - highestStartPoint;
  return {start: highestStartPoint, width: overlapWidth};
}


// 7
// Write a class TempTracker with these methods:

// insert()—records a new temperature
// getMax()—returns the highest temp we've seen so far
// getMin()—returns the lowest temp we've seen so far
// getMean()—returns the mean ↴ of all temps we've seen so far
// getMode()—returns a mode ↴ of all temps we've seen so far
// Optimize for space and time. Favor speeding up the getter functions getMax(), getMin(), getMean(), and getMode() over speeding up the insert() function.

function TempTracker(){
  this.temp = {};
  this.max = null;
  this.min = null;
  this.sum = 0;
  this.tempLength = 0;
  this.mode = null;
}

TempTracker.prototype.insert = function(x){
  this.sum += x;
  this.tempLength += 1;

  if(this.temp.hasOwnProperty(x)){
    this.temp[x] = this.temp[x] += 1;
  } else {
    this.temp[x] = 1;
  }

  this.max = Math.max(this.max, x);
  this.min = Math.min(this.min, x);
  this.mode = Math.max(this.mode, this.temp[x]);
};

TempTracker.prototype.getMax = function(){
  return this.max;
};

TempTracker.prototype.getMin = function(){
  return this.min;
};

TempTracker.prototype.mean = function(){
  return this.sum/this.tempLength;
};

TempTracker.prototype.mode = function(){
  return this.mode;
};


// 8
// Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).
// A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

// function BinaryTreeNode(value) {
//   this.value = value;
//   this.left  = null;
//   this.right = null;
// }
//
// BinaryTreeNode.prototype.insertLeft = function(value) {
//     this.left = new BinaryTreeNode(value);
//     return this.left;
// };
//
// BinaryTreeNode.prototype.insertRight = function(value) {
//     this.right = new BinaryTreeNode(value);
//     return this.right;
// };

function checkSuperTree(tree){
  let maxDepth = 0;
  let minDepth = 0;

  let depthCount;
  let stack = [{tree: tree, depth: 0}];

  while (stack.length !== 0){
    let treeNode = stack.pop();
    if(treeNode.tree.left === null && treeNode.tree.right === null){
      minDepth = Math.min(treeNode.depth, minDepth);
      maxDepth = Math.max(treeNode.depth, maxDepth);

      if(maxDepth - minDepth > 1){
        return false;
      }
    }
    if(treeNode.tree.left){
      depthCount = treeNode.depth + 1;
      stack.push({tree: treeNode.tree.left, depth: depthCount});
    }
    else if(treeNode.tree.right){
      depthCount = treeNode.depth + 1;
      stack.push({tree: treeNode.tree.right, depth: depthCount});
    }
  }

  return true;
}

// 9
// Write a function to check that a binary tree ↴ is a valid binary search tree. ↴

// DFS
// track upper and lower bound

function checkBinaryTree(n){
  let stack = [{node: n, lowerBound: -Infinity, upperBound: Infinity}];

  while(stack.length){
    let currentNode = stack.pop();
    let node = currentNode.node;
    let lowerBound = currentNode.lowerBound;
    let upperBound = currentNode.upperBound;

    if(node.value <= lowerBound || node.value >= upperBound){
      return false;
    }

    if(node.left){
      stack.push({node: node.left, lowerBound: lowerBound, upperBound: node.value});
    }
    if(node.right){
      stack.push({node: node.right, lowerBound: node.value, upperBound: upperBound});
    }
  }
  return true;
}

// 10
// Second largest item in the binary tree

function secondLargest(node){
  let previous;
  let current = node;

  // find the right most node
  while(current.right){
    previous = current;
    current = current.right;
  }

  if(current.left){
    current = current.left;
    while(current.right){
      current = current.right;
    }
    return current;
  }

  return previous;
}

// 11
// I'm making a search engine called MillionGazillion™.
// Trie

var visited = {};
function storage(word){

  let current = visited;
  for(let i = 0; i < word.length; i++){
    let letter = word[i];
    if(current[letter]){
      current = current[letter];
    }
    else {
      current[letter] = {};
      current = current[letter];
    }
  }

  if(!current.hasOwnProperty('end')){
    current['end'] = 'end';
  }

  return visited;
}


// 12
// Binary Search

function binarySearch(array, target){
  let midIndex = Math.floor(array.length/2);

  if(array[midIndex] === target){
    return midIndex;
  }
  if(array.length === 1){
    return null;
  }
  else if(array[midIndex] > target){
    return binarySearch(array.slice(0, midIndex), target);
  }
  else if(array[midIndex] < target){
    let index = binarySearch(array.slice(midIndex+1), target);
    return (index !== null) ? index + midIndex + 1 : null;
  }

 return null;
}


// 13
// // Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. This array is huge (there are lots of words I don't know) so we want to be efficient here.

// var words = [
//   'retrograde',
//   'supplant',
//   'undulate',
//   'xenoepist',
//   'asymptote', // <-- rotates here!
//   'babka',
//   'banoffee',
//   'engender',
//   'karpatka',
//   'othellolagkage',
// ];

function rotateDictionary(words){
  let firstWord = words[0];
  let floorIndex = 0;
  let ceilingIndex = words.length - 1;

  while(floorIndex < ceilingIndex){
    let midIndex = Math.floor(floorIndex + (ceilingIndex - floorIndex)/2);

    if(words[midIndex] < words[midIndex - 1]){
      return midIndex;
    }

    if(words[midIndex] > firstWord){
      //go right
      floorIndex = midIndex + 1;
    }
    else {
      //go left
      ceilingIndex = midIndex - 1;
    }
  }

  return ceilingIndex;
}

// 14
// You've built an inflight entertainment system with on-demand movie streaming.
// Users on longer flights like to start a second movie right when their first one ends, but they complain that the plane usually lands before they can see the ending. So you're building a feature for choosing two movies whose total runtimes will equal the exact flight length.
//
// Write a function that takes an integer flightLength (in minutes) and an array of integers movieLengths (in minutes) and returns a boolean indicating whether there are two numbers in movieLengths whose sum equals flightLength.

function twoSum(movieTimes, flightTime){
  let hash = {};

  for(let i = 0; i < movieTimes.length; i++){
    let movieTime = movieTimes[i];
    if(hash.hasOwnProperty(movieTime)){
      return true;
    }

    let difference = flightTime - movieTime;
    hash[difference] = true;
  }

  return false;
}

// 15
// fib
var memo = {};
function fib(num){
  if(num === 0 || num === 1){
    return num;
  }

  if(memo.hasOwnProperty(num)){
    return memo[num];
  }

  let result = fib(num - 1) + fib(num - 2);

  memo[num] = result;
  return result;
}



function fib(num) {
  if(num === 0 || num === 1){
    return num;
  }

  let prevprev = 0;
  let previous = 1;
  let current;

  for(let i = 1; i < num; i++){
    current = previous + prevprev;
    prevprev = previous;
    previous = current;
  }
  return current;
}
