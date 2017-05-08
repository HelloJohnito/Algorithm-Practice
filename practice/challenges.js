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
  }
  return map.size === 0;
}
