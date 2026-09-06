# Full-Stack Developer Path

## Module 4: Data and Production

Connect data modeling, release practice and the final application.

### 4.1 SQL modeling

SQL modeling defines keys, relationships and constraints that protect data integrity. Choose a grain for each table and use transactions for related changes that must succeed together. Indexes support access patterns but have write and storage costs.

### 4.2 NoSQL patterns

Document-oriented data models trade joins for embedded or referenced structures. Choose based on update and query patterns rather than fashion. Duplicated values need an explicit consistency strategy.

### 4.3 Docker and CI/CD

A container packages an application environment; CI verifies and builds changes. Keep secrets outside images and test the production artifact. Deployments need health checks and rollback planning, including database compatibility.

### 4.4 Full-stack capstone

The capstone integrates a responsive frontend, validated API, data model and tests. Demonstrate failures and permissions as well as the happy path. Include setup instructions and identify simulated integrations honestly.

## Worked lab

Release checklist:
Schema changes reviewed -> tests -> build -> smoke test
Verify: create, read, update, reject unauthorized request
Record: environment variables required, migration order, rollback limits
Never commit a real secret in a starter project.

A reproducible release is part of the project evidence, not an optional final screenshot.

## Assignment

1. Model the project’s records and relationships.
   Your evidence: 

2. Choose one SQL or document access pattern and justify it.
   Your evidence: 

3. Deliver the integrated application with tests and setup instructions.
   Your evidence: 

## Evidence to submit

Full-stack capstone and deployment runbook.

## Review

Can rolling back code always reverse a destructive schema change?

Your reasoning: 
