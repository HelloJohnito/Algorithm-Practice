# This class just dumbs down a regular Array to be staticly sized.
class StaticArray

  attr_reader :length, :store

  def initialize(length)
    @store = Array.new(length)
    @length = length
  end

  # O(1)
  def [](index)
    @store[index]
  end

  # O(1)
  def []=(index, value)
    @store[index] = value
  end


  # protected
  attr_accessor :store

end
