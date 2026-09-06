# Data Analytics Path

## Module 2: SQL and Data Preparation

Build an analysis dataset with a known row grain.

### 2.1 SQL foundations

Start a SQL query by identifying what one output row represents. Filter deliberately and distinguish WHERE from conditions applied after aggregation. A correct syntax can still answer the wrong business question.

### 2.2 Joins and aggregation

Joins can multiply rows when keys are not unique. Inspect cardinality before aggregating. Counting joined rows is not the same as counting distinct learners when one learner has several events.

### 2.3 Cleaning workflows

A cleaning workflow should be repeatable and preserve an audit trail. Standardize types and labels, document imputation and inspect duplicates. Keep a raw copy so a disputed transformation can be reviewed.

### 2.4 Reusable analysis datasets

A reusable dataset includes its grain, keys, definitions and refresh assumptions. Avoid embedding a different definition of the same metric in every dashboard. Validate totals against a trusted source before publishing.

## Worked lab

SELECT cohort_id, COUNT(DISTINCT learner_id) AS learners
FROM eligible_enrollments
GROUP BY cohort_id;
Before joining lesson_events, inspect events per learner
An event-level join changes the row grain.

Distinct counting can address one duplication problem, but the eligibility definition still needs to be correct.

## Assignment

1. State the grain before writing a query.
   Your evidence: 

2. Demonstrate a one-to-many join that inflates counts.
   Your evidence: 

3. Create a documented, reusable cohort dataset.
   Your evidence: 

## Evidence to submit

SQL queries, cardinality checks and dataset contract.

## Review

Why can a join inflate an enrollment count?

Your reasoning: 
