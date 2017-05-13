ancestors

node1
node2

- if one is the root than the least common ancestors is the root. LCA = root
- if node1 and node2 are in separate subtrees LCA = root
- if node1 and node2 are both less than the root, return LCA of left subtree


Java Implementation:

- InOrder Traversal
(leftChild, currentNode, rightChild)

void inOrderTraversal(TreeNode node){
  if(node != null){
    inOrderTraversal(node.left);
    visit(node);
    inOrderTraversal(node.right);
  }
}

- PreOrder Traversal
(currentNode, leftChild, rightChild)

void preOrderTraversal(TreeNode node){
  if(node !=  null){
    visit(node);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
  }
}

- PostOrder Traversal
  (leftChild, rightChild, currentNode)

void postOrderTraversal(TreeNode node){
  if(node != null){
    postOrderTraversal(node.left);
    postOrderTraversal(node.right);
    postOrderTraversal(currentNode);
  }
}
