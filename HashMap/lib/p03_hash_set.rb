require_relative 'p02_hashing'

class HashSet
  attr_reader :count

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { Array.new }
    @count = 0
  end

  def insert(key)
    return false if self.include?(key)
    @count += 1
    hashed_key = key.hash % num_buckets
    @store[hashed_key].push(key)
    resize! if @count == num_buckets
  end

  def include?(key)
    hashed_key = key.hash % num_buckets
    @store[hashed_key].include?(key)
  end

  def remove(key)
    hashed_key = key.hash % num_buckets
    if @store[hashed_key].include?(key)
      @store[hashed_key].delete(key)
    else
      return nil
    end
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
