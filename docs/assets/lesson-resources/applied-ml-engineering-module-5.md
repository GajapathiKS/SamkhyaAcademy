# Applied Machine Learning Engineer Path

## Module 5: LLM and SLM Engineering

Adapt a model only after defining the behavior and evaluation gap.

### 5.1 Dataset preparation and evaluation

Training data needs provenance, consistent formatting and an explicit label policy. Separate development and evaluation examples. Review duplication and permissions before using a dataset, not after an apparently successful training run.

### 5.2 Supervised fine-tuning

Supervised fine-tuning adjusts a pretrained model using target examples. It can improve a bounded behavior but does not guarantee current factual knowledge or safe action execution. Compare against a prompt or retrieval baseline.

### 5.3 PEFT, LoRA and QLoRA

Parameter-efficient adaptation updates a subset or additional low-rank parameters. Quantized adaptation can reduce memory requirements, but setup and quality trade-offs must be measured. Do not assume the smallest training footprint gives the best deployed result.

### 5.4 Quantization and distillation

Quantization reduces representation precision; distillation trains a smaller model to approximate useful behavior. Evaluate quality, latency and resource use on the real task. Compression can change failure patterns even when aggregate performance appears similar.

## Worked lab

Adaptation experiment:
Baseline -> fixed evaluation set -> one controlled adaptation
Compare task quality, unsupported outputs, latency and memory
Keep dataset version, configuration and checkpoint ID
Reject improvement claims that use a changed test set.

A controlled comparison keeps the task and evaluation stable while changing the model treatment.

## Assignment

1. Write a dataset card.
   Your evidence: 

2. Compare adaptation with a non-training baseline.
   Your evidence: 

3. Document compression trade-offs and error changes.
   Your evidence: 

## Evidence to submit

Adaptation experiment and model card.

## Review

Does fine-tuning remove the need for external evidence and authorization?

Your reasoning: 
