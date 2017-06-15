////////////////////
  // Min Heap //
///////////////////

let MinHeap = function(){
  this.store = [];
};


MinHeap.getParentIndex = function(childIndex){
  return Math.floor((childIndex - 1) / 2 );
};

MinHeap.getChildrenIndices = function(length, parentIndex){
  let childrenIndices = [];
  let childOne = (parentIndex * 2) + 1;
  let childTwo = (parentIndex * 2) + 2;

  if(length > childTwo){
    childrenIndices.push(childOne, childTwo);
  }
  else if (length > childOne){
    childrenIndices.push(childOne);
  }

  return childrenIndices;
};


MinHeap.heapifyUp = function(array, childIndex){
  let parentIndex = MinHeap.getParentIndex(childIndex);

  if(parentIndex < 0) return array;

  let temp;
  if(array[childIndex] < array[parentIndex]){
    temp = array[childIndex];
    array[childIndex] = array[parentIndex];
    array[parentIndex] = temp;
    MinHeap.heapifyUp(array, parentIndex);
  }

  return array;
};

MinHeap.heapifyDown = function(array, parentIndex, length){
  let childrenIndices = MinHeap.getChildrenIndices(length, parentIndex);
  let childIndex;

  if(childrenIndices.length === 0) return array;

  if(childrenIndices.length === 1){
    childIndex = childrenIndices[0];
  }
  else if(childrenIndices.length === 2){
    if(array[childrenIndices[0]] < array[childrenIndices[1]]){
      childIndex = childrenIndices[0];
    } else {
      childIndex = childrenIndices[1];
    }
  }

  let temp;
  if(array[parentIndex] > array[childIndex]){
    temp = array[parentIndex];
    array[parentIndex] = array[childIndex];
    array[childIndex] = temp;
    MinHeap.heapifyDown(array, childIndex, length);
  }

  return array;
};


MinHeap.prototype.add = function(el){
  this.store.push(el);
  this.store = MinHeap.heapifyUp(this.store, this.store.length - 1);
  return this.store;
};

MinHeap.prototype.extract = function(){
  let temp = this.store[0];
  this.store[0] = this.store[this.store.length - 1];
  this.store[this.store.length - 1] = temp;

  let extractedValue = this.store.pop();
  this.store = MinHeap.heapifyDown(this.store, 0, this.store.length);
  return extractedValue;
};


// let m = new MinHeap;
// m.add(3);
// m.add(4);
// m.add(5);
// m.add(2);
// m.add(1);
// m.extract();


////////////////////
  // Max Heap //
///////////////////
let MaxHeap = function(){
  this.store = [];
};

MaxHeap.getParentIndex = function(childIndex){
  return Math.floor((childIndex - 1)/2);
};

MaxHeap.getChildrenIndices = function(length, parentIndex){
  let childrenIndices = [];
  let childOneIndex = 2 * parentIndex + 1;
  let childTwoIndex = 2 * parentIndex + 2;

  if(length > childTwoIndex){
    childrenIndices.push(childOneIndex, childTwoIndex);
  }
  else if(length > childOneIndex){
    childrenIndices.push(childOneIndex);
  }

  return childrenIndices;
};


MaxHeap.heapifyUp = function(array, childIndex){
  let parentIndex = MaxHeap.getParentIndex(childIndex);

  if(parentIndex < 0) return array;

  let temp;
  if(array[parentIndex] < array[childIndex]){
    temp = array[parentIndex];
    array[parentIndex] = array[childIndex];
    array[childIndex] = temp;
    MaxHeap.heapifyUp(array, parentIndex);
  }

  return array;
};


MaxHeap.heapifyDown = function(array, parentIndex, length){
  let childrenIndices = MaxHeap.getChildrenIndices(length, parentIndex);

  if(childrenIndices.length === 0) return array;

  let childIndex;
  if(childrenIndices.length === 1){
    childIndex = childrenIndices[0];
  }
  else if(childrenIndices.length === 2){
    if(array[childrenIndices[0]] > array[childrenIndices[1]]){
      childIndex = childrenIndices[0];
    }
    else {
      childIndex = childrenIndices[1];
    }
  }

  if(array[parentIndex] < array[childIndex]){
    let temp = array[parentIndex];
    array[parentIndex] = array[childIndex];
    array[childIndex] = temp;
    MaxHeap.heapifyDown(array, childIndex, length);
  }

  return array;
};



MaxHeap.prototype.add = function(el){
  this.store.push(el);
  MaxHeap.heapifyUp(this.store, this.store.length - 1);
  return this.store;
};

MaxHeap.prototype.extract = function(){
  let temp = this.store[0];
  this.store[0] = this.store[this.store.length - 1];
  this.store[this.store.length - 1] = temp;
  let extractedValue = this.store.pop();
  this.store = MaxHeap.heapifyDown(this.store, 0, this.store.length);
  return extractedValue;
};

// let max = new MaxHeap;
// max.add(4);
// max.add(6);
// max.add(1);
// max.add(10);
// max.store;
// max.extract()
// max.store;


////////////////////////
  /// Heap Sort ///
///////////////////////

//naive
function heapSort(array){
  let heapify = new MinHeap;
  let sortedArray = [];
  let length = array.length;

  for(let i = 0; i < length; i++){
    heapify.add(array.pop());
  }

  for(let j = 0; j < length; j++){
    sortedArray.push(heapify.extract());
  }

  return sortedArray;
}

//Optimized InPlace
//Heapify left to right and
//Extract right to left
function heapSortInPlace(array){
  for(let i = 1; i < array.length; i++){
    MaxHeap.heapifyUp(array, i);
  }

  let temp;
  for(let j = array.length - 1; 0 < j; j--){
    temp = array[0];
    array[0] = array[j];
    array[j] = temp;

    // j is the length of array
    MaxHeap.heapifyDown(array, 0, j);
  }

  return array;
}
