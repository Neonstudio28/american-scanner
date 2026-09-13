# Detection performance budget

Detection work should avoid creating unnecessary canvases or allocations on every animation frame. Prefer bounded input dimensions, reuse resources where practical, and ensure animation callbacks are cancelled when the component unmounts.