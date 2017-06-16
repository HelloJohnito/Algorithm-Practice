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
