# Space Tech Program

## Module 1: Space Systems Foundations

Design an educational Earth-observation mission that measures vegetation change. Start with the decision the data must support, not with a shopping list of satellite components.

### 1.1 Space mission lifecycle

A mission moves from a stakeholder need through concept studies, requirements, design, integration, verification, operations and disposal. At each review, ask whether the evidence supports the next commitment. For vegetation monitoring, define the area, revisit interval and useful data product before selecting an instrument. A successful launch alone does not demonstrate mission success.

### 1.2 Orbital mechanics

An orbit determines where a spacecraft travels, how often it can observe a location and when it can contact a ground station. For an ideal circular orbit, period depends on orbital radius, not altitude alone. Add Earth’s radius to altitude and use consistent units. This simplified calculation does not model drag, inclination, ground coverage or station visibility.

### 1.3 Space environment

Vacuum, radiation, temperature cycling and debris create different design constraints from a terrestrial classroom. Vacuum removes convective cooling; energy must move through conduction and radiation. Distinguish a hazard from a verified requirement: a radiation concern needs an environment assumption, affected component and mitigation strategy. Classroom hardware is not automatically suitable for flight.

### 1.4 Systems engineering

Systems engineering connects the mission objective to measurable requirements, interfaces and verification evidence. A requirement should identify what must happen and how it will be checked. “Good images” is ambiguous; a specified spatial resolution under stated conditions is testable. Track changes because a payload requirement can alter power, thermal, storage and downlink budgets.

## Worked lab

Educational circular-orbit estimate:
Earth radius = 6371 km; altitude = 500 km
Orbital radius r = 6871 km
Earth gravitational parameter mu = 398600 km^3/s^2
T = 2*pi*sqrt(r^3/mu) = approximately 5668 s
Period = approximately 94.5 minutes
This is not a ground-track or communications-coverage analysis.

Using 500 km as r would be a units-and-geometry mistake. The period tells you the time for one ideal orbit; it does not tell you how often a specific farm can be imaged.

## Assignment

1. Write three measurable mission requirements with a verification method.
   Your evidence: 

2. Recalculate the ideal period at 600 km and explain the difference.
   Your evidence: 

3. Draw a requirement-to-subsystem trace linking payload, power and downlink.
   Your evidence: 

## Evidence to submit

Mission brief, orbit calculation with units, and a requirements/verification matrix.

## Review

Does a 94.5-minute orbital period guarantee a new image of the same location every 94.5 minutes?

Your reasoning: 
