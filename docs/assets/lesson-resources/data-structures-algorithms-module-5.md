# Data Structures & Algorithms

## Module 5: Problem Solving and Capstone

Explain a correct solution before optimizing or presenting it.

### 5.1 Pattern selection

Choose a pattern by recognizing an invariant or repeated subproblem, not by matching a keyword. Compare a simple baseline with the proposed approach. If the input assumptions differ, a familiar pattern may no longer be valid.

### 5.2 Constraint-driven design

Constraints determine feasible time and memory. Estimate the largest input and the size of stored state. An algorithm that is theoretically attractive may still exceed the available memory because its representation duplicates data.

### 5.3 Timed problem sets

Timed practice should include reading, planning, implementation and validation. Reserve time for edge cases and explain a failed attempt. A fast answer that cannot be justified is weak evidence of understanding.

### 5.4 Algorithm visualizer capstone

Build a visualizer that distinguishes current state, discovered state and queued work. Provide step, reset and a written invariant. Test the algorithm independently from the animation so a convincing visual does not hide an incorrect computation.

## Worked lab

Solution record:
Input constraints -> baseline -> selected invariant
Correctness argument -> time/space bound -> edge tests
Visualizer states: initial, running, completed, unreachable
Keep the algorithm output separate from the rendering code.

The capstone should make reasoning inspectable rather than merely animate nodes.

## Assignment

1. Compare baseline and optimized approaches.
   Your evidence: 

2. Solve a bounded problem set with explicit edge cases.
   Your evidence: 

3. Deliver a tested step-by-step visualizer.
   Your evidence: 

## Evidence to submit

Algorithm visualizer, tests and complexity explanation.

## Review

Why test the algorithm separately from its animation?

Your reasoning: 
