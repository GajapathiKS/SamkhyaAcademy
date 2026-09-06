# JavaScript Foundations

## Build a predictable filter interaction

A course list should update as a learner types. The original course data must remain available so clearing the search restores every item.

Keep source data separate from the rendered result. Array.filter creates a new selection rather than removing elements from the original array. Normalize both the query and the title before comparison. Render user-derived text with textContent so a query is treated as data rather than HTML.

## Worked example

const courses = ["C Fundamentals", "JavaScript", "Full Stack"];
const query = "script".trim().toLowerCase();
const visible = courses.filter(title =>
  title.toLowerCase().includes(query)
);
output.textContent = visible.join(", ");

The result is JavaScript. Clearing the query matches every title. A separate no-results message can explain an empty selection without altering the source array.

## Practice

1. Connect the filter to an input event and show a result count.
   Your evidence: 

2. Add category filtering that composes with the text query.
   Your evidence: 

3. Restore both filters with a keyboard-accessible reset control.
   Your evidence: 

## Review criteria

- [ ] Case-insensitive matching and a useful empty state
- [ ] No HTML injection through user text
- [ ] Source data remains unchanged after repeated filtering

## Reflection

Should a no-results search delete items from the source array?

Your explanation: 
