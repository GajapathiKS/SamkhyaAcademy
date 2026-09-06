# Space Tech Program

## Module 2: Spacecraft Subsystems

Turn the mission concept into compatible subsystem budgets. The payload is intermittent, the computer runs continuously and the radio transmits only during contact.

### 2.1 Power systems

Power is an instantaneous rate in watts; energy is accumulated demand in watt-hours. Estimate average demand by multiplying operating power by duty cycle, but also calculate simultaneous peak demand. Size an eclipse-energy case separately and state conversion losses and usable battery fraction. A favorable average cannot compensate for an undersized power rail.

### 2.2 Thermal and structures

Thermal design tracks where heat is generated and how it leaves the spacecraft. Structural design considers loads, attachment points and alignment, including launch conditions. Begin with a heat-flow sketch and a load-path sketch before a detailed simulation. Record material and boundary assumptions; a simulation with incorrect constraints can give precise but misleading results.

### 2.3 ADCS

Attitude determination estimates orientation using sensors; attitude control changes orientation using actuators. A controller compares desired and estimated attitude, then commands a response. Specify pointing knowledge, pointing accuracy and stability separately. A payload can meet its resolution requirement yet fail its mission if orientation error moves the target outside the field of view.

### 2.4 Subsystem interfaces

Subsystem interfaces define more than connector shape. Document voltage range, peak current, signal levels, timing, data format, units and fault behavior. Assign one owner on each side and version the agreement. Check how a radio current spike affects the computer supply instead of treating each subsystem budget as independent.

## Worked lab

Illustrative power budget:
Payload: 8 W x 0.25 = 2 W average
Computer: 2 W x 1.00 = 2 W average
Radio: 10 W x 0.10 = 1 W average
Average before losses = 5 W; simultaneous peak = 20 W
35-minute eclipse at 5 W needs 2.92 Wh at the loads
At 85% conversion efficiency and 80% usable capacity:
Required nominal energy >= 2.92/(0.85*0.80) = 4.29 Wh
Educational estimate only; aging, temperature and margins remain to be assessed.

The 5 W average, 20 W peak and 4.29 Wh nominal-energy estimate answer different design questions. Preserve all three instead of replacing them with one “power requirement”.

## Assignment

1. Create a peak/average load table and identify incompatible operating modes.
   Your evidence: 

2. Sketch heat paths and identify a temperature-sensitive component.
   Your evidence: 

3. Write an interface record for the payload-computer connection, including fault behavior.
   Your evidence: 

## Evidence to submit

Power and eclipse budgets, a thermal/load-path sketch, and an interface-control record.

## Review

Why must a 5 W average-power design still evaluate a 20 W operating condition?

Your reasoning: 
