# C Programming Fundamentals

## Module 3: Arrays, Strings and Pointers

Represent a fixed set of readings without losing track of size and lifetime.

### 3.1 Arrays

An array stores elements contiguously. Its capacity and the number of initialized values are separate facts. Pass a length to functions because an array parameter does not carry the original element count. Never infer capacity from a pointer alone.

### 3.2 Strings

A C string is a character sequence ending in a null character. Storage must include room for that terminator. Track destination capacity when copying or reading text. A byte buffer containing characters is not automatically a valid null-terminated string.

### 3.3 Pointer foundations

A pointer stores an address associated with a type. Dereferencing requires a valid object with a live lifetime and suitable access. A null check does not detect every invalid pointer. Do not return the address of a function-local variable.

### 3.4 Pointers with arrays

Pointer arithmetic is meaningful within an array object and its one-past position. The one-past pointer may be formed for comparison but not dereferenced. Keep indexes and lengths visible when that is clearer than arithmetic on addresses.

## Worked lab

int readings[] = {21, 24, 26};
size_t n = sizeof readings / sizeof readings[0];
const int *first = readings;
// readings[1] and *(first + 1) both refer to 24.
// first + n is one-past; do not dereference it.

The equivalence works because the pointer refers into the same live array. It is not permission to read beyond its bounds.

## Assignment

1. Trace each valid index and address offset.
   Your evidence: 

2. Store a short label with space for the null terminator.
   Your evidence: 

3. Pass readings and n to a function without changing the input.
   Your evidence: 

## Evidence to submit

Array/string bounds worksheet and read-only function.

## Review

May a one-past pointer be dereferenced?

Your reasoning: 
