# Cybersecurity Foundations

## Module 4: Monitoring and Response

Make security events useful for investigation and recovery.

### 4.1 Security logging

A log should identify the event, time, actor or service and decision without exposing unnecessary sensitive payloads. Use consistent identifiers to connect related events. Decide retention and access controls before collecting large volumes.

### 4.2 Detection concepts

A detection rule maps observable behavior to a review signal. Define what the rule can and cannot detect, and test normal behavior as well as the suspicious case. Too many false alarms can make a technically active control operationally ineffective.

### 4.3 Incident response

An incident process covers triage, containment, investigation, recovery and learning. Preserve evidence and assign communication responsibilities. In the course, use a tabletop scenario; do not take disruptive action on a live system.

### 4.4 Security review capstone

The capstone presents scope, assets, findings, controls, residual risk and retest evidence. Separate confirmed observations from hypotheses. A student review is not a compliance certification or a guarantee that no vulnerabilities remain.

## Worked lab

Tabletop: repeated denied requests for private records
Triage: confirm timestamps, scope and identity
Containment proposal: review access and session state
Evidence: request IDs and decisions, not full private records
Recovery: verify control; document lessons and follow-up owner.

An alert becomes useful when it leads to an accountable investigation, not merely another dashboard count.

## Assignment

1. Define a minimal security event schema.
   Your evidence: 

2. Test a detection rule with positive and negative fixtures.
   Your evidence: 

3. Run a tabletop and present the final review.
   Your evidence: 

## Evidence to submit

Security event plan, tabletop record and capstone report.

## Review

Does a clean test run prove that no vulnerabilities remain?

Your reasoning: 
