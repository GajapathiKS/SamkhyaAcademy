# Space Tech Program

## Module 3: Avionics and Communications

Create an educational telemetry chain from a simulated sensor to a ground dashboard. Every reading must remain interpretable when delayed, missing or corrupted.

### 3.1 Embedded systems

An embedded controller has limited memory, execution time and power. Separate periodic acquisition from communication so a slow transmission does not stop sampling. Define startup behavior, watchdog recovery and safe defaults. First test with simulated readings on a desktop; only move to hardware after the timing and state transitions are understood.

### 3.2 Sensors and telemetry

Telemetry is a documented message, not just a number. Include a timestamp or sequence, sensor identifier, value, units and validity status. Distinguish a real zero from a missing reading. A sequence counter helps detect gaps; a checksum detects some transmission corruption but is not authentication. Retain raw samples so processing decisions can be audited.

### 3.3 RF and ground stations

A radio link needs a budget: transmitter power, antenna gains, path loss and other losses determine received power. Compare that result with the receiver requirement and preserve a margin. Contact duration and usable data rate determine transferable data volume. Use a simulated link in this course; real transmissions require appropriate authorization and equipment.

### 3.4 Flight software concepts

Flight software is commonly organized around explicit operating modes and controlled transitions. A safe mode should reduce demand and preserve recovery capability. Define what happens after a sensor timeout, reset or failed command. Verification must include fault paths, not only a successful telemetry run. Prototype code is not certified flight software.

## Worked lab

Synthetic packet:
{seq: 1042, time_s: 62520, sensor: "battery",
 value: 7.6, unit: "V", valid: true}
Ground receives sequences: 1040, 1041, 1043
Detected gap: 1042 (do not invent a replacement reading)
Illustrative contact: 120 s x 9600 bit/s = 1,152,000 bits
At 70% payload efficiency: 806,400 bits = 100,800 bytes
Reserve capacity for overhead, retransmissions and operations.

The useful transfer estimate is about 100.8 kB using decimal units, not the raw link-rate product. Sequence gaps belong in the dashboard as quality information.

## Assignment

1. Define a telemetry schema with units and a missing-data policy.
   Your evidence: 

2. Simulate a delayed, duplicated and missing packet and record the receiver behavior.
   Your evidence: 

3. Draw a normal/safe/recovery state machine and test a sensor timeout.
   Your evidence: 

## Evidence to submit

Telemetry schema, packet-loss test log, ground display and recovery-state diagram.

## Review

Can a checksum prove that a command came from an authorized ground operator?

Your reasoning: 
