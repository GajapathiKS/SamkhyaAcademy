# Data Analytics Path

## Find the denominator before drawing a conclusion

An enrollment report shows 80 completions from one cohort and 60 from another. A stakeholder concludes that the first cohort performed better.

Counts alone do not establish completion rates. Define the eligible cohort, the observation window and the event used to count completion. Deduplicate learners before aggregation. Keep the definition stable across groups, and separate missing data from a genuine non-completion. Explain uncertainty and confounding factors instead of implying the comparison proves a cause.

## Worked example

Illustrative data:
Cohort A: 80 completions / 100 eligible learners = 80%
Cohort B: 60 completions / 60 eligible learners = 100%
A has more completions; B has the higher completion rate.
Check equal follow-up windows before comparing the rates.

A dashboard should show both numerator and denominator, not only a percentage. The example reverses the initial ranking without changing either completion count. It is teaching data, not a claim about academy performance.

## Practice

1. Write a metric definition including grain, time window and exclusions.
   Your evidence: 

2. Prepare a deduplicated cohort summary in SQL or a spreadsheet.
   Your evidence: 

3. Build a chart with sample size, source date and a decision-oriented annotation.
   Your evidence: 

## Review criteria

- [ ] Correct grain and denominator
- [ ] Reconciled totals with documented exclusions
- [ ] No causal claim from a descriptive comparison alone

## Reflection

Why can comparing a new cohort with a fully elapsed cohort be misleading?

Your explanation: 
