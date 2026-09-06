# Forward Deployed AI Engineering

## Module 3: Agents, Voice and Multimodal AI

Choose bounded orchestration for tasks that combine tools and modalities.

### 3.1 Agents, tasks and memory

An agent selects steps within an allowed action space. Give it a stopping condition, budget and escalation route. Persist only memory that serves a defined purpose and respect retention and permissions; unlimited conversation history is not a memory strategy.

### 3.2 MCP, skills and multi-agent patterns

Tool protocols and reusable skills can standardize integration, but they do not grant trust. Validate tool descriptions, inputs and outputs. Use multiple agents only where independent responsibilities justify coordination cost and potential disagreement.

### 3.3 STT, TTS and realtime agents

Voice adds turn-taking, interruption and latency concerns to a text workflow. Separate speech recognition, task reasoning and speech synthesis. Provide confirmation for consequential actions and a way to recover when recognition changes a name or number.

### 3.4 Vision and document AI

Document and image workflows need provenance and uncertainty handling. OCR may misread tables or lose reading order. Preserve page references and route low-confidence or consequential fields to review instead of treating extracted text as verified ground truth.

## Worked lab

Voice request -> transcript -> clarify ambiguous record ID
Read-only lookup -> summarize with source reference
Proposed change -> explicit confirmation -> authorized write
Timeout or interruption -> preserve safe state; do not retry a write blindly.

A conversational interface still needs the same authorization and idempotency boundaries as a conventional application.

## Assignment

1. Draw task states and stop conditions.
   Your evidence: 

2. Test an interrupted voice-action scenario with synthetic transcripts.
   Your evidence: 

3. Compare extracted fields with their source page.
   Your evidence: 

## Evidence to submit

Orchestration diagram and multimodal failure cases.

## Review

Does a standardized tool connection mean its output is trusted?

Your reasoning: 
