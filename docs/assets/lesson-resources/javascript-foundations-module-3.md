# JavaScript Foundations

## Module 3: Asynchronous JavaScript

Represent asynchronous work without misleading loading or error states.

### 3.1 Promises

A promise represents an eventual result or rejection. Creating a promise does not make every operation inside it non-blocking. Return chained work so callers can await it, and attach error handling where a failure can be explained or recovered.

### 3.2 Async and await

await pauses the current async function, not the entire browser. Independent operations may run concurrently, while dependent operations must preserve order. Use try/finally to restore UI state after either success or failure.

### 3.3 Fetch and JSON

fetch can resolve even when an HTTP response indicates an error. Inspect response.ok before trusting a JSON body, and validate the expected data shape. A parsed JSON value is not automatically a correctly typed course record.

### 3.4 Loading and error states

Rapid requests can finish out of order. Cancel stale work or compare a request identifier before updating the screen. Keep existing results or a clear loading message while work is pending, and provide a useful retry path after failure.

## Worked lab

async function loadCourses() {
  const response = await fetch("./courses.json");
  if (!response.ok) throw new Error("Course request failed");
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Expected a list");
  return data;
}

HTTP success and data-shape validation are separate checks. Neither a network response nor JSON parsing proves that the UI can use the value.

## Assignment

1. Simulate loading, failure and an empty response.
   Your evidence: 

2. Add a retry button.
   Your evidence: 

3. Prevent an older response from replacing a newer search result.
   Your evidence: 

## Evidence to submit

Asynchronous page with explicit state transitions.

## Review

Does fetch reject automatically for every HTTP error status?

Your reasoning: 
