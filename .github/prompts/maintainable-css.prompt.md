---
name: maintainable-css
description: "Use this prompt to refactor or create CSS with a maintainable structure, including semantic naming, reusable tokens, and low-specificity selectors."
---

Use the `maintainable-css` skill to review, refactor, or author CSS for the current project.

When invoked:

- preserve or align with the project's existing CSS organization
- prefer semantic class names over presentational names
- centralize repeated values into variables or theme tokens
- keep selectors shallow and avoid `!important`
- group responsive rules clearly and keep mobile-first patterns

If this is a refactor task, identify duplication and replace it with reusable utilities or component-scoped styles.
