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
