# Local development

Install dependencies with `npm install`, then run `npm run dev` for the Vite development server. Use `npm run build` before opening a change that affects application code, and run `npm run lint` for static checks.

## Browser requirements

Camera access requires a secure context in deployed environments. Localhost is treated as secure by modern browsers. Grant camera permission only when you are comfortable doing so; the application requests video without an audio track.
