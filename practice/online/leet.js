function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
    let listLinkHead = new ListNode(0);
    let current = listLinkHead;
    let carry = 0;
    let x
    let y
    let sum

    while(l1 || l2){
        x = l1 ? l1.val : 0;
        y = l2 ? l2.val : 0;
        sum = x + y + carry

        current.next = new ListNode(sum%10)
        current = current.next

        carry = sum >= 10 ? 1 : 0;

        l1 = l1? l1.next : 0
        l2 = l2? l2.next : 0
    }

    if(carry > 0){
        current.next = new ListNode(carry);
    }

    return listLinkHead.next
}

/////////////////////////////////////////////////////
//Length of Longest Substrings

function lengthOfLongestSubstring(s) {
  let len = s.length

  if(len <= 1) return len

  let lookup = {}
  let max = 0
  let start = 0

  for (let i = 0; i < len; i++) {
    let c = s[i]

    if (lookup.hasOwnProperty(c) && lookup[c] >= start) {
      start = lookup[c] + 1
    }

    lookup[c] = i

    max = Math.max(max, i - start + 1)
  }

  return max;
}

/////////////////////////////////////////////////////
//Find Median from two sorted arrays

function median(array1,array2){
  let combine = [];
  let copy1 = array1.slice();
  let copy2 = array2.slice();

  while(copy1.length !== 0 && copy2.length !== 0){
    if(copy1[0] < copy2[0]){
      combine.push(copy1.shift());
    } else {
      combine.push(copy2.shift());
    }
  }

  combine = combine.concat(copy1).concat(copy2);

  let midIndex = Math.floor(combine.length / 2);

  if(combine.length %2 === 0){
    combine = combine.slice(midIndex - 1, midIndex + 1);
    return (combine[0] + combine[1])/2;
  } else {
    return combine.slice(midIndex, midIndex + 1)[0];
  }
}

////////////////////////////////////////////////////////
//longest Palidrome

// var maxLength = 0;
// var startingPoint = 0;
//
// function longestPalindrome(s) {
//   if(s.length <= 1) return s;
//
//   for(let i = 0; i < s.length; i++){
//     expand(s, i, i); // odd number
//     expand(s, i, i + 1); // even number
//   }
//   let endingPoint = maxLength - startingPoint;
//   return s.slice(startingPoint, endingPoint);
// }
//
// function expand(string, j, k){
//   while(j >= 0 && k < string.length){
//     j--;
//     k++;
//   }
//   if(maxLength < k - j + 1){
//     startingPoint = j + 1;
//     maxLength = k - j + 1;
//   }
// }


var maxWord = "";
var startingPoint = 0;

function longestPalindrome(s) {
  if(s.length <= 1) return s;

  for(let i = 0; i < s.length; i++){
    expand(s, i, i); // odd number
    expand(s, i, i + 1); // even number
  }
  // let endingPoint = maxWord.length - startingPoint;
  // return s.slice(startingPoint, endingPoint);
  return maxWord;
}

function expand(string, j, k){
  while(j >= 0 && k < string.length && string[j] === string[k]){
    j--;
    k++;
  }

  let currentWord = string.slice(j+1, k);
  if(maxWord.length <= currentWord.length){
    startingPoint = j + 1;
    maxWord = currentWord;
  }
}

/////////////////////////////////////////////////
//missing number

var missingNumber = function(nums) {
    var n = nums.length;
    var sum = ((n*n) + n) / 2; //Triangular series formula. Get the sum of range(0..nums.length)
    var currentSum = 0;

    for(var i = 0; i < nums.length; i++){
        currentSum += nums[i];
    }

    return sum - currentSum;
};

///////////////////////////////////////////////////
//longest prefix

let longestCommonPrefix = function(strs) {
  let common = strs[0];
  let i = 1;

  while(i < strs.length){
    while(strs[i].indexOf(common) !== 0){
      common = common.slice(0, common.length - 1);
    }
    i++;
  }
  return common;
};

// longestCommonPrefix(["hello", "he", "helmet"])

///////////////////////////////////////////////////
//threeSum

// For example, given array S = [-1, 0, 1, 2, -1, -4],
// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

function threeSum(nums) {
  let answer = [];
  nums.sort(function(a,b){
    return a - b;
  });

  for(let i = 0; i <= nums.length - 3; i++){
    if(i === 0 || nums[i] > nums[i - 1]){
      let j = i + 1;
      let k = nums.length - 1;

      while(j !== k){
        if(nums[i] + nums[j] + nums[k] === 0){
          answer.push([nums[i], nums[j], nums[k]]);

        }

        if(nums[i] + nums[j] + nums[k] < 0){
          let currentj = j;
          while(nums[currentj] === nums[j] && j < k){
            nums[currentj] = nums[j];
            j++;
          }
        }
        else{
          let currentk = k;
          while(nums[currentk] === nums[k] && j < k){
            nums[currentk] = nums[k];
            k--;
          }
        }
      }
    }
  }
  return answer;
}

/////////////////////////////////////////////////////////////
//Phone text:

var letterCombinations = function(digits) {
    if(digits.length === 0) return [];
    let phone = {
        1 : ["*"],
        2 : ["a", "b", "c"],
        3 : ["d", "e", "f"],
        4 : ["g", "h", "i"],
        5 : ["j", "k", "l"],
        6 : ["m", "n", "o"],
        7 : ["p", "q", "r", "s"],
        8 : ["t", "u", "v"],
        9 : ["w", "x", "y", "z"],
        0 : []
    };

    let answer = phone[parseInt(digits[0])];
    let subAnswer = [];
    for(let digitIndex = 1; digitIndex < digits.length; digitIndex++){

      let compare = phone[digits[digitIndex]];
      for(let answerIndex = 0; answerIndex < answer.length; answerIndex ++){
        for(let compareIndex = 0; compareIndex < compare.length; compareIndex ++){
          subAnswer.push(answer[answerIndex] + compare[compareIndex]);
        }
      }
      answer = subAnswer;
      subAnswer = [];
    }
    return answer;
};

