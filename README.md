# American Scanner

American Scanner is a React/Vite browser experience that uses the user's camera and face detection to drive an animated scan sequence. The scanner is designed to degrade gracefully when the face-detection model is unavailable and keeps scanner policy/geometry helpers isolated under `src/scanner` so they can be tested without a browser.

## Requirements

- Node.js and npm compatible with the versions required by the checked-in Vite dependencies
- A modern browser with camera (`getUserMedia`) support
- Camera permission for the development/production origin

Camera access normally requires a secure context (`https://`) outside localhost.

## Development

Install the exact dependency versions from the lockfile:

```sh
npm ci
```

Start the Vite development server:

```sh
npm run dev
```

Then open the URL printed by Vite and allow camera access when prompted.

## Quality checks

The repository exposes the same checks used by its quality workflow:

```sh
npm test
npm run lint
npm run build
```

`npm test` runs the scanner's Node test suite. The tests focus on deterministic policy and utility modules rather than requiring camera hardware.

## Scanner architecture

The main React experience lives in `src/App.jsx`. Reusable scanner logic lives in `src/scanner/`, including:

- camera and detector configuration
- scan state transitions and completion policy
- detection streak/progress policy
- face-box normalization and projection
- score calculation
- timing and input validation
- camera error classification and media cleanup

Tests live in `tests/` and use Node's built-in test runner.

## Face detection assets

The app expects face-api.js to be available in the page and loads the Tiny Face Detector model from `/models`. Keep the model assets under `public/models` when deploying the application. If face-api.js or its model cannot be loaded, the current experience falls back instead of blocking startup.

## Camera troubleshooting

If the camera does not start:

1. Confirm the browser has permission to use the camera for the current origin.
2. Confirm no other application has exclusive access to the camera.
3. Use `https://` in production; browsers generally restrict camera APIs on insecure origins.
4. Check the browser console for model-loading or camera errors.

## Production build

Create an optimized bundle with:

```sh
npm run build
```

Preview that build locally with:

```sh
npm run preview
```
