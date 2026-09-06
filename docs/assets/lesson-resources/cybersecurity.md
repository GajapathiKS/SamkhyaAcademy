# Cybersecurity Foundations

## Trace an access-control failure in a safe lab

In an isolated training application, changing a project ID in a URL reveals another test user’s record. The task is to identify the missing control and verify the repair.

Authentication establishes identity; authorization determines whether that identity may access a particular object. Enforce the object-level check on every request, including API endpoints that are not directly linked in the UI. Use only the supplied lab accounts and synthetic data. A predictable ID is not the root cause; the absent permission check is.

## Worked example

GET /projects/42
Session user: learner-A
Record owner: learner-B
Required decision: deny unless an explicit sharing rule grants access
Regression checks: owner allowed; other user denied; no session denied
Log the decision without exposing the private record.

The repaired endpoint evaluates permission before returning the record. Replacing sequential IDs with random IDs may reduce guessing, but it does not replace authorization.

## Practice

1. Create a small threat model covering actors, assets and trust boundaries.
   Your evidence: 

2. Write owner/non-owner/no-session regression cases against the local fixture.
   Your evidence: 

3. Produce a remediation note with scope, evidence and retest results.
   Your evidence: 

## Review criteria

- [ ] Testing stays within the authorized local lab
- [ ] Permission check occurs before private data is returned
- [ ] Repair is demonstrated by positive and negative tests

## Reflection

Does using a UUID instead of an integer remove the need for an ownership check?

Your explanation: 