///////////////////////////////////////////////////////////////////
//linked list question: delete kth node

var removeNthFromEnd = function(head, n) {
    let firstNode = head;
    let secondNode = head;
    let previousNode = null;

    if(head.next === null){
        return [];
    }

    let size = 0;
    while(size < n && firstNode.next !== null){
        firstNode = firstNode.next;
        size ++;
    }

    while(firstNode !== null){
        firstNode = firstNode.next;
        previousNode = secondNode;
        secondNode = secondNode.next;
    }

    if(size === n){
        previousNode.next = secondNode.next;
        secondNode.next = null;
    }
    else {
        head = head.next;
    }

    return head;
};

/////////////////////////////////////////////////////
//find the index the target number from an array of sorted but rotated array.

//[3,4,5,6,1,2,], target 2 == 5

//binary search revision. compare the front number with the mid number.

var search = function(nums, target) {
  let front = nums[0];
  let midIndex = Math.floor(nums.length/2);

  if(target === nums[midIndex]){
    return midIndex;
  }else if(nums.length <= 1){
    return -1;
  }

  //go left
  if(front > nums[midIndex]){
    if(target >= front || target < nums[midIndex]){
      return search(nums.slice(0, midIndex), target);
    }
  }
  else if(front < nums[midIndex]){
    if(target >= front && target < nums[midIndex]){
      return search(nums.slice(0, midIndex), target);
    }
  }

  //go right
  let results = search(nums.slice(midIndex + 1, nums.length), target);
  return results === -1 ? -1 : results + 1 + midIndex;
};

////////////////////////////////////////////////////////////
//search for a range

var searchRange = function(nums, target) {
  let min = 0;
  let max = nums.length - 1;

  //binary search here.
  while( min <= max ){
    let midIndex = Math.floor((max + 1 + min)/2);

    if(nums[midIndex] === target){
      //go left and right until you find the starting and the ending point
      return sparse(nums, midIndex, target);
    }
    else if(nums[midIndex] > target){
      //check left
      max = midIndex - 1;
    }
    else {
      min = midIndex + 1;
    }
  }

  return [-1, -1];
};

function sparse(a, midIndex, target){
  let startingPoint = midIndex;
  let endingPoint = midIndex;
  while((startingPoint >= 0 || endingPoint < a.length) && (a[startingPoint] === target || a[endingPoint] === target)){
    if(a[startingPoint] === target){
      startingPoint -= 1;
    }
    if(a[endingPoint] === target){
      endingPoint += 1;
    }
  }
  return [startingPoint + 1, endingPoint - 1];
}

//different solution
var searchRange = function(nums, target) {
    let arrayOfIndex = [];

    for(let i = 0; i < nums.length; i++){
        if(nums[i] === target){
            arrayOfIndex.push(i);
        }
    }

    if(arrayOfIndex.length === 0){
        return [-1,-1];
    }

    if(arrayOfIndex.length === 1){
        return [arrayOfIndex[0], arrayOfIndex[0]];
    }

    return [arrayOfIndex[0], arrayOfIndex[arrayOfIndex.length - 1]];
};
var searchRange = function(nums, target) {
    let arrayOfIndex = [];

    for(let i = 0; i < nums.length; i++){
        if(nums[i] === target){
            arrayOfIndex.push(i);
        }
    }

    if(arrayOfIndex.length === 0){
        return [-1,-1];
    }

    if(arrayOfIndex.length === 1){
        return [arrayOfIndex[0], arrayOfIndex[0]];
    }

    return [arrayOfIndex[0], arrayOfIndex[arrayOfIndex.length - 1]];
};

/////////////////////////////////////////////////////////////////////////
//check if unfinished board is a valid sudoku game.

var isValidSudoku = function(board) {
  let colSet = {
    0: new Set(),
    1: new Set(),
    2: new Set(),
    3: new Set(),
    4: new Set(),
    5: new Set(),
    6: new Set(),
    7: new Set(),
    8: new Set()
  }

  let subBoxes = {
    '[0,0]': new Set(),
    '[0,1]': new Set(),
    '[0,2]': new Set(),
    '[1,0]': new Set(),
    '[1,1]': new Set(),
    '[1,2]': new Set(),
    '[2,0]': new Set(),
    '[2,1]': new Set(),
    '[2,2]': new Set()
  }

  for(let row = 0; row < board.length; row ++){
    let rowSet = new Set();
    for(let col = 0; col < board.length; col ++){
      if(board[row][col] !== "."){
        //row and col
        if(rowSet.has(board[row][col])) return false;
        if(colSet[col].has(board[row][col])) return false;

        //subBoxes
        //[
          // [0,0], [0,1], [0,2],
          // [1,0], [1,1], [1,2],
          // [2,0], [2,1], [2,2]
        // ]

        let rowIndex = Math.floor(row/3);
        let colIndex = Math.floor(col/3);

        if(subBoxes[`[${rowIndex},${colIndex}]`].has(board[row][col])){
          return false;
        }

        //add to sets 
        rowSet.add(board[row][col]);
        colSet[col].add(board[row][col]);
        subBoxes[`[${rowIndex},${colIndex}]`].add(board[row][col]);
      }
    }
  }
  return true;
};
