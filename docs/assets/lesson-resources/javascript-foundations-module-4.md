# JavaScript Foundations

## Module 4: Modules and Capstone

Package the browser project so another developer can run and test it.

### 4.1 ES modules

ES modules declare explicit imports and exports. Keep filtering logic independent from DOM wiring so it can be reused and tested. Avoid circular dependencies that make initialization order difficult to reason about.

### 4.2 Tooling basics

A development server provides a consistent origin and module loading. Record setup commands and dependency versions. A production build may differ from the development server; test the built files rather than assuming development success proves the release works.

### 4.3 Testing concepts

Tests compare an expected behavior with an observed result. Cover normal, empty and invalid inputs. Add an interaction test for the complete user flow, since a correct helper function can still be wired to the wrong field or button.

### 4.4 Interactive web app capstone

Deliver the filter application with clear states, accessible controls and reproducible setup. Keep secrets out of browser code. Include a small test fixture and explain what is simulated, particularly when network or authentication services are not connected.

## Worked lab

project/
  index.html
  src/filter.js
  src/ui.js
  data/courses.json
  tests/filter.test.js
  README.md
Contract: filterCourses(items, query) returns a new array.

The file boundary mirrors responsibilities: data transformation, interface behavior, fixtures and verification each have a clear home.

## Assignment

1. Export the filter helper.
   Your evidence: 

2. Add three boundary tests and one browser journey.
   Your evidence: 

3. Document setup, limits and deployment steps.
   Your evidence: 

## Evidence to submit

Interactive app, tests and reproducible README.

## Review

Why test the built site as well as individual functions?

Your reasoning: 
