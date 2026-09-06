# JavaScript Foundations

## Module 2: Browser and DOM

Connect a course filter to an accessible browser interface.

### 2.1 DOM selection

Select the specific DOM element needed and handle a missing match. Keep data separate from rendered nodes. Use textContent for user-derived text so input is not interpreted as markup. A DOM selector is a lookup, not a guarantee that the element exists.

### 2.2 Events

An event listener responds to an interaction after the page has loaded. Use the event target deliberately and avoid installing duplicate listeners on every render. Test both typing and keyboard activation, not only mouse clicks.

### 2.3 Forms and validation

Browser validation improves feedback but does not secure a server. Label every field, explain errors near the relevant input and preserve entered data after an error. Validate again at the trusted boundary when a backend exists.

### 2.4 Accessible UI state

Loading, empty, error and success states need meaningful text, not only a color change. Keep focus visible and do not remove the control currently being used without managing focus. Announce important dynamic status through an appropriate live region.

## Worked lab

search.addEventListener("input", event => {
  const q = event.target.value.trim().toLowerCase();
  const visible = courses.filter(x => x.toLowerCase().includes(q));
  output.textContent = visible.length ? visible.join(", ") : "No matches";
});

The listener updates a text result on each input event. It does not interpret the query as HTML or mutate the source list.

## Assignment

1. Wire a labeled search field.
   Your evidence: 

2. Add a result count and no-results message.
   Your evidence: 

3. Test keyboard navigation and resetting the filter.
   Your evidence: 

## Evidence to submit

Accessible filtering page and interaction checklist.

## Review

Is client-side form validation a replacement for server validation?

Your reasoning: 
