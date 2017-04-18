class QuickSort
  # Quick sort has average case time complexity O(nlogn), but worst
  # case O(n**2).

  # Not in-place. Uses O(n) memory.
  def self.sort1(array)
    return array if array.length <= 1
    pivot = array[0]
    left = []
    right = []

    (1...array.length).each do |idx|
      if pivot >= array[idx]
        left.push(array[idx])
      else
        right.push(array[idx])
      end
    end

    self.sort1(left) + [pivot] + self.sort1(right)
  end


  # In-place.
  def self.sort2!(array, start = 0, length = array.length, &prc)
    return array if length <= 1
    pivot_idx = self.partition(array, start, length, &prc)

    left_len = pivot_idx - start
    right_len = length - (left_len + 1)
    self.sort2!(array, start, left_len, &prc)
    self.sort2!(array, pivot_idx + 1, right_len, &prc)
    array
  end


  def self.partition(array, start_idx, length, &prc)
    prc ||= Proc.new { |el1, el2| el1 <=> el2 }

    ((start_idx + 1) ... (start_idx + length)).each do |idx|

      #if pivot > current
      #current_element = array[idx]
      # pivot = array[start_idx]
      if prc.call(array[start_idx], array[idx]) > 0
        array[start_idx+1], array[idx] = array[idx], array[start_idx+1]
        array[start_idx], array[start_idx+1] = array[start_idx+1], array[start_idx]
        start_idx += 1
      end
    end

    start_idx
  end
end
