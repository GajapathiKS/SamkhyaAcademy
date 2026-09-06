# Applied Machine Learning Engineer Path

## Prevent leakage in a customer-risk model

A model predicts whether a customer will leave during the next month. The dataset includes activity timestamps and a field populated only after an account is closed.

Define the prediction time first. A feature is valid only if it would be available at that time in real use. The post-closure field leaks the target and must not enter training. Split data in a way that reflects deployment, and fit learned preprocessing only on the training partition. Compare a simple baseline before choosing a more complex model.

## Worked example

1. Fix a prediction cutoff for each example.
2. Exclude features created after that cutoff.
3. Separate train, validation and final test periods.
4. Fit preprocessing and the model on training data.
5. Choose the operating threshold on validation data.
6. Evaluate once on the held-out test set.

A lower but credible held-out score is more useful than a misleading score caused by leakage. Report the confusion matrix and precision/recall at the chosen threshold, together with subgroup limitations and the cost of false decisions.

## Practice

1. Document when every candidate feature becomes available.
   Your evidence: 

2. Build a reproducible baseline pipeline and compare one stronger model.
   Your evidence: 

3. Prepare a model card with evaluation limits and monitoring signals.
   Your evidence: 

## Review criteria

- [ ] No target or temporal leakage
- [ ] Reproducible preprocessing and separate final evaluation
- [ ] Threshold choice explained in terms of the workflow

## Reflection

Why should the final test set not be used repeatedly to choose model settings?

Your explanation: 
