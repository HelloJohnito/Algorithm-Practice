
// stockPricesYesterday buy first then sell. Find the max profit.
//o(1) time with o(1) space complexity
//Greedy methodology

function getMaxProfit(array){
  let minPrice = array[0];
  let maxProfit = array[1] - array[0];

  for(let i = 1; i < array.length; i++){
    let currentPrice = array[i];
    let potentialPrice = currentPrice - minPrice;
    minPrice = Math.min(minPrice, currentPrice);
    maxProfit = Math.max(potentialPrice, maxProfit);
  }
  return maxProfit;
}

// var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
// var stockPricesYesterday = [12,11,10]

////////////////////////////////////////////////////////////

//You have an array of integers, and for each index you want to find the product of every integer except the integer at that index. Don't use division.

function getProductsOfAllIntsExceptAtIndex(array){
  let result = [];

  let lowerProduct = 1;
  for(let j = 0; j < array.length; j++){
    result[j] = lowerProduct;
    lowerProduct *= array[j];
  }

  let upperProduct = 1;
  for(let k = array.length - 1; k >= 0 ; k--){
    result[k] *= upperProduct;
    upperProduct *= array[k];
  }

  return result;
}

// getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]);

///////////////////////////////////////////////////////////

// Given an array of integers, find the highest product you can get from three of the integers.

//o(nlogn) solution but does not account for negative numbers
  //my Naive answer//
function productThree(arrayOfInt){
  arrayOfInt.sort();
  let arrayLengthThree = arrayOfInt.slice(arrayOfInt.length - 3, arrayOfInt.length);
  return multiply(arrayLengthThree);
}

function multiply (numbers){
  let product = 1;
  for(let i = 0; i < numbers.length; i++){
    product *= numbers[i];
  }
  return product;
}


//o(n) solution with o(1) memory

function productThree(arrayOfInt){
  let productMaxThree = arrayOfInt[0] * arrayOfInt[1] * arrayOfInt[2];
  let highestTwo = arrayOfInt[0] * arrayOfInt[1];
  let lowestTwo = arrayOfInt[0] * arrayOfInt[1];
  let highest = Math.max(arrayOfInt[0], arrayOfInt[1]);
  let lowest = Math.min(arrayOfInt[0], arrayOfInt[1]);
  let current;

  for(let i = 2; i < arrayOfInt.length; i++){
    current = arrayOfInt[i];

    //set productMaxThree
    productMaxThree = Math.max(
      productMaxThree,
      current * highestTwo,
      current * lowestTwo
    );

    //set product twos
    highestTwo = Math.max(
      highestTwo,
      current * highest,
      current * lowest
    );

    lowestTwo = Math.min(
      lowestTwo,
      current * highest,
      current * lowest
    );

    //set product ones
    highest = Math.max(
      highest,
      current
    );

    lowest = Math.min(
      lowest,
      current
    );
  }

  return productMaxThree;
}

/////////////////////////////////////////////////////////

// Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.

// o(nlog(n))
function mergeRanges(meetings) {

  let sortedMeetings = meetings.slice().sort(
    (a,b) => a.startTime > b.startTime ? 1 : -1
  );

  let answer = [];
  let currentMeeting = sortedMeetings[0];

  for(let i = 1; i < sortedMeetings.length; i++){
    if(currentMeeting.endTime >= sortedMeetings[i].startTime){
      currentMeeting = merge(currentMeeting, sortedMeetings[i]);
    } else {
      answer.push(currentMeeting);
      currentMeeting = sortedMeetings[i];
    }
  }
  answer.push(currentMeeting);
  return answer;
}

function merge(meetingOne, meetingTwo){
  return {
    startTime: Math.min(meetingOne.startTime, meetingTwo.startTime),
    endTime: Math.max(meetingOne.endTime, meetingTwo.endTime)
  };
}

// mergeRanges(times)

