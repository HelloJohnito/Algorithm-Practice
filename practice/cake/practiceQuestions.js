// 1
// var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
// getMaxProfit(stockPricesYesterday);
// returns 6 (buying for $5 and selling for $11)

// No "shorting"—you must buy before you sell. You may not buy and sell in the same time step (at least 1 minute must pass).

// keep track of low number
// keep track of profit

function getMaxProfit(stockPricesYesterday){
  let lowest = stockPricesYesterday[0];
  let profit = 0;

  for(let i = 1; i < stockPricesYesterday.length; i++){
    let current = stockPricesYesterday[i];
    let possibleCurrent = current - lowest;

    profit = Math.max(profit, possibleCurrent);
    lowest = Math.min(lowest, current);
  }

  return profit;
}

//2
// You have an array of integers, and for each index you want to find the product of every integer except the integer at that index.

// input [1, 7, 3, 4]
// output [84, 12, 28, 21]


function productOfEveryIntegers(integers){
  let answer = [];
  for(let i = 0; i < integers.length; i++){
    answer.push(1);
  }

  let value = integers[0];
  for(let i = 1; i < integers.length; i++){
    answer[i] *= value;
    value *= integers[i];
  }

  let valueReverse = integers[integers.length - 1];
  for(let i = integers.length - 2; i >= 0 ; i++){
    answer[i] *= valueReverse;
    valueReverse *= integers[i];
  }

  return answer;
}


// 3

// Given an array of integers, find the highest product you can get from three of the integers.

