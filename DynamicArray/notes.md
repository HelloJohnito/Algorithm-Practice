Static Array

static = [ , , ]

In C implementation, Arrays are given their size when they are created.
Problem, when the user pushes more elements than the size of the array, we run out of room. We will have to re create the array in order to push in more elements.

When we recreate, we double the size of the array because recreating them is expensive. We double to amortize the cost.

static.push(1,2,3)

static = [1,2,3, , , ]

Dynamic Array:
We do not want to recreate every time the user shifts or unshifts elements from the array. So instead, we have a starting index for the Dynamic array, so that when a user unshifts, we can wrap around the static array and reassign the starting index to the new beginning.

dynamic.capacity = 6
dynamic.length = 3
dynamic.startingIndex = 0

dynamic.unshift(0)
startingIndex = (startingIndex - 1) % capacity
5 = (0 - 1) % 6

dynamic.length = 4
dynamic.startingIndex = 5

static = [1,2,3, , ,0]
and 
dynamic = [0,1,2,3, , ]
