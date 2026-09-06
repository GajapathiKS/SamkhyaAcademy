# Applied Machine Learning Engineer Path

## Module 4: Computer Vision, NLP and Multimodal

Evaluate perception tasks according to their actual outputs.

### 4.1 Classification and detection

Classification labels an image; detection locates and labels objects. Choose labels and metrics that match the task. A classifier cannot be evaluated as if it produced reliable object boundaries.

### 4.2 Segmentation, tracking and OCR

Segmentation labels regions, tracking associates observations across time and OCR extracts text. Each introduces different failure modes. Inspect small objects, occlusion, reading order and missing text rather than relying only on an average metric.

### 4.3 NLP and transformers

NLP workflows require a defined text unit, label policy and evaluation set. Tokenization and truncation can remove useful information. Keep sensitive text governed and inspect errors by input type.

### 4.4 Voice and multimodal workflows

Combining voice, image and text does not remove uncertainty from the inputs. Preserve source provenance and detect missing modalities. Define a fallback when one channel fails instead of silently inventing a complete record.

## Worked lab

Document task: extract invoice fields from synthetic scans
Evaluate: field correctness, missing fields and page references
Cases: rotated text, low contrast, multiple totals, missing page
Route uncertain fields to review; do not fabricate values.

A useful extraction workflow represents uncertainty and missing evidence explicitly.

## Assignment

1. Specify the output for two perception tasks.
   Your evidence: 

2. Create a small edge-case evaluation set.
   Your evidence: 

3. Design a missing-modality fallback.
   Your evidence: 

## Evidence to submit

Perception evaluation and error analysis.

## Review

Should an OCR failure be replaced with a plausible-looking value?

Your reasoning: 
