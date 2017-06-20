// Find the largest sum of a contiguous subarray.
// For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
// the contiguous subarray [4,-1,2,1] has the largest sum = 6.

var maxSubArray = function(arr) {
  let currentSum = 0;
  let maxSum = arr[0] || 0;

  for(let i = 0; i < arr.length; i++){
    currentSum += arr[i];
    if(currentSum > maxSum){
      maxSum = currentSum;
    }
    if(currentSum < 0){
      currentSum = 0;
    }
  }
  return maxSum;
};


///////////////////////////////////////////////////////////////
// spiral order

var spiralOrder = function(matrix) {

  let answer = [];

  while(true){
    //first row
    if(matrix.length === 0 || matrix[0].length === 0) break;
    answer = answer.concat(matrix.shift());

    //rightside
    if(matrix.length === 0 || matrix[0].length === 0) break;
    for(let i = 0; i < matrix.length; i++){
      answer.push(matrix[i].pop());
    }

    //bottom
    if(matrix.length === 0 || matrix[0].length === 0) break;
    answer = answer.concat(matrix.pop().reverse());

    //leftside
    if(matrix.length === 0 || matrix[0].length === 0) break;
    for(let i = matrix.length - 1; i >=0 ; i--){
      answer.push(matrix[i].shift());
    }
  }

    return answer;
};

// spiralOrder(a)

////////////////////////////////////////////////////////
//plus one

var plusOne = function(digits) {
  if(digits[digits.length - 1] === 9){

    let index = digits.length - 1;
    digits[index] = 0;
    index -= 1;

    while(digits[index] === 9){
      digits[index] = 0;
      index-=1;
    }

    if(index < 0){
      digits.unshift(1);
    } else{
      digits[index] += 1;
    }

  } else {
    digits[digits.length - 1] += 1;
  }
  return digits;
};


/////////////////////////////////////////////////////////////
//ZigZag

// convert("john", 3)
// [ ["j", ""]
//   ["o", "n"]
//   ["h", ""] ]

// convert("john", 4)
// [ ["j", ""]
//   ["o", ""]
//   ["h", "n"]
//   ["n",  ""]]

var convert = function(s, numRows) {

  if(numRows <= 1){
    return s;
  }

  let matrix = [];
  for(let i = 0; i < numRows; i++){
    matrix.push([]);
  }

  let row = 0;
  let col = 0;
  let ascending = true;

  for(let i = 0; i < s.length; i++){
    let letter = s[i];
    matrix[row][col] = letter;

    if(row === numRows - 1 || row === 0){
      ascending = ascending ? false : true;
    }

    if(ascending){
      row -= 1;
      col += 1;
    } else {
      row += 1;
    }
  }

  let answer = "";
  for(let i = 0; i < numRows; i++){
    answer += matrix[i].join("");
  }

  return answer;
};

///////////////////////////////////////////////////////////
// sum three closest

var threeSumClosest = function(nums, target) {
  let closest = -Infinity;
  let difference = 0;

  nums.sort(function(a, b){
    return a-b;
  });

  for(let i = 0; i < nums.length; i++){

    let j = i + 1;
    let k = nums.length - 1;

    while(j < k){
      let sumThree = nums[i] + nums[j] + nums[k];
      // console.log(" ")
      // console.log(`j is ${j} and k is ${k}`)
      // console.log(`sumThree: ${sumThree}`)
      // console.log(`closest: ${closest}`)
      // console.log(`difference: ${difference}`)

      if(closest === - Infinity){
        closest = sumThree;
        difference = Math.abs(closest - target);
      }
      // else if (Math.abs(sumThree - target) > difference){
      //   console.log(Math.abs(sumThree -target))
      //   return closest;
      // }
      else if(Math.abs(sumThree - target) < difference) {
        closest = sumThree;
        difference = Math.abs(closest - target);
      }

      if(sumThree > target){
        k--;
      }
      else if(sumThree < target){
        j++;
      }
      else {
        return sumThree;
      }
    }
  }

  return closest;
};

///////////////////////////////////////////////
// sum four true false

var fourSum = function(nums, target) {
  nums.sort(function(a,b){
    return a - b;
  });

  for(let i = 0; i <= nums.length - 4; i++){
    let j = i + 1;
    let k = nums.length - 1;
    let l = k - 1;

    while(true){
      let sumAll = nums[i] + nums[j] + nums[l] + nums[k];

      if(sumAll === target){
        return true;
      }
      else if(sumAll > target){

        if(l - 1 > j){
          l--;
        }
        else if(k - 1 > l){
          k--;
        }
        else {
          break;
        }
      }
      else if(sumAll < target){
        if(l - 1 > j){
          j++;
        }
        else {
          break;
        }
      }
    }
  }
  return false;
};

/////////////////////////////////////////////////////////
// remove an element
var removeElement = function(nums, val) {
    let length = nums.length;

    for(let i = 0; i < length; i++){
        if(nums[i] === val){
            nums.splice(i,1);
            i--;
            length--;
        }
    }
    return nums.length;
};

////////////////////////////////////////////////////////
//longest valid parentheses

var longestValidParentheses = function(s) {
  let stack = [];
  let longest = 0;

  for(let i = 0; i < s.length; i++){
    if(s[i] === "("){
      stack.push(i);
    }
    else if (s[i] === ")"){
      if(s[stack[stack.length - 1]] === "("){
        stack.pop();
      }
      else {
        stack.push(i);
      }
    }
  }

  if(stack.length === 0){
    return s.length;
  }

  let a = s.length;
  let b = 0;
  while(stack.length !== 0){
    b = stack.pop();
    longest = Math.max(longest, a-b-1);
    a = b;
  }

  longest = Math.max(longest, a);
  return longest;
};

/////////////////////////////////////////////////////
// search for index;

var searchInsert = function(nums, target) {
  for(let i = 0; i < nums.length; i ++){
    if(nums[i] >= target){
      return i;
    }
  }
  return nums.length;
};

///////////////////////////////////////////////
//swap head

var swapPairs = function(head) {
  if(head === null || head.next === null){
    return head;
  }

  let a = null;
  let b = head;
  let c = b.next;
  let newHead = b.next;

  while(c !== null){
    if(a !== null){
      a.next = c;
    }

    b.next = c.next;
    c.next = b;

    a = b;
    b = a.next;

    if(b === null){
      return newHead;
    }
    else {
      c = b.next;
    }
  }

  return newHead;
};
