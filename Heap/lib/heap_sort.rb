require_relative "heap"

class Array
  def heap_sort!

    i = 1
    while i <= self.length
      BinaryMinHeap.heapify_up(self, i)
      i += 1
    end

    j = self.length
    while j != 0
      # puts j
      self[j-1], self[0] = self[0], self[j-1]
      j -= 1
      BinaryMinHeap.heapify_down(self, 0, j)
    end

    return self.reverse!

  end
end
