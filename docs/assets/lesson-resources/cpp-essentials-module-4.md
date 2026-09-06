# C++ Essentials

## Module 4: Ownership and Capstone

Make resource lifetime predictable and ship a complete console application.

### 4.1 Stack and heap

Automatic local objects are destroyed when their scope ends. Dynamic storage can outlive a scope but needs an owner. Storage location alone does not define a good design; the important question is which object is responsible for cleanup.

### 4.2 Smart pointers

A unique_ptr expresses exclusive ownership; shared_ptr represents shared ownership with reference counting. Prefer exclusive ownership unless the problem requires sharing. A raw pointer may observe an object without owning it, but the observer must not outlive its target.

### 4.3 RAII

RAII couples resource acquisition with object lifetime. Files, locks and memory can all use this pattern. When an owning object is destroyed, its cleanup runs even when execution leaves through an exception. Avoid duplicating manual cleanup on every return path.

### 4.4 Console application capstone

Complete the task utility using values and standard containers. Add load/save, predictable errors and tests for empty input and missing IDs. Explain ownership in the README and demonstrate that cancellation or failure does not leak a resource.

## Worked lab

{
  std::ifstream input("tasks.txt");
  if (!input) { /* report failure */ }
  // Read validated records.
} // input closes its file through object destruction.

The file stream owns its resource. Cleanup follows scope exit rather than relying on a separate close call along every branch.

## Assignment

1. Draw the ownership relationships.
   Your evidence: 

2. Load and save a task list using stream objects.
   Your evidence: 

3. Test a missing file and malformed record.
   Your evidence: 

## Evidence to submit

Console capstone, ownership map and regression cases.

## Review

Why is RAII useful when a function has several exit paths?

Your reasoning: 
