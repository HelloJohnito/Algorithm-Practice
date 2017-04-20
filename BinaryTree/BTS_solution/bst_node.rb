class BSTNode
  attr_accessor :left, :right, :parent, :val

  def initialize(val = nil)
    @val = val
    @left = nil
    @right = nil
    @parent = nil
  end
end
