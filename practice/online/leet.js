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

var maxLength = 0;
var startingPoint = 0;

function longestPalindrome(s) {
  if(s.length <= 1) return s;

  for(let i = 0; i < s.length; i++){
    expand(s, i, i); // odd number
    expand(s, i, i + 1); // even number
  }
  let endingPoint = maxLength - startingPoint;
  return s.slice(startingPoint, endingPoint);
}

function expand(string, j, k){
  while(j >= 0 && k < string.length){
    j--;
    k++;
  }
  if(maxLength < k - j + 1){
    startingPoint = j + 1;
    maxLength = k - j + 1;
  }
}
