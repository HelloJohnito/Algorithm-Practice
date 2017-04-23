Quick Sort in Place

- reduces space complexity to o(1)

[6,5,1,3,2,3]

First find the pivot and swap it with the front number
if pivot was 3

swap the 6 and the 3

iterate through and check the number against the pivot.
  - if number is less than the pivot, swap right of pivot with the number then swap the pivot with the number (now the new right of the pivot).
  - else skip

Here:
pivot = 3

   i
[3,5,1,6,2,7]
3 < 5
next
     i
[3,5,1,6,2,7]
3 > 1
swap 5 and 1
[3,1,5,6,2,7]

Then swap 3 and 1
       i
[1,3,5,6,2,7]
3 < 6
skip
         i
[1,3,5,6,2,7]
3 > 2
swap 2 and 5
[1,3,2,6,5,7]
Then swap 3 and 2
[1,2,3,6,5,7]

now recurse the left and the right of pivot by passing in the start index and the length
left = [1,2]
right = [6,5,7]

left_len = pivot_idx - start
right_len = length - (left_len + 1)
self.sort2!(array, start, left_len, &prc)
self.sort2!(array, pivot_idx + 1, right_len, &prc)


Sorting Notes

Bubble Sort
- Iterates through the Array, swaps with the elements in front if necessary
- Time complexity o(n^2)
- Space complexity o(1)
- Stable

Insertion Sort
- Builds a sorted array as it goes
- Sorts behind the Pointer
- Time complexity o(n^2)
- Space complexity o(1)
- Stable

Selection Sort
- Finds the Min and Swaps it into the appropriate position. Repeat
- Time complexity o(n^2)
- Space complexity o(1)
- Stable

Merge Sort
- Breaking input into many different pieces recursively and merging it back together
- Time Complexity o(n log n)
- Space Complexity o(n)
- Stable

Heap Sort
- Turn array into a Heap going left to right
- Extract the min or max going right to left
- Time complexity - o(n log n)
- Space - o(1)
- Unstable

Quick Sort
- Compare elements to the Pivot
- Time Complexity o(n log n) worsecase: o(n^2)
- Space Complexity: bc/av - o (log n) wc: o(n)
- Unstable for optimized but for the naive version it is stable
- More stable than Heap

Why do we use quicksort?
- The way computer interacts with cache.
- Cache can only hold a small portion of the array at all time. Heap sort jumps around too much.
  It has to reload different parts of the chase

Quicksort > Merge because of space complexity
Quicksort > heap because due to the cache only able to hole small portions at a time.. Heap moves the numbers all over the place vs. Quicksort moves section by section. 

STABILITY
- keeps the previous sort
- example: Sort by last name then sort by first name
  - jesse Cox
  - Jesse Lat
  - Kush Patel
  - Laura Chao

Sorted Array
- find o(log n)
- insert o(n)
- delete o(n)
