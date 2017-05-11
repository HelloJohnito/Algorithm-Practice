//Web crawler, how to save space. Instead of using a set what can you use to save storage.
//tries
function webCrawlerNewStorage(word, startRoot){
  let root = startRoot || {};
  let currentNode = root;
  let isNewWord = false;

  for(let i = 0; i < word.length; i++){
    let char = word[i];

    if (!currentNode.hasOwnProperty(char)){
      isNewWord = true;
      currentNode[char] = {};
    }

    currentNode = currentNode[char];
  }

  if(!currentNode.hasOwnProperty("end")){
    isNewWord = true;
    currentNode["end"] = {};
  }
  
  return isNewWord;
}

// console.log(webCrawlerNewStorage("hi",
//  {"h": {"i": { "end":{} }}} ));
// console.log(webCrawlerNewStorage("google"));


////////////////////////////////////////////////////////////

// Find the index of the beginning element of this rotated array.

//my solution
function dictionaryBinarySearch(array, front){
  let first = front || array[0];
  let midIndex = Math.floor(array.length / 2);
  let currentEl = array[midIndex];
  let leftEl = array[midIndex - 1];

  if(leftEl > currentEl || leftEl === undefined){
    return midIndex;
  }
  else if(currentEl < first){
    return dictionaryBinarySearch(array.slice(0, midIndex), first);
  }
  else if(currentEl >= first){
    return dictionaryBinarySearch(array.slice(midIndex + 1, array.length), midIndex, first) + midIndex + 1;
  }
}


// interview solution

function findRotationPoint(words) {
  const firstWord = words[0];

  var floorIndex = 0;
  var ceilingIndex = words.length - 1;

  while (floorIndex < ceilingIndex) {

      // guess a point halfway between floor and ceiling
      var guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

      // if guess comes after first word or is the first word
      if (words[guessIndex] >= firstWord) {
          // go right
          floorIndex = guessIndex;
      } else {
          // go left
          ceilingIndex = guessIndex;
      }

      // if floor and ceiling have converged
      if (floorIndex + 1 === ceilingIndex) {

          // between floor and ceiling is where we flipped to the beginning
          // so ceiling is alphabetically first
          break;
      }
  }

  return ceilingIndex;
}


/////////////////////////////////////////////////////////////////////
// two sum

function canTwoMoviesFillFlight(movieLengths, flightLength) {

  // movie lengths we've seen so far
  var movieLengthsSeen = new Set();

  for (var i = 0; i < movieLengths.length; i++) {
      var firstMovieLength = movieLengths[i];

      var matchingSecondMovieLength = flightLength - firstMovieLength;
      if (movieLengthsSeen.has(matchingSecondMovieLength)) {
          return true;
      }

      movieLengthsSeen.add(firstMovieLength);
  }

  // we never found a match, so return false
  return false;
}

//////////////////////////////////////////////////////////////////////
//nth fib non recursive


function fib(n) {

  // edge cases:
  if (n < 0) {
      throw new Error('Index was negative. No such thing as a negative index in a series.');
  } else if (n === 0 || n === 1) {
      return n;
  }

  // we'll be building the fibonacci series from the bottom up
  // so we'll need to track the previous 2 numbers at each step
  var prevPrev = 0;  // 0th fibonacci
  var prev = 1;      // 1st fibonacci
  var current;       // Declare current

  for (var i = 1; i < n; i++) {
      // Iteration 1: current = 2nd fibonacci
      // Iteration 2: current = 3rd fibonacci
      // Iteration 3: current = 4th fibonacci
      // To get nth fibonacci ... do n-1 iterations.
      current = prev + prevPrev;
      prevPrev = prev;
      prev = current;
  }

  return current;
}

////////////////////////////////////////////////////////////////////////
//knapsack

function maxDuffelBagValue(cakeTypes, weightCapacity) {

  // we make an array to hold the maximum possible value at every
  // duffel bag weight capacity from 0 to weightCapacity
  // starting each index with value 0
  var maxValuesAtCapacities = [];
  for (var i = 0; i <= weightCapacity; i++) {
      maxValuesAtCapacities[i] = 0;
  }

  for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {

      // set a variable to hold the max monetary value so far for currentCapacity
      var currentMaxValue = 0;

      // we use a for loop here instead of forEach because we return infinity
      // if we get a cakeType that weighs nothing and has a value. but forEach
      // loops always return undefined and you can't break out of them without
      // throwing an exception
      for (var j = 0; j < cakeTypes.length; j++) {
          var cakeType = cakeTypes[j];

          // if a cake weighs 0 and has a positive value the value of our duffel bag is infinite!
          if (cakeType.weight === 0 && cakeType.value !== 0) {
              return Infinity;
          }

          // if the current cake weighs as much or less than the current weight capacity
          // it's possible taking the cake would give get a better value
          if (cakeType.weight <= currentCapacity) {

              // so we check: should we use the cake or not?
              // if we use the cake, the most kilograms we can include in addition to the cake
              // we're adding is the current capacity minus the cake's weight. we find the max
              // value at that integer capacity in our array maxValuesAtCapacities
              var maxValueUsingCake = cakeType.value + maxValuesAtCapacities[currentCapacity - cakeType.weight];

              // now we see if it's worth taking the cake. how does the
              // value with the cake compare to the currentMaxValue?
              currentMaxValue = Math.max(maxValueUsingCake, currentMaxValue);
          }
      }

      // add each capacity's max value to our array so we can use them
      // when calculating all the remaining capacities
      maxValuesAtCapacities[currentCapacity] = currentMaxValue;
  }

  return maxValuesAtCapacities[weightCapacity];
}

//////////////////////////////////////////////////////////////////////////////////////
//queue with two stacks

class stackQueue{
  constructor(){
    this.stackIn = [];
    this.stackOut = [];
  }

  enqueue(num){
    this.stackIn.push(num);
  }

  dequeue(){
    if(this.stackOut.length === 0){
      while(this.stackIn.length !== 0){
        this.stackOut.push(this.stackIn.pop());
      }
    }

    return this.stackOut.pop();
  }
}

///////////////////////////////////////////////////////
// Max Stack

class maxstack{

  constructor(){
    this.stack = [] ;
    this.stackRecord = [];
    this.max = null;
  }

  getMax(){
    return this.max;
  }

  push(item){
    if(this.max === null){
      this.max = item;
    }
    else if(item >= this.max){
      this.stackRecord.push(this.max);
      this.max = item;
    }
    this.stack.push(item);
  }

  pop(){
    let popItem = this.stack.pop();
    if(popItem === this.max){
      this.max = this.stackRecord.pop();
    }
    return popItem;
  }
}

// test = new maxstack()

///////////////////////////////////////////////////
// find the unique integer inside the array in o(1) space and o(n) time


function findUniqueDeliveryId(deliveryIds) {

    var uniqueDeliveryId = 0;

    deliveryIds.forEach(function(deliveryId) {
        uniqueDeliveryId ^= deliveryId;
    });

    return uniqueDeliveryId;
}

// findUniqueDeliveryId([1,2,2,3,1])

//////////////////////////////////////////////////////////////////////////
//Delete a Node from a linked list.


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
  let nextNode= node.next;
  node.value = nextNode.value;
  node.next = node.next.next;
}


////////////////////////////////////////////////////
// is this singlely linked list contain a cycle

function containsCycle(node){
  let speed1 = node;
  let speed2 = node.next.next;

  while(speed2 !== null && speed1 !== speed2){
    speed1 = speed1.next;
    speed2 = speed2.next.next;

  }

  if(speed1 === speed2){
    return true;
  }else{
    return false;
  }
}
