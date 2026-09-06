# C++ Essentials

## Module 2: Object-Oriented C++

Model task records with invariants instead of a collection of unrelated fields.

### 2.1 Classes and objects

A class combines state with operations that preserve its rules. Define which states are valid before choosing public methods. Keep fields private when callers could otherwise create invalid combinations. Use a plain value type when no invariant needs protection.

### 2.2 Constructors

A constructor establishes a usable object. Initialize members directly and validate required data at the boundary. Avoid creating an object that callers must remember to initialize later. Describe how invalid constructor input is reported.

### 2.3 Inheritance

Inheritance models a substitutable relationship, not simply code reuse. Ask whether a derived object can safely satisfy every expectation of the base. Composition is often clearer for a task that has a reminder rather than is a reminder.

### 2.4 Interfaces and polymorphism

Runtime polymorphism lets a caller use a stable interface while implementations vary. A base used for polymorphic deletion needs an appropriate virtual destructor. Keep the interface small and test implementations against the same behavioral contract.

## Worked lab

struct Notifier {
  virtual ~Notifier() = default;
  virtual void send(const std::string& message) = 0;
};
// ConsoleNotifier implements send without changing its contract.

The caller depends on the notification contract, not console details. The interface does not need to expose storage or UI concerns.

## Assignment

1. Define one invariant for Task.
   Your evidence: 

2. Initialize a Task through its constructor.
   Your evidence: 

3. Compare composition and inheritance for a reminder feature.
   Your evidence: 

## Evidence to submit

Class diagram, invariant tests and interface example.

## Review

Is inheritance automatically the best way to reuse a method?

Your reasoning: 
