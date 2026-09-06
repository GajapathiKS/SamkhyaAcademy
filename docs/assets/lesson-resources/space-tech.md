# Space Tech Program

## Build a first-pass mission power budget

A small satellite concept has an intermittent payload, a continuous onboard computer and a transmitter used during ground contact. The team needs to estimate average electrical demand.

Distinguish peak power from orbit-average power. Multiply each operating power by its duty cycle to estimate its average contribution, then add the loads. Energy is power multiplied by time; keep units visible. A first-pass average does not size the battery by itself: eclipse duration, conversion losses, operating constraints and margins also matter.

## Worked example

Illustrative loads:
Payload: 8 W at 25% duty cycle -> 2 W average
Computer: 2 W continuously -> 2 W average
Radio: 10 W at 10% duty cycle -> 1 W average
Total before losses and margins: 5 W average
For 1 hour, that average corresponds to 5 Wh.

The peak simultaneous load could exceed the average substantially. Document which loads may operate together and evaluate the eclipse case separately. The figures illustrate a method, not a flight-qualified design.

## Practice

1. Prepare a load table with peak power, duty cycle and operating mode.
   Your evidence: 

2. Add an eclipse energy case and make assumptions explicit.
   Your evidence: 

3. Explain a trade-off between payload operation and communication demand.
   Your evidence: 

## Review criteria

- [ ] Consistent W versus Wh units
- [ ] Peak and average requirements treated separately
- [ ] Assumptions, losses and margins clearly documented

## Reflection

Why is average power alone insufficient to choose a power-system component?

Your explanation: 
