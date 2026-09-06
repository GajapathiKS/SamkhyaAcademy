# Applied Machine Learning Engineer Path

## Module 6: Educational Transformer and MLOps

Connect an educational transformer to a reproducible serving workflow.

### 6.1 Tokenizer and embeddings

A tokenizer maps input text to token identifiers; embeddings map identifiers to learned vectors. Record vocabulary and preprocessing versions with the model. A mismatch between training and serving tokenization can invalidate otherwise correct weights.

### 6.2 Transformer blocks and training loop

A training loop performs forward computation, loss evaluation, gradient computation and parameter updates. Handle padding and masks consistently. Use a small educational dataset to inspect the mechanics rather than imply production-language capability.

### 6.3 Model serving

Serving needs a versioned input contract, resource limits and health checks. Load the matching preprocessing artifacts and model. Define behavior for invalid or oversized input before exposing an endpoint.

### 6.4 Monitoring, drift and capstone

Monitoring tracks data quality, latency and task outcomes after deployment. Drift is a signal to investigate, not automatic proof that retraining will help. The capstone should include rollback and evaluation of a proposed replacement.

## Worked lab

Artifact bundle: tokenizer + model + preprocessing + config + evaluation
Endpoint: validate input -> transform -> predict -> return version
Monitor: invalid inputs, latency, distribution changes and reviewed errors
Replacement: evaluate before promotion; keep rollback artifact.

A model file alone is not a reproducible prediction service. The surrounding artifacts define how inputs are interpreted.

## Assignment

1. Trace a tiny training loop.
   Your evidence: 

2. Define a versioned serving contract.
   Your evidence: 

3. Present a capstone with monitoring and rollback plans.
   Your evidence: 

## Evidence to submit

Educational model, serving prototype and MLOps report.

## Review

Does detected drift always mean the model must be retrained immediately?

Your reasoning: 
