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
    children_indices = BinaryMinHeap.child_indices(len, parent_idx)

    if children_indices.empty?
      return array
    elsif children_indices.length == 1
      child_one_idx = children_indices[0]
    else
      child_one_idx, child_two_idx = children_indices
    end

    # Compares the parent node to its child_nodes.
    if array[parent_idx] > array[child_one_idx]
      array[parent_idx], array[child_one_idx] = array[child_one_idx], array[parent_idx]
      parent_idx = child_one_idx
      self.heapify_down(array, parent_idx)
    elsif !child_two_idx.nil? && array[parent_idx] > array[child_two_idx]
      array[parent_idx], array[child_two_idx] = array[child_two_idx], array[parent_idx]
      parent_idx = child_two_idx
      self.heapify_down(array, parent_idx)
    end

    return array
  end


  def self.heapify_up(array, child_idx, len = array.length, &prc)
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
