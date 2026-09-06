# Cybersecurity Foundations

## Module 2: Identity and Networks

Keep identity, permission and network exposure separate in the design.

### 2.1 Authentication and authorization

Authentication establishes who is calling; authorization decides what that caller may do. Check the resource as well as the operation. A valid login does not justify access to every record.

### 2.2 IAM and least privilege

Least privilege limits permissions to the task and duration needed. Review service accounts as well as people. Remove unused access and test denial paths; adding a role label without enforcement does not create a boundary.

### 2.3 Network security

Network controls restrict reachability but do not replace application authorization. Identify public and private interfaces, allowed flows and administrative paths. Use a local diagram or simulator for the exercise instead of scanning an external network.

### 2.4 Cloud security basics

Cloud security includes identity, configuration, secrets, data protection and operational monitoring. Responsibility is shared between the provider and the customer. A managed service does not automatically validate application permissions or protect a leaked credential.

## Worked lab

Access matrix:
Owner: read/update own project
Other learner: no access
Reviewer: read only when explicitly assigned
Anonymous: no private data
Test each row against the same project fixture.

Testing the same resource under different identities reveals authorization errors that a single successful login cannot.

## Assignment

1. Build a least-privilege matrix.
   Your evidence: 

2. Draw permitted network flows.
   Your evidence: 

3. Review a synthetic cloud configuration for unnecessary access.
   Your evidence: 

## Evidence to submit

Access matrix and boundary test evidence.

## Review

Does placing an API on a private network remove the need for authorization?

Your reasoning: 