function highestThreeProduct(array){
  let highestThree = array[0] * array[1] * array[2];
  let highestTwo = array[0] * array[1];
  let lowestTwo = array[0] * array[1];
  let higest = Math.max(array[0], array[1]);
  let lowest = Math.min(array[0], array[1]);

  for(let i = 2; i < array.length; i++){
    let current = array[i];

    highestThree = Math.max(highestThree, highestTwo * current, lowestTwo * current);
    highestTwo = Math.max(highestTwo, highest * current, lowest * current);
    lowestTwo = Math.min(lowestTwo, highestTwo * current, lowest * current);
    highest = Math.max(highest, current);
    lowest = Math.min(lowest, current);
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


function mergeRanges(meetings){
  let output = [];
  let previous = meetings[0];

  let sortedMeetings = meetings.slice().sort(
    (a,b) => a.startTime > b.startTime ? 1 : -1
  );

  for(let i = 1; i < sortedMeetings.length; i++){

    if(previous.endTime >= sortedMeetings[i].startTime){
      output.push(merge(previous, sortedMeetings[i]));
      i+= 1;
    } else {
      output.push(previous);
    }

    previous = sortedMeetings[i];
  }
  return output
}


function merge(obj1, obj2){
  return {
    startTime: Math.min(obj1.startTime, obj2.startTime),
    endTime: Math.max(obj1.endTime, obj2.endTime)
  }
}


// 5
// possible change

function changePossible(amount, denominations){
  let holder = [];
  for(let i = 0; i <= amount; i++){
    holder.push(0);
  }
  holder[0] = 1;

  for(let i = 0; i < denominations.length; i++){
    let coin = denominations[i];
    for(let j = coin; j <= amount; j++){
      let remainder = j - coin;
      holder[j] += holder[remainder];
    }
  }

  return holder[amount];
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
  this.temp = [];
  this.max = null;
  this.min = null;
  this.sum = 0;
  this.length = 0;
  this.countHolder = {};
  this.mode = null;
}

TempTracker.prototype.insert = function(num){
  this.temp.push(num);

  if(this.max === null || this.max > num){
    this.max = num;
  }
  if(this.min === null || this.min < num){
    this.min = num;
  }

  this.sum += num;
  this.length += 1;

  if(this.countHolder[num]){
    this.countHolder[num] += 1;
  } else {
    this.countHolder[num] = 1;
  }

  if(this.mode === null){
    this.mode = num;
  }
  else if(this.countHolder[this.mode] < this.countHolder[num]){
    this.mode = num;
  }
}

TempTracker.prototype.getMax = function(){
  return this.max;
}

TempTracker.prototype.getMin = function(){
  return this.min;
}

TempTracker.prototype.getMode = function(){
  return this.mode;
}

TempTracker.prototype.getMean = function(){
  return this.sum/this.length;
}


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
  if(!tree.right && !tree.left) return true;

  let maxDepth = null;
  let minDepth = null;
  let stack = [{node:tree, depth: 0}];

  while(stack.length){
    let node = stack.pop();
    let currentNode = node.node;
    let currentDepth = node.depth;

    if(!currentNode.left && !currentNode.right){
      maxDepth = Math.max(maxDepth, currentDepth);
      minDepth = Math.min(minDepth, currentDepth);

      if(maxDepth !== 0 && minDepth !== 0){
        if(maxDepth - minDepth >= 2){
          return false;
        }
      }
    }

    if(currentNode.left) stack.push({node: currentNode.left, depth: currentDepth + 1});
    if(currentNode.right) stack.push({node: currentNode.right, depth: currentDepth + 1})
  }
  return true;
}


// 9
// Write a function to check that a binary tree ↴ is a valid binary search tree. ↴

// DFS
// track upper and lower bound

function checkBinaryTree(n){

}

// 10
// Second largest item in the binary tree

function secondLargest(node){

}

// 11
// I'm making a search engine called MillionGazillion™.
// Trie

function storage(word){

}


// 12
// Binary Search

function binarySearch(array, target){

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

}

// 14
// You've built an inflight entertainment system with on-demand movie streaming.
// Users on longer flights like to start a second movie right when their first one ends, but they complain that the plane usually lands before they can see the ending. So you're building a feature for choosing two movies whose total runtimes will equal the exact flight length.
//
// Write a function that takes an integer flightLength (in minutes) and an array of integers movieLengths (in minutes) and returns a boolean indicating whether there are two numbers in movieLengths whose sum equals flightLength.

function twoSum(movieTimes, flightTime){

}

// 15
// fib

function fib(num){

}



function fib(num) {

}

///////////////////////////////////////////////////////////////
// 16
// cake thief

function maxDuffelBagValue(cakeTypes, capacity){

  let maxCapacityHolder = [];
  for(let i = 0; i <= capacity; i++){
    maxCapacityHolder.push(0);
  }

  for(let currentPointer = 0; currentPointer < maxCapacityHolder.length; currentPointer++){
    let maxValue = 0;

    for(let k = 0; k < cakeTypes.length; k++){
      let cake = cakeTypes[k];

      if(cake.weight <= currentPointer){
        let currentValue = cake.value + maxCapacityHolder[currentPointer - cake.weight];
        maxValue = Math.max(maxValue, currentValue);
      }

      maxCapacityHolder[currentPointer]= maxValue;
    }
  }

  return maxCapacityHolder[capacity];
}

//17
// what does this print out

var text = 'outside';
function logIt(){
    console.log(text);
    var text = 'inside';
}

// 18
// what is wrong with this?

<button id="btn-0">Button 1!</button>
<button id="btn-1">Button 2!</button>
<button id="btn-2">Button 3!</button>

<script type="text/javascript">
    var prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
    for (var btnNum = 0; btnNum < prizes.length; btnNum++) {
        // for each of our buttons, when the user clicks it...
        document.getElementById('btn-' + btnNum).onclick = function() {
            // tell her what she's won!
            alert(prizes[btnNum]);
        };
    }
</script>


// 19
// Implement a queue ↴ with 2 stacks. ↴ Your queue should have an enqueue and a dequeue function and it should be "first in first out" (FIFO)

// enqueue: push into inStack
// dequeue: if outStack is empty, push all inStack items into outStack
              // pop from outStack

function Queue(){
  this.inStack = [];
  this.outStack = [];
}

Queue.prototype.enqueue = function(el){
  this.inStack.push(el);
}

Queue.prototype.dequeue = function(){
  if(this.outStack.length === 0){
    while(this.inStack.length !== 0){
      let item = this.inStack.pop();
      this.outStack.push(item);
    }
    if(this.outStack.length === 0){
      return undefined;
    }
  }

  return this.outStack.pop();
}


// 20
// You want to be able to access the largest element in a stack.
// You've already implemented this Stack class:

function Stack() {
    // initialize an empty array
    this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
    this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {

    // if the stack is empty, return null
    // (it would also be reasonable to throw an exception)
    if (!this.items.length) {
        return null;
    }
    return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
    if (!this.items.length) {
        return null;
    }
    return this.items[this.items.length -1];
};


// Use your Stack class to implement a new class MaxStack with a function getMax() that returns the largest element in the stack. getMax() should not remove the item.

class MaxStack(){
  initialize(){
    this.stack = new Stack;
    this.maxTracker = new Stack;
  }

  push(el){
    if(this.maxTracker.peek() && this.maxTracker.peek() <= el){
      this.maxTracker.push(el)
    }

    this.stack.push(el);
  }

  pop(){
    let item = this.stack.pop();
    if(this.maxTracker.peek() && this.maxTracker.peek() === item){
      this.maxTracker.pop();
    }
    return item;
  }

  getMax(){
    return this.maxTracker[this.maxTracker.length - 1];
  }
}

// 21
// Given the array of IDs, which contains many duplicate integers and one unique integer, find the unique integer.

function findUnique(array){
  let unique = 0;

  for(let i = 0; i < array.length; i++){
    unique ^= array[i];
  }

  return unique;
}


// 22
// Delete a node from a singly-linked list, ↴ given only a variable pointing to that node.
// The input could, for example, be the variable b below:

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var a = new LinkedListNode('A');
var b = new LinkedListNode('B');
var c = new LinkedListNode('C');
a.next = b;
b.next = c;

function deleteNode(node){
  let next = node.next;

  if(next){
    node.value = next.value;
    node.next = next.next;
  } else {
    throw new Error("can not delete the last node");
  }

  return node;
}

// 23

// You have a singly-linked list ↴ and want to check if it contains a cycle.
function LinkedListNode(value) {
  this.value = value;
  this.next = null;
}

let a = new LinkedListNode('A');
let b = new LinkedListNode('B');
let c = new LinkedListNode('C');
let d = new LinkedListNode('D');
let e = new LinkedListNode('E');

a.next = b;
b.next = c;
c.next = d;
d.next = e;
e.next = c;

function checkCycle(node){
  let slowRunner = node;
  let fastRunner = node.next.next;

  while(slowRunner && fastRunner !== null){
    if(slowRunner.value === fastRunner.value){
      return true;
    }
    slowRunner = slowRunner.next;
    fastRunner = fastRunner.next.next;
  }

  return false;
}

// 24
// Write a function for reversing a linked list. ↴ Do it in-place. ↴
// Your function will have one input: the head of the list.
// Your function should return the new head of the list.
// Here's a sample linked list node class:

function LinkedListNode(value) {
  this.value = value;
  this.next = null;
}

let a = new LinkedListNode('A');
let b = new LinkedListNode('B');
let c = new LinkedListNode('C');

a.next = b;
b.next = c;

function reverse(node){
  let previous = null;
  let current = node;
  let next = null;

  while(current){
    next = current.next;
    current.next = previous;

    previous = current;
    current = next;
  }

  return previous;
}

// 25
// Write a function kthToLastNode() that takes an integer kk and the headNode of a singly-linked list, and returns the kkth to last node in the list.

function LinkedListNode(value) {
    this.value = value;
    this.next = null;
}

var a = new LinkedListNode("Angel Food");
var b = new LinkedListNode("Bundt");
var c = new LinkedListNode("Cheese");
var d = new LinkedListNode("Devil's Food");
var e = new LinkedListNode("Eccles");

a.next = b;
b.next = c;
c.next = d;
d.next = e;

function kthToLastNode(num, head){
  let current = head;
  let fast = head;

  for(let i = 0; i < num; i++){
    fast = fast.next;
  }

  while(fast){
    current = current.next;
    fast = fast.next;
  }

  return current.value;
}

kthToLastNode(2, a);


// 26
// Reverse String
function reverseInPlace(string){
  let a = string.split("")

  let startIndex = 0;
  let endIndex = string.length - 1;

  while(startIndex < endIndex){
    let temp = a[startIndex];
    a[startIndex] = a[endIndex];
    a[endIndex] = temp;
    startIndex ++;
    endIndex --;
  }

  return a.join("");
}
