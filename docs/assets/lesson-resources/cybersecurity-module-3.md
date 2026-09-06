# Cybersecurity Foundations

## Module 3: Application Security

Validate application boundaries throughout development.

### 3.1 OWASP risks

Use risk categories as prompts for investigation, not a complete security checklist. Identify the actual input, control and consequence in the lab. A category name alone does not establish that a specific vulnerability exists.

### 3.2 Web and API security

Validate requests and enforce object-level permission before returning private data. A complex identifier is not authorization. Test an owner, another user and no session with synthetic records.

### 3.3 Secrets and data protection

Keep secrets out of source code and browser bundles. Limit who can read sensitive data and avoid unnecessary copies in logs. Encryption does not make unrestricted access acceptable; key handling and authorization still matter.

### 3.4 Secure development lifecycle

Build security review into design, implementation, testing and release. Track findings with owners and retest evidence. A fix should include a regression case so the same failure is less likely to return.

## Worked lab

GET /projects/42
Session: learner-A; record owner: learner-B
Required outcome: deny unless explicit sharing grants access
Regression cases: owner allowed; other user denied; no session denied
Log decision metadata without returning the private record.

Randomizing the project ID would not repair the missing permission check.

## Assignment

1. Review a lab API boundary.
   Your evidence: 

2. Create owner/non-owner/no-session tests.
   Your evidence: 

3. Document a repair and its regression evidence.
   Your evidence: 

## Evidence to submit

Application review and remediation report.

## Review

Does replacing sequential IDs with UUIDs fix an authorization failure?

Your reasoning: 
