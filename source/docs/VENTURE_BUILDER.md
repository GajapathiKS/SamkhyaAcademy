# Entrepreneurship Venture Builder

The Entrepreneurship module is an execution workflow inside the LMS, not just a collection of course lessons.

## Product principle

A participant should move a venture through evidence and mentor checkpoints:

**Idea → Validate → Model → MVP → Launch → Measure → Scale**

The platform stores the participant/team workspace, artifacts, stage statuses, reviews, mentor scoring and milestones.

## UX / feature set

### 1. Venture Builder landing

Public program page that positions the founder journey and routes learners into idea submission or enrollment.

### 2. Idea Submission & Opportunity Intake

Structured intake captures:

- venture / idea name
- concise idea summary
- problem statement and urgency
- category, severity and geography
- target customer and market sizing note
- proposed solution and differentiators
- expected impact and alternatives
- founder background / LinkedIn
- requested mentorship areas

Submitted ideas are persisted in `VentureIdeaSubmission` and can be reviewed before conversion to a live workspace.

### 3. Venture Workflow & Stage Progress

Seven-stage workspace with stage locks, task guidance, required artifacts, readiness score and next-stage progress.

### 4. Artifacts & Launch Readiness

Tracks founder deliverables such as interview evidence, business model, MVP prototype, technical overview, launch plan, pitch deck, metrics and scale documents.

### 5. Mentor Review & Feedback

Mentor scorecard supports:

- Problem Clarity
- Customer Relevance
- Solution Approach
- Founder Readiness
- Scalability Potential

Decision outcomes:

- Approved
- Changes Requested
- Comment Only

Approved stages unlock the next stage. Changes Requested keeps the founder in the current stage for revision/resubmission.

## Mentor Hub

Internal roles (`PLATFORM_ADMIN`, `CONTENT_ADMIN`, `VENTURE_MENTOR`) can access the review queue and structured stage review pages. External customers are not content authors.

## Files / object storage

Artifact metadata stores an S3-compatible object key. Local development can point the storage client to MinIO; production can use AWS S3 without changing the domain model.

## Visual acceptance references

The five approved UX references are in `docs/ux/entrepreneurship/` and should be used when refining the production UI to match the approved presentation visuals.
