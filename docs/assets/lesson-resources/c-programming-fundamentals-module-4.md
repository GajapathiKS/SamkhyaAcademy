# C Programming Fundamentals

## Module 4: Structures, Files and Capstone

Assemble a terminal record manager with explicit ownership and reliable file handling.

### 4.1 Structures and enums

A structure groups related fields into a value; an enum names a finite set of states. Keep a record ID separate from its array position so deletion or sorting does not silently change identity. Validate a state before using it in a decision.

### 4.2 File handling

Opening, reading, writing and closing a file can fail. Check return values and distinguish end-of-file from an error. Define a record format and reject malformed rows. Do not assume a write succeeded simply because the output file exists.

### 4.3 Memory safety review

Review every buffer length, object lifetime and allocation owner. Pair successful allocation with one appropriate release and avoid using a pointer after release. Prefer a fixed-capacity design for an introductory project when dynamic allocation adds no useful learning value.

### 4.4 Terminal application capstone

The capstone joins input validation, functions, records and persistence. Build add/list/search behavior first, then test malformed input and a missing file. A README should explain compilation, record format, limits and recovery behavior rather than only show a successful screenshot.

## Worked lab

Record format: id,title,status
Example: 101,Review pointers,OPEN
Load -> validate fields -> reject duplicates -> store record
Update -> validate ID -> change value -> check write result
Tests: empty file; malformed row; duplicate ID; unavailable path.

A malformed row should produce a clear diagnostic without corrupting records that were already validated.

## Assignment

1. Define the record schema and capacity.
   Your evidence: 

2. Implement add, list and find with invalid-input handling.
   Your evidence: 

3. Demonstrate save/reload and document error behavior.
   Your evidence: 

## Evidence to submit

Terminal application, reproducible tests and project README.

## Review

Why should a record ID not simply be its current array index?

Your reasoning: 
