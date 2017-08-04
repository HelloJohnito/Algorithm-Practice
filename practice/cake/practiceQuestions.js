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
  this.max = - Infinity;
  this.min = Infinity;
  this.sum = 0;
  this.tempLength = 0;
  this.mode = -Infinity;
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

  if(this.temp[x] > this.mode){
    this.mode = this.temp[x];
  }

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


// 7
// Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).

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
