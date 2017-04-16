#Hash Map

###Set
[true, true, false] => this shows that 0 and 1 exists but 2 does not.
The problem arises when your input is [0,100]. You don't want to create an array with ta length of 100 just to store the information for two variable. Waste of Space.

###IntSet
buckets = [[], [], []]
% l where l = length of buckets

This time we modulo the inputs by the length of bucket (l) going into the buckets in order to spread out the input evenly
For example:
inputs: [1,2,3] and l = 3
1 % 3 = 1
2 % 3 = 2
3 % 3 = 0
buckets = [[3], [1], [2]]

Problem: If we have more inputs the individual buckets become o(n) time to look through.
inputs of [1,2,3,4,5....n] will fill out the buckets.

###Resize
The solution is to resize by double the amount of the length.

For example:
[[], [], []]
% l where l = 3

inputs = [1,2,3,4,5]
At first, we fill each bucket by modulo 3
[[2], [1], [3]]
When the number of input (k) = length of buckets (l) then we resize by 2.

This allow for:
l / k = 1
include: o(1)
delete: o(1)

becauseas the number of input increases, the length increases. The inputs are once again evenly (on average) spread out.

We also need to remod everything in order to place them in their rightful bucket.

left over inputs are [5,6]
[[3],[],[4],[],[2],[1]]
% 6

This is amortized. We pay every time k == l and receive "free" inputs until then.

Problem: We run into a pathological data set when we have all the input numbers getting put into one bucket.

For example:
inputs: [2,4,6,8] % l
where l = 4

buckets = [[4], [], [2,6,8], []]
// about to resize.

###Hash set
The solution is to hash the inputs before moduloing it. The numbers are at random resolving pathological data set.
Hash is deterministic, uniformly distributed, and moves one way.

get: o(1)
insert: o(1)
delete: o(1)

####Hashing
String, integer, array, objects => hash => "uh3uhrj23r8u38hj" base 64 number

Some examples of Hashes are:
Hash fn:
 - City hash
 - CRC 32: this ensures files are not currupted
 - murmurhash: Ruby uses this
Cypto graphic:
 - MDS
 - SHA-Z
 - Blowfish
          Avg    wc
include:  o(1)  o(n)
get:      o(1)  o(n)
insert:   o(1)  o(n)
delete:   o(1)  o(n)

wc if everything ends up in one bucket.

###Linked List
Link: key, value, next, prev

Singly-linked-list
- find => o(n)
- push => o(n) but if you keep track of @tail then it can be o(1)
- delete => same as push

Doubly-linked-list
- insert => o(1)
- [] => o(n)

          Avg.   wc
get/read: o(n)   o(n)
insert:   o(1)   o(n)(for update)
delete:          o(n)

###HashMap
Uses hashing set and array/linked list for the buckets

Store these into linkedlist
{
  1 => 1,
  2 => 4,
  3 => 9,
  4 => 16,
  5 => 25
}


[linkedlist, linkedlist, linkedlist]

hash[2] => 2.hash % 4 => 4
The hash sets uniformly constant distribution allows for a o(1) time.

hash[7]= will reassign or append

Hashmap is using a hashset with Linkedlists (key, value) for buckets
  you could use an array as well.

- get o(1) and o(n)
- insert o(1) and o(n)  amortized constant
- delete o(1) and o(n)
- worse case is the same (if all the nodes are stacked into one bucket).


###Caches

example:
{
  mario => [mario, timestamp]
  goobma => [goomba, timestamp]
  coin => [coin, timestamp]
}

- Hashmap using an array as a bucket
- Hashmaps keep track of the gets and sets and the array tracks the order of the objects. (Head, tail).

- Tuples for buckets are not ordered so you have to iterate through to find the oldest one

- ejection: o(n)
- insert: o(n)
- read: o(1)
- o(n) from iteration to find timestamp

###LRU
Hashmaps keep track of the gets and sets and the linked list tracks the order of the objects. (Head, tail).

Least Recently Used
Heuristic

Here you don't have to iterate through the linked list. You have the head and the tail and there is no shifting when you insert or delete. You simply change the pointers.

HashMap provides the reference and the linked list can then insert and delete without having to shift.


<!-- ###Big o
      hashset ll    HM
get    o(1)   o(n)
insert 0(1)   o(1)
delte  o(1)   o(n) -->
