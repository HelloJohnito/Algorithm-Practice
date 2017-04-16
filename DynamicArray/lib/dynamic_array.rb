require_relative "static_array"

class DynamicArray
  attr_reader :length

  def initialize
    #Static array
    @store = StaticArray.new(8)
    #the size of the StaticArray
    @capacity = 8
    #the count of DynamicArray
    @length = 0
    #starting point for DynamicArray
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
    if @length == 0 || index >= @length
      raise "index out of bounds"
    else
      @store[index] = value
    end
  end

  # O(1)
  def pop
    raise "index out of bounds" if @length == 0
    end_index = ((@start_index + @length) - 1) % @capacity
    @store[end_index] = nil
    @length -= 1
  end

  # O(1) ammortized; O(n) worst case. Variable because of the possible
  # resize.
  def push(val)
    if @capacity == @length
      @capacity *= 2
      new_array = resize!

      @length += 1
      new_array[-1] = val
      @store = new_array
    else
      @length += 1
      @store[-1] = val
    end

  end

  # O(n): has to shift over all the elements.
  def shift
    raise "index out of bounds" if length == 0

    @store[@start_index] = nil
    @start_index -= 1
    @length -= 1
  end

  # O(n): has to shift over all the elements.
  def unshift(val)
    if @length == 0
      @start_index = 0
    elsif @start_index == 0 && @length > 0
      @start_index = -1 % @capacity
    else
      @start_index -= 1
    end

    @store[@start_index] = val
    @length += 1
  end

  protected
  attr_accessor :capacity, :store
  attr_writer :length

  def check_index(index)

  end

  # O(n): has to copy over all the elements to the new store.
  def resize!
    new_array = StaticArray.new(@capacity)
    i = 0
    while i < @store.length
      new_array[i] = @store[i]
      i += 1
    end
    return new_array
  end
end
