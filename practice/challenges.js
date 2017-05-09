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
  
}
