class BinaryMinHeap
  def initialize(&prc)
    @store = []
  end

  def count
    @store.length
  end

  def extract
    @store[0], @store[-1] = @store[-1], @store[0]
    value = @store.pop
    BinaryMinHeap.heapify_down(@store, 0)
    value
  end

  def peek
    @store[0]
  end

  def push(val)
    @store.push(val)
    BinaryMinHeap.heapify_up(@store, count - 1)
  end


  protected
  attr_accessor :prc, :store


  public
  def self.child_indices(len, parent_index)
    children_indices = []
    child_one_index = (2 * parent_index) + 1
    child_two_index = (2 * parent_index) + 2

    if len > child_two_index
      children_indices.push(child_one_index, child_two_index)
    elsif len > child_one_index
      children_indices.push(child_one_index)
    end

    return children_indices
  end


  def self.parent_index(child_index)
    raise "root has no parent" if child_index <= 0
    return (child_index - 1) / 2
  end


  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    # prc ||= Proc.new{ |el1, el2| el1 <=> el2 }

    children_indices = BinaryMinHeap.child_indices(len, parent_idx)
    
    return array if children_indices.empty?

    if children_indices.length == 1
      child_idx = children_indices[0]
    else
      if array[children_indices[0]] > array[children_indices[1]]
        child_idx = children_indices[1]
      else
        child_idx = children_indices[0]
      end
    end

    if array[parent_idx] > array[child_idx]
      array[parent_idx], array[child_idx] = array[child_idx], array[parent_idx]
      parent_idx = child_idx
      self.heapify_down(array, parent_idx, len)
    end

    return array
  end



  def self.heapify_up(array, child_idx, len = array.length, &prc)

    return if array[child_idx] == nil
    return array if child_idx == 0
    parent_idx = BinaryMinHeap.parent_index(child_idx)

    if array[child_idx] < array[parent_idx]
      array[child_idx], array[parent_idx] = array[parent_idx], array[child_idx]
      child_idx = parent_idx
      self.heapify_up(array, child_idx)
    end

    return array
  end
end





  # def self.heapify_down(array, parent_idx, len = array.length, &prc)
  #   prc ||= Proc.new { |el1, el2| el1 <=> el2 }
  #   children = self.child_indices(len, parent_idx)
  #   return array if children.all? { |idx| prc.call(array[parent_idx], array[idx]) <= 0 }
  #   if children.length == 1
  #     largest = children.first
  #   else
  #     child_values = [array[children[0]], array[children[1]]]
  #     largest = prc.call(child_values[0], child_values[1]) == -1 ?
  #       children[0] : children[1]
  #   end
  #   array[parent_idx], array[largest] = array[largest], array[parent_idx]
  #   self.heapify_down(array, largest, len, &prc)
  # end
