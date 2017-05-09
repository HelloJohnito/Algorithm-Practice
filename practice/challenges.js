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