// let times = [
//   {startTime: 0,  endTime: 1},
//   {startTime: 3,  endTime: 5},
//   {startTime: 4,  endTime: 8},
//   {startTime: 10, endTime: 12},
//   {startTime: 9,  endTime: 10},
// ]

//InterviewCake Solution
function mergeRanges(meetings) {

  // sort by start times
  var sortedMeetings = meetings.slice().sort(function(a, b) {
      return a.startTime > b.startTime ? 1 : -1;
  });

  // initialize mergedMeetings with the earliest meeting
  var mergedMeetings = [sortedMeetings[0]];

  for (var i = 1; i < sortedMeetings.length; i++) {

      var currentMeeting    = sortedMeetings[i];
      var lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];

      // if the current and last meetings overlap, use the latest end time
      if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
          lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);

      // add the current meeting since it doesn't overlap
      } else {
          mergedMeetings.push(currentMeeting);
      }
  }

  return mergedMeetings;
}
///////////////////////////////////////////////////////////////////


//Find the area of the overlap between two rectangle

function findRangeOverlap(point1, length1, point2, length2) {

  // find the highest start point and lowest end point.
  // the highest ("rightmost" or "upmost") start point is
  // the start point of the overlap.
  // the lowest end point is the end point of the overlap.
  var highestStartPoint = Math.max(point1, point2);
  var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

  // return null overlap if there is no overlap
  if (highestStartPoint >= lowestEndPoint) {
      return {startPoint: null, overlapLength: null};
  }

  // compute the overlap length
  var overlapLength = lowestEndPoint - highestStartPoint;

  return {startPoint: highestStartPoint, overlapLength: overlapLength};
}

function findRectangularOverlap(rect1, rect2) {

  // get the x and y overlap points and lengths
  var xOverlap = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
  var yOverlap = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

  // return null rectangle if there is no overlap
  if (!xOverlap.overlapLength || !yOverlap.overlapLength) {
      return {
          leftX: null,
          bottomY: null,
          width: null,
          height: null,
      };
  }

  return {
      leftX: xOverlap.startPoint,
      bottomY: yOverlap.startPoint,
      width: xOverlap.overlapLength,
      height: yOverlap.overlapLength,
  };
}


// var rect1 = {
//
//   // coordinates of bottom-left corner
//   leftX: 2,
//   bottomY: 1,
//
//   // width and height
//   width: 4,
//   height: 4,
//
// };
//
// var rect2 = {
//
//   // coordinates of bottom-left corner
//   leftX: 1,
//   bottomY: 2,
//
//   // width and height
//   width: 4,
//   height: 4,
//
// };



///////////////////////////////////////////////////////////


class temperature{
  constructor(){
    this.temp = {};
    this.max = Number.NEGATIVE_INFINITY;
    this.min = Number.POSITIVE_INFINITY;

    this.mode = 0;
    this.mostCount = 1;

    this.mean = 0;
    this.count = 0;
    this.totalSum = 0;
  }

  insert(el){
    this.temp[el] = this.temp.hasOwnProperty(el) ? this.temp[el]+=1 : 1;

    this.max = Math.max(this.max, el);
    this.min = Math.min(this.min, el);

    this.count += 1;
    this.totalSum += el;
    this.mean = this.totalSum/this.count;
    // let average = 0
    // let value = 0
    // for(let key in this.temp){
    //   average += Number(key) * this.temp[key]
    //   value += this.temp[key]
    // }
    // this.mean = average/value

    // this.mode = Object.keys(this.temp).reduce((a, b) => {
    //   return this.temp[a] > this.temp[b] ? a : b;
    // });

    if(this.mostCount <= this.temp[el]){
      this.mode = el;
      this.mostCount = this.temp[el];
    }


    return el;
  }

  getMax(){
    return this.max;
  }

  getMin(){
    return this.min;
  }

  getMean(){
    return this.mean;
  }

  getMode(){
    return this.mode;
  }

  getTemp(){
    return this.temp;
  }
}

