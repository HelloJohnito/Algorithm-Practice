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
