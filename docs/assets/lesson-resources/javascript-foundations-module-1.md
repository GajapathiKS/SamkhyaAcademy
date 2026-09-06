# JavaScript Foundations

## Module 1: JavaScript Language Foundations

Build predictable transformations before connecting a user interface.

### 1.1 Values and variables

Use const when a binding will not be reassigned and let when reassignment is necessary. An object held by const can still be mutated. Distinguish null, undefined and an empty string so missing data does not accidentally look like a valid answer.

### 1.2 Functions

A function should make its inputs and returned result clear. Separate calculation from DOM updates to make testing easier. Avoid reading hidden global state for a simple filter. Repeating the same input should produce the same result when no side effects are required.

### 1.3 Arrays and objects

Arrays represent ordered collections; objects represent named properties. filter creates a new selected array, while some operations mutate the original. Preserve source data so clearing a search can restore the original list. Use stable identifiers for records.

### 1.4 Errors and debugging

Read the error message and stack trace before changing code. Reproduce the smallest failure and inspect the value at the boundary where its type or shape differs from expectations. Handle expected failures explicitly instead of hiding every error in an empty catch.

## Worked lab

const courses = ["C", "C++", "JavaScript"];
const query = "script";
const result = courses.filter(name =>
  name.toLowerCase().includes(query.toLowerCase()));
// result: ["JavaScript"]; courses remains unchanged.

A search result is a view of the original collection. A query matching nothing should not delete course records.

## Assignment

1. Test empty, mixed-case and unmatched queries.
   Your evidence: 

2. Extract a reusable filter function.
   Your evidence: 

3. Explain one mutation that would break reset behavior.
   Your evidence: 

## Evidence to submit

Pure filtering function and input/output tests.

## Review

Does const prevent changing the contents of an array?

Your reasoning: 