// q = new temperature
// q.insert(1)
// q.insert(2)
// q.insert(2)
// q.insert(3)
// console.log(`max: ${q.getMax()}`)
// console.log(`min: ${q.getMin()}`)
// console.log(`mean: ${q.getMean()}`)
// console.log(`mode: ${q.getMode()}`)
// console.log(q.max)



//Binary Tree Balanced?

// function BinaryTreeNode(value) {
//     this.value = value;
//     this.left  = null;
//     this.right = null;
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
//
// a = new BinaryTreeNode(10)
//
// a.insertLeft(5)
// b = a.left
// b.insertLeft(3)
// b.insertRight(7)
//
// d = b.left
// d.insertLeft(1)
//
// a.insertRight(15)
// c = a.right
// c.insertLeft(13)
// c.insertRight(17)



function balancedTree(tree){

  if(!tree) return true;

  let depths = [];
  //stack
  let nodes = [[tree, 0]];

  while(nodes.length){

    let nodeInfo = nodes.pop();
    let node = nodeInfo[0];
    let depth = nodeInfo[1];

    //when at leafnode
    if(!node.left && !node.right){
      if(depths.indexOf(depth) < 0){
       depths.push(depth);
        if(depths.length > 2 || Math.abs(depths[0] - depths[1]) > 1){
          return false;
        }
      }
    }

    else{
      if(node.right) nodes.push([node.right, depth + 1]);
      if(node.left) nodes.push([node.left, depth + 1]);
    }
  }
  return true;
}

// balancedTree(a)


///////////////////////////////////////////////////////////////////////

//Check if tree is a binary search tree

function isBinarySearchTree(tree){
  let stack = [];

  stack.push({node: tree, lowerBound: -Infinity, upperBound: Infinity});

  while(stack.length){
    let nodeAndBound = stack.pop();
    let currentNode = nodeAndBound.node;
    let lowerBound = nodeAndBound.lowerBound;
    let upperBound = nodeAndBound.upperBound;

    if(currentNode.value <= lowerBound || currentNode.value >= upperBound){
      return false;
    }

    if(currentNode.left){
      stack.push({node: currentNode.left, lowerBound: lowerBound, upperBound: currentNode.value});
    }
    if(currentNode.right){
      stack.push({node: currentNode.right, lowerBound: currentNode.value, upperBound: upperBound});
    }
  }
  return true;
}

// isBinarySearchTree(a)

function recursiveIsBinarySearchTree(treeRoot, lowerBound, upperBound) {

  lowerBound = (typeof lowerBound !== 'undefined') ? lowerBound : -Infinity;
  upperBound = (typeof upperBound !== 'undefined') ? upperBound :  Infinity;

  if (!treeRoot) return true;

  if (treeRoot.value >= upperBound || treeRoot.value <= lowerBound) {
      return false;
  }

  return isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value) &&
         isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound);

}

//////////////////////////////////////////////////////////////////////////

//2nd largest element in a binary search tree

//my solution
function secondLargest(tree){
  let previousNode = null;
  let currentNode = tree;

  while(currentNode.right !== null){
    previousNode = currentNode;
    currentNode = currentNode.right;
  }

  if(currentNode.left){
    currentNode = currentNode.left;
    while(currentNode.right !== null){
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }

  return previousNode.value;
}

//interview solution
function findLargest(rootNode) {
    var current = rootNode;
    while (current) {
        if (!current.right) return current.value;
        current = current.right;
    }
}

function findSecondLargest(rootNode) {
    if (!rootNode || (!rootNode.left && !rootNode.right)) {
        throw new Error('Tree must have at least 2 nodes');
    }

    var current = rootNode;

    while (current) {
        // case: current is largest and has a left subtree
        // 2nd largest is the largest in that subtree
        if (current.left && !current.right) {
            return findLargest(current.left);
        }

        // case: current is parent of largest, and largest has no children,
        // so current is 2nd largest
        if (current.right &&
                !current.right.left &&
                !current.right.right) {
            return current.value;
        }

        current = current.right;
    }
}
