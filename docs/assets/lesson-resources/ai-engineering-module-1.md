# Forward Deployed AI Engineering

## Module 1: Engineering Readiness Bridge

Prepare a dependable service boundary before adding a model.

### 1.1 Backend/API readiness

An API contract specifies inputs, outputs, errors and permissions. Validate requests at the service boundary and return predictable error shapes. Keep a model call behind this boundary so clients do not depend on one provider’s response format.

### 1.2 Data and database readiness

Model transactional records separately from retrieved documents and generated text. Identify primary keys, ownership and retention. A vector index supports similarity lookup; it does not replace the transactional database or enforce every access rule automatically.

### 1.3 Testing and Git

Use version control to make changes reviewable and tests to preserve contracts. Include invalid-input and permission-denial cases. A successful prompt example is not a regression suite; keep representative fixtures and expected behaviors under review.

### 1.4 Cloud foundations

A deployed service needs configuration, secrets, logs, health checks and a recovery plan. Separate environment configuration from source code. Define what happens when a dependency times out, rather than letting an infrastructure failure appear as a confident answer.

## Worked lab

POST /assistant/query
Input: {question, conversationId}
Identity: authenticated server context
Output: {status, answer, sources, requestId}
Failures: invalid request; access denied; source unavailable
Never accept a client-supplied role as authorization.

The contract lets the UI handle success and failure without guessing from a generated paragraph.

## Assignment

1. Define request/response schemas.
   Your evidence: 

2. Create a synthetic database fixture with two organizations.
   Your evidence: 

3. Test invalid input and dependency timeout.
   Your evidence: 

## Evidence to submit

Service contract, fixture and boundary tests.

## Review

Should the browser decide the user’s trusted role?

Your reasoning: 
