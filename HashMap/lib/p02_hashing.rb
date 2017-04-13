
class Fixnum
  # Fixnum#hash already implemented for you
end

class Array
  def hash
    each_with_index.inject(0) do |intermediate_hash, (el, i)|
      (el.hash + i.hash) ^ intermediate_hash
    end
  end
end

class String
  def hash
    chars.map(&:ord).hash
  end
end

class Hash
  def hash
    to_a.sort_by(&:hash).hash
  end
end


# class Fixnum
#   # Fixnum#hash already implemented for you
# end
#
# class Array
#   def hash
#     return 44.hash if self.empty?
#     self.each_with_index do |el, i|
#       el.hash * i * 7
#     end
#   end
# end

# class String
#   def hash
#     self.each_char do |char|
#       char.ord.hash.to_i
#     end
#   end
# end

# class Hash
#   # This returns 0 because rspec will break if it returns nil
#   # Make sure to implement an actual Hash#hash method
#   def hash
#     self.to_a.each_with_index do |el, i|
#       el.hash * i.hash
#     end
#   end
# end
