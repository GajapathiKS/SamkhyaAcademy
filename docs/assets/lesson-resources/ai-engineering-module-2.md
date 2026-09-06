# Forward Deployed AI Engineering

## Module 2: AI Engineering

Build a grounded answer pipeline for approved knowledge sources.

### 2.1 LLM foundations

An LLM predicts output from context; fluent language does not prove factual accuracy. Define the task, acceptable evidence and abstention behavior. Evaluate answerable and unanswerable cases instead of assuming a larger model removes the need for verification.

### 2.2 Prompt and context engineering

Separate task instructions from retrieved evidence and user input. Context has a finite budget, so select relevant material and preserve source identifiers. Treat instructions inside documents as untrusted data rather than authority to change system behavior.

### 2.3 Structured output and tools

Structured output makes parsing predictable, but schema validity does not establish semantic correctness. Validate values and permission before executing a tool. A proposed action should remain a proposal until the authorized workflow accepts it.

### 2.4 Embeddings, vector databases and RAG

Embeddings support similarity search over representations of content. Retrieval quality depends on chunking, metadata and evaluation. Filter evidence by the requesting user’s permissions before it reaches the model, and retain citations that actually support the answer.

## Worked lab

Question -> identity-aware retrieval -> evidence selection
Evidence: [{sourceId:"policy-4", text:"..."}]
Answer: {status:"supported", text:"...", sources:["policy-4"]}
No sufficient evidence -> status:"needs_review"
Proposed write -> validate -> authorize -> approve -> execute

A source list is useful only when the cited evidence supports the claim and the user may access it.

## Assignment

1. Create answerable and unanswerable fixtures.
   Your evidence: 

2. Compare two chunking choices on the same questions.
   Your evidence: 

3. Reject a schema-valid but unauthorized tool request.
   Your evidence: 

## Evidence to submit

Grounded response set and retrieval evaluation.

## Review

Does valid JSON prove a generated action is safe?

Your reasoning: 
