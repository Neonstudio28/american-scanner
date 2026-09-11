# Completion race

Verify that a reset or camera failure occurring at the end of the scan cannot race with the completion callback. Exactly one terminal outcome should be visible to the user.