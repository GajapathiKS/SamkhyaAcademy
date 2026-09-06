# Data Structures & Algorithms

## Module 2: Linked Structures

Choose a linked structure based on operations rather than its visual appearance.

### 2.1 Singly linked list simulation

A singly linked node stores a value and a next reference. Preserve the next reference before removing a node or the remaining chain may be lost. Handle head deletion separately and make ownership explicit in a native implementation.

### 2.2 Doubly linked lists

A doubly linked node also records its predecessor. Updates must preserve consistency in both directions. The extra links support backward traversal but require more storage and more careful insertion/deletion logic.

### 2.3 Stacks and queues

A stack removes the most recently added item; a queue removes the oldest. Choose based on the required order. Define underflow behavior and test empty-to-nonempty transitions, which often reveal incorrect head/tail handling.

### 2.4 Hash tables

A hash table maps keys to positions through a hash function and collision strategy. Expected constant-time lookup is not a guarantee for every input. Define key equality and test collisions rather than assuming every key maps to a unique bucket.

## Worked lab

Before: A -> B -> C -> null
Delete B: save B.next as C; set A.next = C
After: A -> C -> null
Doubly linked version also sets C.prev = A
Check: deleting the only node leaves both endpoints empty.

A diagram is useful only when it shows which references change and which invariants remain true.

## Assignment

1. Trace head, middle and tail deletion.
   Your evidence: 

2. Compare stack and queue removal order.
   Your evidence: 

3. Demonstrate two keys sharing a hash bucket.
   Your evidence: 

## Evidence to submit

Linked-structure traces and edge-case tests.

## Review

Why must a doubly linked deletion update both neighboring links?

Your reasoning: 
