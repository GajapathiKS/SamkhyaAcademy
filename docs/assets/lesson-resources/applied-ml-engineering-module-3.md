# Applied Machine Learning Engineer Path

## Module 3: Deep Learning

Understand how neural networks learn and where training can fail.

### 3.1 Neural network foundations

A neural network composes parameterized transformations. Specify input shape, output target and loss before choosing layers. More parameters do not compensate for an unclear target or invalid evaluation split.

### 3.2 Optimization

Optimization updates parameters to reduce training loss. Learning rate, batching and initialization influence behavior. Track validation performance as well as training loss, and investigate divergence rather than assuming more training will repair it.

### 3.3 CNNs

Convolutional layers share weights across spatial positions. They are useful for image structure but still require appropriate data, preprocessing and evaluation. Check how resizing or normalization changes the information the model receives.

### 3.4 Sequence and transformer foundations

Sequence models operate on ordered representations; attention relates positions through learned scores. Explain token or time-step shapes before assembling a transformer. An educational model illustrates mechanisms but is not equivalent to a production-scale language model.

## Worked lab

Training trace:
Epoch 1: training loss decreases; validation improves
Later: training loss decreases; validation worsens
Investigate overfitting, split quality and stopping policy
Preserve the selected checkpoint and its configuration.

Training improvement alone is not evidence of better generalization.

## Assignment

1. Draw tensor shapes through a small network.
   Your evidence: 

2. Compare two learning rates on a controlled fixture.
   Your evidence: 

3. Explain a validation-based stopping decision.
   Your evidence: 

## Evidence to submit

Training notebook, shape diagram and learning curves.

## Review

What can declining training loss with worsening validation loss indicate?

Your reasoning: 
