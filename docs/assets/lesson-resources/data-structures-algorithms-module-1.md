# Data Structures & Algorithms

## Module 1: Complexity, Arrays and Strings

Compare algorithms using input size, operation counts and explicit assumptions.

### 1.1 Big O with live traces

Big O describes how a resource bound grows with input size; it is not an exact stopwatch prediction. Count a relevant operation, vary n and state the case being analyzed. A constant factor can matter in practice without changing the growth class.

### 1.2 Array memory visualizer

An array supports indexed access because elements occupy a predictable contiguous layout. Inserting in the middle may require shifting later elements. Draw indexes before changing values, and distinguish capacity from the number of active elements.

### 1.3 Two pointers and sliding windows

Two pointers and sliding windows exploit structure to avoid repeating work. State the invariant that remains true as a pointer moves. Some windows rely on nonnegative values or another monotonic property; do not apply the pattern without checking its assumptions.

### 1.4 Searching and sorting

Binary search needs an ordered search space and consistent boundary updates. Sorting first has a cost that belongs in the total analysis. Test missing values, duplicates and the smallest input rather than only a successful central match.

## Worked lab

Sorted array: [2, 4, 6, 8, 10]
Search 8: low=0, high=4, mid=2 -> value 6
Move low=3; mid=3 -> value 8
Each step preserves: if the target exists, it lies in [low, high].

The invariant explains correctness; the shrinking interval explains termination and logarithmic comparisons.

## Assignment

1. Trace successful and unsuccessful binary searches.
   Your evidence: 

2. Count comparisons as input size doubles.
   Your evidence: 

3. Explain when sorting first is worth its cost.
   Your evidence: 

## Evidence to submit

Annotated trace, invariant and complexity comparison.

## Review

Can ordinary binary search be used on an unsorted array?

Your reasoning: 
