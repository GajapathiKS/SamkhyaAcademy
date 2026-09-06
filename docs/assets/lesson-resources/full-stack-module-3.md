# Full-Stack Developer Path

## Module 3: Backend Specialization

Create an API that enforces rules independently of its user interface.

### 3.1 API design

An API contract defines resource identity, validation, response shape and errors. Use predictable status semantics and document pagination. A backend should not depend on the caller having used a particular screen.

### 3.2 Authentication and authorization

Authentication establishes identity; authorization evaluates whether that identity may perform an operation on a resource. Enforce ownership or organization scope on the server for every relevant request, including direct API calls.

### 3.3 Validation and errors

Validate types, ranges and required relationships at the boundary. Return useful but non-sensitive errors. Do not expose a database stack trace or internal credentials to explain an invalid request.

### 3.4 Backend testing

Backend tests should exercise contracts, permissions and state transitions. Use isolated fixtures and verify that rejected requests have no unintended effect. A response code alone may not prove that the database remained unchanged.

## Worked lab

GET /projects/42
Caller: learner-A; owner: learner-B
Expected: access denied; no project payload
POST /projects: validate -> authorize -> write -> return ID
Tests include no session, wrong owner and malformed body.

A hidden UI button is not an authorization control. The service must reject an unauthorized direct request.

## Assignment

1. Write an API contract.
   Your evidence: 

2. Implement or diagram resource-level authorization.
   Your evidence: 

3. Test rejection without a database mutation.
   Your evidence: 

## Evidence to submit

API specification and permission regression tests.

## Review

Is hiding an Edit button enough to prevent unauthorized edits?

Your reasoning: 
