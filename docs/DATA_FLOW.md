# Data Flow

1. Camera permission is requested by the browser.
2. Video frames remain in the page runtime.
3. Face detection produces transient coordinates.
4. UI state drives the scan animation and result screen.

No step should persist raw camera frames or face embeddings.