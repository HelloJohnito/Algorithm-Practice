class MaxIntSet
  def initialize(max)
    @set = Array.new(max)
  end

  def insert(num)
    raise "Out of bounds" unless num.between?(0, @set.length-1 )
    @set[num] = true
  end

  def remove(num)
    @set[num] = false
  end

  def include?(num)
    raise "Out of bounds" unless num.between?(0, @set.length-1 )
    @set[num] == true ? true : false
  end

  private

  def is_valid?(num)
  end

  def validate!(num)
  end
end


class IntSet
  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
  end

  def insert(num)
    return if @store[num % num_buckets].include?(num)
    @store[num % num_buckets].push(num)
  end

  def remove(num)
    @store[num%num_buckets].delete(num)
  end

  def include?(num)
    @store[num % num_buckets].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end
end

class ResizingIntSet
  attr_reader :count

  def initialize(num_buckets = 20)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(num)
    return false if self.include?(num)
    @count += 1
    @store[num % num_buckets].push(num)
    resize! if @count == num_buckets
  end

  def remove(num)
    i = num % num_buckets
    @store[i].delete(num)
  end

  def include?(num)
    i = num % num_buckets
    @store[i].include?(num)
  end

  private

  def [](num)
    # optional but useful; return the bucket corresponding to `num`
  end

  def num_buckets
    @store.length
  end

  def resize!
    previous = @store
    @store = Array.new(num_buckets * 2) { Array.new }

    previous.each do |nums|
      nums.each do |num|
        i = num % num_buckets
        @store[i].push(num)
      end
    end
    @store
  end
end
