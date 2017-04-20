require_relative "bst_node"

class BinarySearchTree
  def initialize
    @root = BSTNode.new
  end

  def find(val)
    current_node = @root

    until current_node.nil? || current_node.value == val
      if val < current_node.value
        current_node = current_node.left_child
      else
        current_node = current_node.right_child
      end
    end

    current_node ? true : false
  end

  def insert(insert_node)
    previous_node = nil
    current_node = @root

    until current_node.nil?
      previous_node = current_node
      if insert_node.value < current_node.value
        current_node = current_node.left_child
      else
        current_node = current_node.right_child
      end
    end

    if insert_node.value < previous_node.value
      previous_node.left_child = insert_node
    else
      previous_node.right_child = insert_node
    end
  end


  # If a node has no children, simply remove it.
  # If a node has only one child, delete it and promote its child to take its place.
  # If a node has two children, find the largest node in its left subtree and promote that node to replace the deleted node. If necessary, promote that node's child to replace its parent.
  # You'll need a helper method, #maximum, for this one. After that, the work that we want to do here essentially involves a lot of pointer swapping.


  def delete(delete_value)
    previous_node = nil
    current_node = @root

    until current_node.nil? || current_node.value == delete_value
      previous_node = current_node
      if delete_value < current_node.value
        current_node = current_node.left_child
      else
        current_node = current_node.right_child
      end
    end

    #accounts for one child or both child being nil
    if current_node.left_child.nil? || current_node.right_child.nil?
      if previous_node.left_child.value == delete_value
        previous_node.left_child = nil
      else
        replace_node = current_node.left_child.nil? current_node.right_child : current_node.left_child
        previous_node.right_child = replace_node
      end
    #accounts for both child exisiting
    else
      previous_node = self.maximum(current_node.left_child)
    end
  end

  def is_balanced?
  end

  def in_order_traversal
  end


  def maximum(current_node)
    max_node = current_node

    until max_node.right_child.nil?
      max_node = max_node.right_child
    end
    return max_node
  end


  def depth
  end
end
