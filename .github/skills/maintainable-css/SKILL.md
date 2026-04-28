---
name: maintainable-css
description: "Use when creating or refactoring CSS for maintainability: semantic structure, reusable variables, low-specificity selectors, and consistent organization."
---

# Maintainable CSS Skill

This skill helps write or refactor CSS into a maintainable structure for the current project.

## Use when

- styling a component, page, or layout
- refactoring existing styles to reduce duplication
- improving naming consistency and predictability
- reducing selector specificity and cascade problems
- introducing theme tokens, spacing scales, or layout utilities

## What to do

1. Identify the component or page purpose and the elements to style.
2. Favor semantic class names or component/scoped selectors instead of presentational names.
3. Extract repeated values into variables or theme tokens:
   - colors
   - spacing
   - typography
   - border-radius / shadows
4. Keep selectors shallow and low-specificity:
   - avoid deep descendant chains
   - avoid `!important`
   - avoid selector wars between global styles and component styles
5. Keep CSS grouped by role:
   - layout
   - spacing
   - typography
   - visuals / decoration
6. Prefer reusable utility classes when the design requires repeated spacing or alignment patterns.
7. Use mobile-first responsive breakpoints and keep responsive overrides minimal.
8. Document or preserve the project’s existing CSS architecture:
   - global variables in `:root`
   - component-specific classes
   - shared utility classes

## Style guidance

- Use consistent naming conventions such as BEM or semantic block/element names.
- Extract visual tokens into custom properties when they are reused.
- Keep CSS files small and focused on a single component or page area.
- Prefer composition over duplication.
- When fixing bugs, simplify the selector hierarchy before adding more specificity.

## Completion checks

- class names are meaningful and reusable
- common values are centralized in variables or theme tokens
- selectors are simple and maintainable
- styles do not rely on cascade-specific tricks
- responsive rules are grouped clearly
- the final CSS fits the project’s existing style organization
