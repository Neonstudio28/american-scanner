# Model loading

Model loading is a startup dependency with a bounded wait. The UI should distinguish loading, unavailable, and failed states so users never mistake a missing model for a successful scan.