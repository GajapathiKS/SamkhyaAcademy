# Cybersecurity Foundations

## Module 1: Security Foundations

Review an isolated learning application using synthetic records and explicit authorization to test.

### 1.1 Security principles

Confidentiality, integrity and availability describe different security needs. Identify the asset and the consequence of a failure before selecting a control. A useful review explains which risk a control reduces and which risk remains.

### 1.2 Threat actors and attack surfaces

An attack surface includes inputs, dependencies, interfaces and administrative access. Model plausible capabilities rather than assuming every threat actor has unlimited access. Stay within the authorized lab and do not test unrelated systems.

### 1.3 Threat modeling

A threat model connects actors, assets, trust boundaries and abuse cases. Draw how data moves and where a less-trusted input crosses into a privileged operation. Prioritize based on impact and feasibility rather than the visual size of a diagram.

### 1.4 Security controls

Preventive, detective and recovery controls serve different purposes. Combine them with clear ownership and tests. A control that exists in a policy document but is not enforced in the application should not be counted as effective protection.

## Worked lab

Asset: private project notes
Boundary: browser -> API -> database
Abuse case: learner requests another learner’s project
Control: server-side resource authorization
Evidence: authorized request succeeds; cross-user request is denied.

The exercise tests the boundary with synthetic accounts, not real users or third-party services.

## Assignment

1. Draw the lab’s trust boundaries.
   Your evidence: 

2. Write three scoped abuse cases.
   Your evidence: 

3. Map each case to a control and verification method.
   Your evidence: 

## Evidence to submit

Threat model and authorized test plan.

## Review

Is the existence of a written policy enough to establish that a control works?

Your reasoning: 
