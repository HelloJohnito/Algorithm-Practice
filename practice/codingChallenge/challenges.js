//Check is the strings are permutations of each other.

function checkPerm(string1, string2){

  if (string1.length === 0 || string1.length !== string2.length) {
    return false;
  }

  let map = new Map();
  for(let i = 0; i < string1.length; i++){
    map.set(string1[i], map.has(string1[i]) ? map.get(string1[i]) + 1 : 1 );
  }


  for(let j = 0; j < string2.length; j++){
    if(map.has(string2[j])){
      if(map.get(string2[j]) === 1){
        map.delete(string2[j]);
      }
      else {
        map.set(string2[j], map.get(string2[j]) - 1) ;
      }
    }
    else {
      return false;
    }
  }
  return map.size === 0;
}


////////////////////////////////////////////////////////
//replace space with %20;

function encodeSpaces(url) {
  if (!url || url.length === 0) {
    return url;
  }

  let spaceCount = 0;
  for (let i = 0; i < url.length; ++i) {
    if (url[i] === ' ') {
      ++spaceCount;
    }
  }

  let newLength = url.length + 2 * spaceCount;

  let newUrl = [];
  for(let i = url.length - 1; i >= 0; i--){
    if(url[i] === " "){
      newUrl[newLength - 1] = "0";
      newUrl[newLength - 2] = "2";
      newUrl[newLength - 3] = "%";
      newLength -= 3;
    }
    else {
      newUrl[newLength - 1] = url[i];
      newLength -= 1;
    }
  }
  return newUrl.join("");
}

//////////////////////////////////////////////////////////
//One Edit away:

function oneAway(str1, str2){
  if(Math.abs(str1.length - str2.length) > 1){
    return false;
  }

  let smallerString = str1.length >= str2.length ? str2 : str1;
  let largerString =  str1.length < str2.length ? str2 : str1;

  let index1 = 0;
  let index2 = 0;
  let editedOnce = false;

  while(index1 < smallerString.length && index2 < largerString.length){
    if(smallerString[index1] === largerString[index2]){
      index1 ++;
      index2 ++;
    }
    else{
      if(editedOnce){
        return false;
      }else{
        editedOnce = true;
        if(smallerString.length === largerString.length){
          index1 ++;
          index2 ++;
        }else{
          index2 ++;
        }
      }
    }
  }
  return true;
}

/////////////////////////////////////////////////////////////
//String compression aaabbbcc = a3b3c2

function stringCompression(string){
  let count = 1;
  let currentLetter = string[0];
  let answer = "";

  for(let i = 1; i < string.length; i++){
    if(currentLetter === string[i]){
      count += 1;
    }
    else {
      answer += currentLetter + count.toString();
      currentLetter = string[i];
      count = 1;
    }
  }
  answer += currentLetter + count.toString();
  return answer;
}


/////////////////////////////////////////////////
// rotate array.

//TRY AGAIN...

array = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

array2 = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16]
];


function rotateMatrix(array){
  let answerArray = array.slice();
  let rotatingValues = array[0].slice();
  let lastNumStack = [];

  for(let i = 1; i < array.length; i++){
    if(i !== array.length - 1){
      rotatingValues.push(array[i][array[i].length -1])
      lastNumStack.push(array[i][0]);
    }
    else{
      let reverse = array[i].slice();
      reverse.reverse();
      rotatingValues = rotatingValues.concat(reverse);
    }
  }

  for(i = lastNumStack.length - 1; i >= 0; i --){
    rotatingValues.push(lastNumStack[i])
  }

  let numberToRotate = array.length - 1;
  let rotatedValues = rotate(rotatingValues, numberToRotate);
  let answerArray[0] = rotatedValues.splice(0, answerArray.length);

  for(let i = 1; i < answerArray.length; i++){

    if(i !== answerArray.length - 1){
      answerArray[i][0] = rotatedValues.pop();
      answerArray[i][answerArray[i].length - 1] = rotatedValues.shift();
    }
    else {
      answerArray[i] = rotatedValues.reverse();
    }
  }
  return answerArray;
}

function rotate(originalArray, num = 1){
  let rotatedArray =[];
  for(let i = 0; i < originalArray.length; i++){
    let rotateIndex = (i + num) % (originalArray.length);
    rotatedArray[rotateIndex] = originalArray[i];
  }
  return rotatedArray;
}

// rotateMatrix(array)

/////////////////////////////////////////////////////////////
//Zero Matrix

function zeroMatrix(matrix){
  let setRow = new Set();
  let setCol = new Set();

  for(let row = 0; row < matrix.length - 1; row++){
    for(let col = 0; col < matrix[row].length -1; col ++){
      if(matrix[row][col] === 0){
        setRow.add(row);
        setCol.add(col);
      }
    }
  }

  let i;
  //check Row
  for(i = 0; i < matrix.length - 1; i++){
    if(setRow.has(i)){
      setRowToZero(matrix, i);
    }
  }

  //check col
  for(i = 0; i < matrix.length - 1; i++){
    if(setCol.has(i)){
      setColToZero(matrix, i);
    }
  }

  return matrix;
}

function setRowToZero(matrix, row){
  for(let i = 0; i < matrix[0].length; i++){
    matrix[row][i] = 0;
  }
}

function setColToZero(matrix, col){
  for(let i = 0; i < matrix.length; i++){
    matrix[i][col] = 0;
  }
}

