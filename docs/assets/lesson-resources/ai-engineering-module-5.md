# Forward Deployed AI Engineering

## Module 5: Enterprise Integration

Connect enterprise systems without bypassing identity or audit boundaries.

### 5.1 SSO, OAuth/OIDC and RBAC

Authentication identifies the caller; authorization determines allowed actions. OAuth and OIDC have different roles in delegated access and identity. Validate the intended audience and permissions through trusted libraries and configuration rather than interpreting token text as sufficient proof.

### 5.2 Enterprise APIs and databases

An adapter should expose a small, validated contract over the enterprise API or database. Handle pagination, rate limits and schema changes. Use read-only credentials for read-only work and avoid making unrestricted database access available to a model.

### 5.3 SharePoint, SAP and CRM integration

SharePoint, SAP and CRM are examples of enterprise information sources, not separate academy consulting offerings. Map document or record permissions into retrieval. Preserve source identifiers and update rules so an answer does not rely indefinitely on stale enterprise data.

### 5.4 Service platforms and legacy systems

Legacy and service-management systems may lack modern event guarantees. Use explicit mappings, reconciliation and auditable retry handling. A connector must distinguish “request sent” from “change confirmed”, especially after a timeout.

## Worked lab

Adapter request: {recordId, operation:"read"}
Trusted identity -> policy check -> source API
Response: {sourceId, version, permittedFields, fetchedAt}
Write path: validated command + idempotency key + receipt
Reconcile an uncertain timeout before replaying a mutation.

The adapter narrows capability and preserves evidence. It is not a shortcut around source-system permissions.

## Assignment

1. Design a read-only CRM fixture adapter.
   Your evidence: 

2. Map two users to different source permissions.
   Your evidence: 

3. Demonstrate a timeout with reconciliation rather than duplicate writes.
   Your evidence: 

## Evidence to submit

Adapter contract, access matrix and audit trace.

## Review

Does access to an integration account justify exposing every source record?

Your reasoning: 
