#Heap

      2
    3   4
  5  J

When creating a new node, you have to place it at the left most spot.
Heaps work towards a complete tree. No gaps

MinHeap - each parent has to be less than or equal to their children
MaxHeap - each parent has to be greater than or equal to their children

Peek: o(1)
insert/push: o(log n)
extract/pop: o(log n)

###Insert:
  place the node at the bottom then check and swap with its parents heapify_up.

###Extract:
  Swap the first array element and the last array element. Pop off the last one and heapify_down the first element down to where it belongs.


To find the children Nodes: 2i+1 and 2i+2
To find the parent Node: (i-2)/2

#Heap Sort  
The best approach is to mutate the array into a max heap going left to right with heapify_up(max)
Then Heapify_down going right to left to sort it.


array = [3,2,4,1]
keep track of an index

[3,2,4,1]
   i
3 is greater than 2. next


[3,2,4,1]
     i
4 is greater than 3
swap the 3 and the 4

[4,2,3,1]
       i
4 is greater than 1. next

Our max heap is [4,3,2,1]
now going swap the first and the last number
then going right to left heapify down while keeping track of index.

[4,3,2,1]
swap first and last

[1,3,2,4]
     i
Heapify down with 1,3,2

[3,1,2,4]
     i
now swap with 3 and 2
and i moves

[2,1,3,4]
   i
now swap first and last

[1,2,3,4]
 i
Nothing to heapify_down. So we stop

We have our sorted array.


#Pseudo code
- Heapify_down(array, parent_idx, length)
  - grab parent value
  - calc child indices + values  
  - compare parent with children (children.any? greater than parent)
    - if parent <= children,
        return array
  - swap parent with smaller child
  - heapify_down with subarray

- Heapify_up(array, child_idx, length)
  - get child value
  - get parent_idx and parent.value
  - compare child with parent
    - if child < parent
      - swap and call h_up with subarray
    - else
      - return array

  - Heap_sort
