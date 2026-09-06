# Forward Deployed AI Engineering

## Design an evidence-grounded service assistant

An internal service team needs answers from approved policy documents and ticket summaries. Some documents are restricted, and some requests ask the system to take an action.

Separate retrieval, answer generation and action execution. Apply the requesting user’s permissions before retrieved text reaches the model. Attach source identifiers so an answer can point to its evidence. Treat document instructions as untrusted content. For a state-changing tool, validate the arguments and require the appropriate approval; a generated sentence is not authorization.

## Worked example

Request + user identity
  -> permission-filtered retrieval
  -> evidence selection with source IDs
  -> grounded answer or insufficient-evidence response
  -> proposed action (if requested)
  -> schema validation + permission + human approval
  -> execution receipt + audit event

A useful answer includes evidence and a clear limit when sources disagree or are insufficient. A proposed ticket update remains a proposal until the authorized action boundary approves it. The same architecture can be implemented with Python, .NET, Java or Node.js.

## Practice

1. Create an evaluation set with answerable, unanswerable and restricted-source requests.
   Your evidence: 

2. Implement a read-only adapter for an enterprise-system fixture.
   Your evidence: 

3. Demonstrate a failed retrieval, a denied action and a successful approved action.
   Your evidence: 

## Review criteria

- [ ] No restricted evidence reaches an unauthorized request
- [ ] Answers cite supporting source IDs and abstain when needed
- [ ] Tool calls validate inputs and produce auditable execution outcomes

## Reflection

Why is retrieval quality alone insufficient for a production assistant?

Your explanation: 
