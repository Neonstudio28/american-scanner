# Model Load Failures

Define user-visible behavior when the face detector script or local model cannot be loaded. The application should degrade to its documented fallback or an explicit unavailable state and should not loop forever waiting for a dependency.