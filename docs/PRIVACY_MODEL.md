# Privacy Model

The scanner should treat camera frames as sensitive input.

## Rules

1. Request camera access only when the scanner needs it.
2. Keep processing client-side where possible.
3. Do not persist frames or face detections unless explicitly required.
4. Stop media tracks when scanning ends or the page unmounts.
5. Explain camera usage and fallback behavior clearly to users.

This document is a maintainer checklist, not legal advice.
