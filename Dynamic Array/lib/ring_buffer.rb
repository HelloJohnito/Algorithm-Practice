require_relative "static_array"

class RingBuffer
  attr_reader :length

  def initialize
    @store = StaticArray.new(8)
    @length = 0
    @capacity = 8
    @start_index = 0
  end

  # O(1)
  def [](index)
    if @length == 0 && index == 0 || index >= @length
      raise "index out of bounds"
    else
      newIndex = (index + @start_index) % @capacity
      @store[newIndex]
    end
  end

  # O(1)
  def []=(index, value)
    if @length == 0 && index >= @length
      raise "index out of bounds"
    else
      newIndex = (index + @start_index) % @capacity
      @store[newIndex] = value
    end
  end

  # O(1)
  def pop
    raise "index out of bounds" if @length == 0
    end_index = ((@start_index + @length) - 1) % @capacity
    value = @store[end_index]
    @store[end_index] = nil
    @length -= 1
    return value
  end

  # O(1) ammortized
  def push(val)
    resize! if @capacity == @length

    end_index = ((@start_index + @length)) % @capacity
    @length += 1
    @store[end_index] = val
  end

  # O(1)
  def shift
    raise "index out of bounds" if length == 0

    value = @store[@start_index]
    @store[@start_index] = nil
    @start_index += 1
    @length -= 1
    return value
  end

  # O(1) ammortized
  def unshift(val)
    resize! if @capacity == @length

    @start_index = @start_index-1 % @capacity
    value = @store[@start_index]
    @store[@start_index] = val
    @length += 1
    return value
  end

  # protected
  attr_accessor :capacity, :start_idx, :store
  attr_writer :length

  def check_index(index)
  end

  def resize!
    new_store = StaticArray.new(@capacity*2)
    i = 0
    starting_point = @start_index

    while i < @store.length
      new_store[i] = @store[starting_point]
      i += 1
      starting_point = ((starting_point + 1) % (@capacity))
    end

    @capacity *= 2
    @start_index = 0
    @store = new_store
  end
end
