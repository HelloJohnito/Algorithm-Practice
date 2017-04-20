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
