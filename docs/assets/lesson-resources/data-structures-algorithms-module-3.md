# Data Structures & Algorithms

## Module 3: Trees and Heaps

Use tree structure to organize search and priority operations.

### 3.1 Binary tree explorer

A binary tree allows at most two children per node. Define the empty tree and base case before writing recursion. Depth, height and traversal order describe different properties and should not be used interchangeably.

### 3.2 BST operations

A binary search tree maintains an ordering rule between each node and its subtrees. Insertion order affects shape. A skewed tree can reduce search to linear behavior, so logarithmic performance requires a balancing argument or assumption.

### 3.3 DFS and BFS

Depth-first traversal explores a branch before returning; breadth-first traversal uses a queue to visit levels. Record visited nodes when cycles are possible in a more general graph. Choose order based on the question being answered.

### 3.4 Heaps and priority queues

A heap maintains a priority relationship, not a fully sorted sequence. In a min-heap the minimum is available at the root. Removing it restores the heap invariant through a sift operation rather than sorting every element.

## Worked lab

Tree: root 8; left child 3; right child 10
Inorder: 3, 8, 10
Preorder: 8, 3, 10
Level order: 8, 3, 10
Insert 1,2,3,4 into an unbalanced BST to observe a skewed shape.

Traversal order depends on when a node is processed. A sorted inorder result relies on the BST ordering property.

## Assignment

1. Draw three traversal orders.
   Your evidence: 

2. Compare balanced and skewed search paths.
   Your evidence: 

3. Trace a min-heap insertion and removal.
   Your evidence: 

## Evidence to submit

Tree explorer trace and invariant tests.

## Review

Is every element in a min-heap stored in sorted order?

Your reasoning: 
