# Ophthalmos Adaptive Prototype

A lightweight Vite + React prototype that operationalizes the CVD study plan. It lets you:

- Adjust cone-contrast values to derive adaptive color recommendations.
- Compare iOS static color filters with the adaptive UI concept.
- Run the three experimental tasks (colored button time trial, swipe counter, odd-tile accuracy) and log metrics for each condition.
- Review the participant roster, 15-minute protocol, and questionnaire prompts in one place.

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`). Share that link with study participants or use it for pilot sessions.

## Available scripts

| Command       | Description                                   |
| ------------- | --------------------------------------------- |
| `npm run dev` | Starts the Vite dev server with hot reload.    |
| `npm run build` | Generates a production build in `dist/`.    |
| `npm run preview` | Serves the production build locally.      |
| `npm run lint` | Lints all files under `src/` with ESLint.    |

## Study workflow covered in the prototype

1. **Cone Contrast Test** – Capture L/M/S sensitivity percentages and view immediate adaptation suggestions.
2. **Mode toggle** – Flip between iOS baseline and Adaptive UI to see how palettes and tasks respond.
3. **Task battery** – Run the button, swipe, and odd-tile tasks. Each task records completion time, accuracy proxy, and supporting notes (e.g., tap counts).
4. **Session summary** – Aggregates per-condition metrics for quick mean comparisons.
5. **Questionnaire cards** – Keep Likert prompts and open-ended questions at hand for your 5-minute survey block.

Use the logs table to copy metrics into your analysis sheet, then follow up with NASA-TLX scoring and qualitative coding (Braun & Clarke) as planned.
