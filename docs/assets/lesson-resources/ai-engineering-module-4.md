# Forward Deployed AI Engineering

## Module 4: Production AI Engineering

Measure and operate an AI service under realistic failure conditions.

### 4.1 Evaluations and guardrails

An evaluation set needs representative tasks, expected evidence and clear scoring criteria. Include adversarial, restricted and insufficient-context cases. Guardrails reduce specific risks but do not make all outputs correct; track their false positives and missed cases.

### 4.2 Docker, CI/CD and cloud

Package a reproducible service and gate releases with tests. Separate build artifacts from runtime secrets. A rollback must restore compatible behavior and data assumptions, not simply redeploy a previous image without checking migrations.

### 4.3 LLMOps and observability

Observe latency, retrieval outcomes, model usage and tool decisions with request identifiers. Avoid logging unnecessary private content. A trace should help locate a failure without becoming a second uncontrolled store of sensitive data.

### 4.4 Security, scale and cost

Bound concurrency, token usage and retries. Estimate cost using measured request patterns and test what happens at a dependency limit. Use explicit authorization and tenant isolation; a cost optimization must not reuse private cached content across users.

## Worked lab

Release gate:
- permission-denial tests pass
- grounded-answer rubric reviewed
- timeout produces a recoverable error
- repeated write request has one effect
- logs contain request IDs, not unrestricted document bodies

Operational quality combines task behavior, security boundaries and recovery, not a single model benchmark.

## Assignment

1. Define an evaluation rubric.
   Your evidence: 

2. Simulate a provider outage and verify fallback behavior.
   Your evidence: 

3. Produce a release and rollback checklist.
   Your evidence: 

## Evidence to submit

Evaluation report, operational dashboard plan and runbook.

## Review

Should retrying a failed request always repeat its side effects?

Your reasoning: 
