# C Programming Fundamentals

## Module 2: Control Flow and Functions

Turn a one-off calculation into a reusable, testable function.

### 2.1 Conditions

A condition selects a path based on an expression. Define boundary cases before writing branches: is zero a valid count, missing data or an error? Use comparison rather than assignment in a test, and exercise both sides of every branch.

### 2.2 Loops

A loop needs an initial state, continuation condition and progress toward termination. For n elements, valid indexes run from zero through n-1. Check empty input and one-element input first; these cases reveal incorrect loop bounds quickly.

### 2.3 Functions and scope

A function has an input contract, output contract and local state. Pass the data it needs instead of relying on a global variable. Local variables are not available after their lifetime ends. Return a result or explicit status that callers can handle.

### 2.4 Debugging fundamentals

Debugging is hypothesis testing. Reproduce the failure with the smallest input, inspect values near the first incorrect state and change one cause at a time. A debugger breakpoint and a short assertion can reveal more than many unrelated print statements.

## Worked lab

double sum(const int *values, size_t n) {
  double result = 0;
  for (size_t i = 0; i < n; ++i) result += values[i];
  return result;
}
// Include <stddef.h>; caller supplies a valid array for n elements.

An empty input performs no iterations and returns zero. Computing an average requires an additional explicit n==0 policy.

## Assignment

1. Trace the loop for n=0 and n=1.
   Your evidence: 

2. Extract an average function with an error-status contract.
   Your evidence: 

3. Introduce and then diagnose an off-by-one error using a local test.
   Your evidence: 

## Evidence to submit

Function contract and boundary-case test log.

## Review

What makes i <= n incorrect for a loop over n elements?

Your reasoning: 
