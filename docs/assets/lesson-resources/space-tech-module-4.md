# Space Tech Program

## Module 4: Autonomy and Mission Project

Integrate the mission brief, subsystem budgets and telemetry prototype into a reviewed educational mission package. Prefer explainable behavior to unsupported autonomy claims.

### 4.1 AI and autonomy

Autonomy chooses an action without a person issuing every immediate command. Begin with a deterministic rule and compare any AI component against it. Bound the allowed actions and define a human override and safe fallback. A classifier confidence score is not evidence that a physical action is safe under unfamiliar operating conditions.

### 4.2 Simulation and testing

Simulation makes repeatable tests possible before hardware is available, but the model has limits. Separate unit, integration and end-to-end tests. Inject faults such as missing telemetry, stale commands and low energy. Keep expected outcomes independent from the code under test so a shared mistake does not make both implementation and test appear correct.

### 4.3 Mission operations

Mission operations connects planning, command approval, execution and evidence review. A command needs an identifier, intended mode, validity window and an acknowledgement policy. Document who may approve risky changes. Build a runbook covering a normal contact and a missed contact; preserve logs so an incident can be reconstructed.

### 4.4 CubeSat/CanSat-style capstone

The capstone is a coherent mission concept plus a simulated or ground-based educational demonstrator. Link each requirement to an analysis, inspection or test. Submit interface assumptions, budgets, telemetry evidence and unresolved risks. Do not describe a classroom CubeSat/CanSat-style exercise as launch-ready hardware or imply that spectrum or launch approvals are included.

## Worked lab

Mission review trace:
REQ-01: detect invalid battery telemetry
Test: inject valid=false in the simulator
Expected: flag unknown state; do not display a fabricated voltage
REQ-02: recover from a missed contact
Test: suppress one scheduled downlink
Expected: retain queued data and follow the documented retry policy
Gate: demonstrate tests, explain limitations, then request mentor review.

Passing the simulator tests supports only the tested requirements under the declared model. It does not establish environmental qualification or operational readiness.

## Assignment

1. Compare an autonomy rule with a simple baseline and define a safe fallback.
   Your evidence: 

2. Run three fault-injection cases and link each result to a requirement.
   Your evidence: 

3. Present a mission review package with unresolved risks and proposed next tests.
   Your evidence: 

## Evidence to submit

Mission demonstrator, traceable verification report, operations runbook and final review presentation.

## Review

Does a successful simulation establish that the design will work in orbit?

Your reasoning: 
