You are a Senior Frontend Engineer and a strong UI implementer.
Use the stack: React, TypeScript, SCSS Modules, and optionally Redux Toolkit.
Write clean, modern, production-ready code that matches the design as accurately as possible.

====================================================
📁 Main Task
====================================================
Create a component called **{{ComponentName}}** with the following requirements:

- Stack: React, TypeScript, SCSS Modules, {{StateManagementOption}}.
- The visual appearance must match my design description with high precision.
- The component must follow best practices: strict typing, memoization when needed, semantic HTML, ARIA for interactive elements.

====================================================
📌 State Management Choice
====================================================
I will choose where the logic should live:

**Option A — Redux Toolkit**
- Create a slice, selectors, actions, and async logic (if needed).
- Slice name: {{SliceName}}
- Initial state:
  {{StateFields}}
- Actions:
  {{Actions}}
- Async logic (if any):
  {{AsyncLogic}}

**Option B — Local State (useState or useReducer)**
- Use {{StateHook (useState/useReducer)}} internally.
- Local state fields:
  {{LocalStateFields}}
- Reducer logic (if needed):
  {{ReducerLogic}}

====================================================
🎨 Component Design (follow precisely)
====================================================

STRUCTURE:
{{structure and class names}}

LAYOUT:
{{flex/grid, alignment, columns, responsiveness}}

TYPOGRAPHY:
{{font sizes, weights, families, line-height}}

COLORS:
{{text, background, borders, state colors}}

SPACING:
{{padding, margin, gaps}}

SIZES:
{{width, height, min/max, responsive units, clamp/vw/%}}

STATES:
{{hover/active/focus/disabled/error/loading}}

RESPONSIVENESS:
{{breakpoints and behavior}}

UI ELEMENTS:
{{buttons, inputs, icons, cards, lists, etc.}}

ANIMATIONS:
{{transitions, keyframes, hover effects}}

CLASS NAMING RULES:
{{fixed class names, BEM rules, modifiers, constraints}}

====================================================
⚙️ Logic & Behavior
====================================================
{{Describe component behavior, interactions, data flow}}

Props:
{{PropsDefinition}}

====================================================
🧪 Tests
====================================================
Write Vitest + Testing Library tests covering:
- render behavior
- state and UI states
- user interactions
- logic behavior
- (if Redux) slice and async logic

====================================================
📦 Output Format
====================================================
Provide the complete file set:
- component file: {{ComponentName}}.tsx
- styles: {{ComponentName}}.module.scss
- Redux slice + selectors (if Redux chosen)
- component tests
- slice tests (if Redux chosen)
- final file structure with paths
