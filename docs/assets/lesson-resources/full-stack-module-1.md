# Full-Stack Developer Path

## Module 1: Web Foundations

Build a semantic, responsive profile page before adding a framework.

### 1.1 Semantic HTML

HTML describes document meaning. Use headings in a coherent hierarchy and choose links for navigation and buttons for actions. A visual card does not automatically need a new semantic section; its role in the document determines the element.

### 1.2 Modern CSS

CSS separates presentation from structure. Use the box model, flexible layouts and bounded widths to accommodate content. Avoid fixed heights for text-heavy cards because translated or longer text can overflow even at the same viewport.

### 1.3 JavaScript and TypeScript

JavaScript provides runtime behavior; TypeScript adds static checks during development. Types do not validate untrusted network data at runtime. Keep state changes explicit and verify input shapes at boundaries.

### 1.4 Accessibility and responsive design

Responsive design adapts content and controls, not just font size. Test keyboard focus, field labels, readable contrast and narrow layouts. A desktop screenshot cannot establish mobile usability or accessibility.

## Worked lab

<main>
  <article aria-labelledby="profile-title">
    <h1 id="profile-title">Learner profile</h1>
    <p>My current learning project.</p>
    <a href="./projects.html">View projects</a>
  </article>
</main>

The link navigates to another resource; it should not be replaced with a button merely to achieve a visual style.

## Assignment

1. Create a semantic profile page.
   Your evidence: 

2. Use a fluid card layout without a fixed text height.
   Your evidence: 

3. Check keyboard focus and a narrow viewport.
   Your evidence: 

## Evidence to submit

Responsive page and accessibility checklist.

## Review

Does TypeScript validate arbitrary JSON after deployment?

Your reasoning: 
