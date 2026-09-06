# Applied Machine Learning Engineer Path

## Module 2: Classical Machine Learning

Compare simple models using an evaluation design that reflects deployment.

### 2.1 Regression and classification

Regression predicts a quantity; classification predicts a category or class probability. Establish a simple baseline before fitting a complex model. The business decision determines which errors matter and how predictions will be used.

### 2.2 Feature engineering

Features should encode information available at inference time. Fit transformations using training data and apply the learned transformation to held-out data. A feature that identifies the outcome indirectly can still leak the target.

### 2.3 Clustering

Clustering groups examples according to a representation and similarity choice. It does not automatically discover useful business segments. Inspect stability and interpretability, and avoid assigning meaning to cluster numbers alone.

### 2.4 Metrics and model selection

Select metrics that match class balance and error costs. Keep model selection separate from final testing. Choose a decision threshold on validation evidence and report limitations instead of presenting one aggregate score as universal quality.

## Worked lab

Compare: majority baseline vs classifier
Report: confusion matrix, precision, recall and threshold
Select settings on validation data
Use the final held-out set once for the final estimate
Inspect subgroup and time-period limitations.

A credible lower score is more useful than a high score produced by repeated adaptation to the test set.

## Assignment

1. Fit or outline a baseline comparison.
   Your evidence: 

2. Explain a feature transformation without leakage.
   Your evidence: 

3. Choose metrics and a threshold for a stated decision.
   Your evidence: 

## Evidence to submit

Model comparison and evaluation memo.

## Review

Why not repeatedly choose settings on the final test set?

Your reasoning: 
