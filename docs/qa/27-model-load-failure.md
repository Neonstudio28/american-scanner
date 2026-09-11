# Model-load failure QA

Block or remove the detector model assets and reload. Verify model loading eventually exits its loading state, the fallback path remains available, and the application does not spin indefinitely waiting for a global detector object.