# Full-Stack Developer Path

## Module 2: Frontend Engineering

Organize a frontend around components, explicit state and testable behavior.

### 2.1 React or Angular foundations

A component has a focused responsibility and a clear input contract. Prefer composition over a large component that owns every interaction. Keep framework-specific rendering separate from business calculations where practical.

### 2.2 State and forms

State should represent the minimum information needed to render the interface. Avoid storing both a source value and a derived value that can drift apart. Forms need labels, validation feedback and predictable handling of unsaved changes.

### 2.3 Data fetching

Data fetching introduces loading, failure, empty and stale states. Do not let an older response overwrite a newer request. Decide what should remain visible while work is pending and how a user can retry.

### 2.4 Frontend testing

Test components through observable behavior. A form test should enter data, submit and inspect feedback rather than only check implementation details. Include an error path and a keyboard interaction.

## Worked lab

UI state: {query, requestStatus, courses, error}
Derived: visibleCourses = filter(courses, query)
States: idle -> loading -> success | error
Do not store a second mutable copy of visibleCourses.

Derived state stays consistent when the query or source data changes.

## Assignment

1. Split a course list into focused components.
   Your evidence: 

2. Add loading and error feedback.
   Your evidence: 

3. Test successful submission and invalid input.
   Your evidence: 

## Evidence to submit

Component interface, state diagram and UI tests.

## Review

Why avoid separately storing a value that can be derived from existing state?

Your reasoning: 
