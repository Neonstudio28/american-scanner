# Scanner workflow

A typical scanner change should follow this flow:

1. Capture and normalize the incoming scan data.
2. Validate the data before presenting results.
3. Keep parsing and presentation concerns separate so either can evolve independently.
4. Handle unavailable or malformed data without exposing raw errors to users.
5. Verify the main scan path and the empty/error states before release.

Changes to detection or parsing logic should include a focused test case when the project has a suitable test location.