// zeroMatrix([[0,2,3],[4,5,6]])

//////////////////////////////////////////////////////
//String Rotation
//assume you have access to toSubstring which returns true is the word is a substring of another. With this method, create stringRotation that checks if a string is a rotation of the other.

function stringRotation(str1, str2){
  if(str1.length === str2.length && str1.length > 0){
    let str1str1 = str1 + str1;
    return toSubstring(str1str1, str2); // given method
    //bottlewaterbottlewater is substring of waterbottle and it is rotated.
  }
  else{
    return false;
  }

}

//////////////////////////////////////////////////////////
//linked lists

class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}


class LinkedList {
  constructor(startingValue){
    this.head = new Node(startingValue);
    this.tail = null;
  }

  add(value){
    if(this.tail === null){
      this.tail = new Node(value);
      this.head.next = this.tail;
    }
    else {
      this.tail.next = new Node(value);
      this.tail = this.tail.next;
    }
    return true;
  }

  /////////////////////////////////////////////////////
  //remove Dups
  removeDup(){
    let current = this.head;
    let holder = new Set();
    while(current.next !== null){
      console.log(current)
      if(holder.has(current.next.value)){
        current.next = current.next.next;
        if (current.next === null) break;
      }
      else{
        holder.add(current.value);
      }
      current = current.next;
    }
  }

  ////////////////////////////////////////////////////////////
  //kth from the end Linked List
  kthFromEnd(k){
    let first = this.head;
    let second = this.head;
    for(let i = 0; i < k - 1; i++){
      first = first.next;
    }

    while(first.next !== null){
      first = first.next;
      second = second.next;
    }
    return second
  }
}

// let l = new LinkedList(2)
// l.add(4)
// l.add(5)
// l.add(2)
// l.removeDup()
// l.head

///////////////////////////////////////////////////
//sum of linked list backward

//example: 617 + 295 = 912 :: 7->1->6 + 5->9->2

function sumLinkedBackward(link1, link2){
  let linkOne = link1.head;
  let linkTwo = link2.head;
  let remainder = 0;
  let value;
  let sum;

  solutionLink = new LinkedList(null);
  let solutionNode = solutionLink.head
  while (linkOne !== null && linkTwo !== null){
    sum = linkOne.value + linkTwo.value + remainder;
    value = sum % 10;
    remainder = Math.floor(sum/10);

    solutionNode.next = new Node(value)
    solutionNode = solutionNode.next;
    linkOne = linkOne.next;
    linkTwo = linkTwo.next;
  }

  if(linkOne !== null){
    while(linkOne !== null){
      value = linkOne.value + remainder
      solutionNode.next = new Node(value);
      remainder = 0;
      solutionNode = solutionNode.next
      linkOne = linkOne.next
    }
  } else if(linkTwo !== null){
      value = linkTwo.value + remainder
      solutionNode.next = new Node(value);
      remainder = 0;
      solutionNode = solutionNode.next;
      linkTwo = linkTwo.next;
  }

  if(remainder > 0){
    solutionNode.next = new Node(remainder);
  }

  return solutionLink.head.next
}

//example: 617 + 295 = 912 :: 6->1->7 + 2->9->5

// not finished
// function sumLinkedForward(link1, link2){
//   let linkOne = link1.head;
//   let linkTwo = link2.head;
//   let remainder = 0;
//   let sum;
//
//   solutionLink = new LinkedList(null);
//   let solutionNode = solutionLink.head
//
//   let previousValue = linkOne.value + linkTwo.value;
//   if(previousValue >= 10){
//     solutionNode.next = new Node(previousValue / 10);
//     previousValue = Math.floor(previousValue % 10);
//     solutionNode = solutionNode.next
//   }
//
//   linkOne = linkOne.next;
//   linkTwo = linkTwo.next;
//
//   while (linkOne !== null && linkTwo !== null){
//     let sum = linkOne.value + linkTwo.value;
//
//     if(sum >= 10){
//       currentValue = sum % 10;
//       remainder = Math.floor(sum/10);
//       previousValue += remainder;
//     }
//     else {
//       remainder = 0;
//       currentValue = sum;
//     }
//
//     solutionNode.next = new Node(previousValue);
//     solutionNode = solutionNode.next;
//     previousValue = currentValue;
//     linkOne = linkOne.next;
//     linkTwo = linkTwo.next;
//   }
//
//   solutionNode.next = new Node(previousValue);
//   return solutionLink.head.next
// }

///////////////////////////////////////////////////////
//Palindrome






///////////////////////////////////////////////////////
//find the start of the loop

function startOfLoop(head){
  //first we want to find the collision point
    // where fast === slow
  //When you find the collision point, leave one pointer there and the other to the head of the node.
  //The loop entry point is k nodes away from both the head and the collision point.
  //Move both node at the same time until they meet.
  let startNode = head.head;
  let fast = startNode.next.next;
  let slow = startNode.next;

  while(fast !== slow){
    if(fast === null || fast.next === null){
      return false;
    }

    fast = fast.next.next;
    slow = slow.next;
  }

  slow = startNode;

  while(fast !== slow){
    fast = fast.next;
    slow = slow.next;
  }

  return fast.value;
}

// let l = new LinkedList(1)
// l.add(2)
// let three = l.add(3)
// l.add(4)
// let m = l.add(5)
// m.next = three
