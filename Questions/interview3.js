//reverse a Listed Link

function reverseLinkList(head){
  if(!head || !head.next){
    return "ListLink size too small";
  }
  let previous = null;
  let next = null;
  let current = head;

  while(current){
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}

////////////////////////////////////////////////////////////
//Find the kth to the end of a LinkedListNode

function kthToLastNode(k, node){

  let answer = node;
  let current = node;

  for(let i = 0; i < k; i++){
    current = current.next;
  }

  while(current){
    current = current.next;
    answer = answer.next;
  }
  return answer;
}

///////////////////////////////////////////////////////////////
//reverse a string inplace

function reverseString(string){
  let reverse = string.split("");
  let i = 0;
  let j = string.length - 1;
  let temp;

  while(i < j){
    temp = reverse[i];
    reverse[i] = reverse[j];
    reverse[j] = temp;
    i ++;
    j --;
  }
  return reverse.join("");
}

//////////////////////////////////////////////////////////////////////////////////
//reverseWords in a sentence.

function reverseWords(message) {

  var messageArray = message.split('');

  // first we reverse all the characters in the entire messageArray
  reverseCharacters(messageArray, 0, messageArray.length - 1);
  // this gives us the right word order
  // but with each word backwards

  // now we'll make the words forward again
  // by reversing each word's characters

  // we hold the index of the *start* of the current word
  // as we look for the *end* of the current word
  var currentWordStartIndex = 0;
  for (var i = 0; i <= messageArray.length; i++) {

      // found the end of the current word!
      if (i === messageArray.length || messageArray[i] === ' ') {

          // if we haven't exhausted the string our
          // next word's start is one character ahead
          reverseCharacters(messageArray, currentWordStartIndex, i - 1);
          currentWordStartIndex = i + 1;
      }
  }

  return messageArray.join('');
}

function reverseCharacters(messageArray, startIndex, endIndex) {

  // walk towards the middle, from both sides
  while (startIndex < endIndex) {

      // swap the front char and back char
      var temp = messageArray[startIndex];
      messageArray[startIndex] = messageArray[endIndex];
      messageArray[endIndex] = temp;
      startIndex++;
      endIndex--;
  }
}
