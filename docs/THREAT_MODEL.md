# Lightweight Threat Model

Treat camera input, model assets, and browser permissions as trust boundaries.

Mitigations: require secure contexts for camera access, avoid persisting frames, keep third-party scripts minimal, validate model-loading failures, and avoid rendering untrusted strings as HTML.