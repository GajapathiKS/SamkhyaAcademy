# C++ Essentials

## Module 1: Modern C++ Foundations

Create a small modern C++ task utility with clear value semantics.

### 1.1 Toolchain and first program

Compile a minimal program and distinguish source, object files and the linked executable. Enable warnings and select a documented language standard. Keep the build command in the README so a second learner can reproduce the result.

### 1.2 Types and control flow

Use types to express what a value means. A count, an optional result and text are different concepts. Prefer initialization and explicit control flow. Avoid narrowing conversions that silently discard information when data moves between types.

### 1.3 Functions and references

Pass small values by value and inspect larger objects through const references when appropriate. A reference does not extend every lifetime. State whether a function mutates its argument, and never return a reference to a destroyed local object.

### 1.4 Namespaces and headers

Headers declare interfaces that other translation units consume; source files provide implementations. Use namespaces to organize names rather than importing every name globally in a header. Include what you use and prevent repeated header definitions.

## Worked lab

#include <iostream>
#include <string>
void greet(const std::string& name) {
  std::cout << "Hello, " << name << "\n";
}
int main() { greet("Learner"); }

The function reads the string without mutating it. Its reference is valid for the duration of the call.

## Assignment

1. Compile with warnings enabled.
   Your evidence: 

2. Separate greet into a header and implementation.
   Your evidence: 

3. Explain why returning a reference to a local string is invalid.
   Your evidence: 

## Evidence to submit

Reproducible two-file project and lifetime explanation.

## Review

Does const on a reference make the referenced object live forever?

Your reasoning: 
