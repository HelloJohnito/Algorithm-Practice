require_relative "bst_node"

class BinarySearchTree
  # attr_reade

  def initialize( root = BSTNode.new )
    @root = root
  end

  def find(val)

  end

  def insert(val)
    node = BSTNost.new(val)
    @root.val = node.val if @root.val.nil?

    if val < @root.val
      if @root.left
        left_tree = BinarySearchTree.new(@root.left)
        left_tree.insert(val)
      else
        @root.left = node
      end
    else
      #rightside
    end

  end

  def delete(val)
    node = self.find(val)
    return false unless node
    if !(node.left || node.right)
      if node.parent.left == node
        node.parent.left = nil
      elsif node.parent.right == node
        node.parent.right = nil
      end
    elsif !node.left
      parent = node.parent
      if node.parent.left == node
        parent.node = node.right
      elsif node.parent.right == node
        parent.right = node.right
      end

      node.right.parent = parent
      node.right = nil
      node.parent = nil
    elsif !node.right
      #same but reverse
    else
      left_tree = BinarySearchTree.new(node)
      replacement = left_tree.maximum
      replacement_parent = replacement.parent
      replacement_child = replacement.left
      parent = node.parent

      if orig_parent.left == node
        orig_parent.left = replacement
      else
        orig_parent.right = replacement
      end

      replacement.parent = orig_parent
      replacement.left = node.left
      replacement.right = node.right
      replacement_parent = replacement_child
      replacement_child.parent = replacement_parent
    end

  end

  def is_balanced?
  end

  def in_order_traversal
  end

  def maximum
  end

  def depth
  end
end
