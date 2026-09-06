# C++ Essentials

## Module 3: STL and Problem Solving

Store tasks and query them with standard containers and algorithms.

### 3.1 Vectors and maps

A vector owns a sequence; a map associates keys with values. Choose based on lookup, ordering and update needs. Inserting into a vector may reallocate storage, invalidating references into its former storage. Keep stable IDs instead of long-lived element addresses.

### 3.2 Iterators

An iterator describes a position in a range. The end iterator is a boundary, not an element to read. Container modification can invalidate iterators. State which operations occur while iterating and avoid changing the container without understanding those rules.

### 3.3 Algorithms

Standard algorithms separate traversal from the operation being applied. A predicate should express one test without surprising side effects. Use a const range when reading only. Compare a clear algorithm call with a manual loop using the same edge cases.

### 3.4 Exceptions

Exceptions report failures that normal return flow cannot handle locally. Catch where recovery or useful context is possible. Do not silently swallow a failure and pretend the operation succeeded. Resource-owning objects should clean up during stack unwinding.

## Worked lab

std::vector<int> scores{2, 4, 6};
auto found = std::find(scores.begin(), scores.end(), 4);
if (found != scores.end()) std::cout << *found;
// Headers: <vector>, <algorithm>, <iostream>

The end check is required before dereferencing. Searching an empty vector is valid and returns end.

## Assignment

1. Search an empty and non-empty vector.
   Your evidence: 

2. Replace a saved reference with lookup by ID.
   Your evidence: 

3. Handle a failed input conversion without losing prior tasks.
   Your evidence: 

## Evidence to submit

Container tests and documented error handling.

## Review

What does find return when the target is absent?

Your reasoning: 
