# Applied Machine Learning Engineer Path

## Module 1: Data, Math and Python Bridge

Prepare a reproducible dataset and a defensible prediction question.

### 1.1 Python for data

Use Python transformations with explicit input and output shapes. Preserve a raw fixture and set reproducibility controls where appropriate. A notebook cell that depends on hidden execution order is difficult to review or rerun.

### 1.2 Statistics essentials

Statistics helps describe variation and uncertainty. Distinguish a population from a sample and a correlation from a causal explanation. The evaluation question determines which summary or estimate is useful.

### 1.3 Data preparation

Define the prediction time before selecting features. Exclude information that would not exist at that time. Split data before fitting learned preprocessing so held-out examples do not influence training transformations.

### 1.4 SQL and visualization

SQL extracts records at a defined grain; visualization reveals distributions and quality problems. Inspect join cardinality and missing values before training. A clean-looking chart does not establish that the dataset is free of leakage.

## Worked lab

Prediction: churn in the next month
Allowed feature: activity before the cutoff
Excluded feature: account closure reason populated afterward
Split: earlier periods for training; later held-out period for evaluation
Fit preprocessing only on training data.

A post-outcome field can make a model appear accurate by revealing information unavailable at prediction time.

## Assignment

1. Define a prediction cutoff.
   Your evidence: 

2. Create a feature-availability table.
   Your evidence: 

3. Build a reproducible cleaning and split workflow.
   Your evidence: 

## Evidence to submit

Dataset contract and leakage review.

## Review

Why exclude a field created after the outcome?

Your reasoning: 
