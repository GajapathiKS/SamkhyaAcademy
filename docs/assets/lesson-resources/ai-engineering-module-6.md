# Forward Deployed AI Engineering

## Module 6: Solution Architecture and Forward Deployment

Select a solution based on the customer’s workflow and evidence needs.

### 6.1 RAG vs fine-tuning vs SLM

Use retrieval when answers need current external evidence; consider adaptation when a measured behavior needs improvement. A smaller model may fit a bounded task, but capacity, latency and maintenance trade-offs need testing. These choices can be combined rather than treated as slogans.

### 6.2 Agent vs deterministic workflow

A deterministic workflow is preferable when steps and decisions are known. An agent may help when the path genuinely varies, but it adds evaluation and control needs. Start with the simplest design that meets the task and add autonomy only for a demonstrated benefit.

### 6.3 Customer discovery and value case

Observe the current workflow, identify users and establish a baseline before estimating value. Include exception handling and approval work in the cost picture. A convincing demonstration is not evidence that the solution fits daily operations.

### 6.4 Forward-deployment capstone

The capstone combines discovery, architecture, an adapter, grounded behavior, evaluation and an operations plan. Show denied requests and failures alongside successes. Present unresolved assumptions and the next validation step instead of claiming production readiness from a prototype.

## Worked lab

Decision record:
Need: current policy answers with citations
Initial choice: permission-filtered retrieval + deterministic response workflow
Why not autonomous writes: no validated approval process yet
Measure: evidence quality, task completion and escalation rate
Next gate: supervised pilot with bounded users

The design follows a task and control boundary, rather than selecting a technology before understanding the problem.

## Assignment

1. Compare two architectures against explicit criteria.
   Your evidence: 

2. Write a customer discovery and baseline memo.
   Your evidence: 

3. Demonstrate a capstone with evaluation and operational evidence.
   Your evidence: 

## Evidence to submit

Architecture decision record and forward-deployment portfolio.

## Review

When should a deterministic workflow remain the preferred design?

Your reasoning: 
