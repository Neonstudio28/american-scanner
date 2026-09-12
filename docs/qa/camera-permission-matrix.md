# Camera permission QA matrix

Use this matrix when validating scanner startup and recovery.

| Scenario | Expected result |
| --- | --- |
| Permission granted | Preview starts and detection can begin |
| Permission denied | Scanner remains usable and explains how to retry |
| Permission revoked while open | Preview stops cleanly and state returns to a recoverable state |
| No camera device | Clear device error; no retry loop storm |
| Camera already in use | Clear failure state with retry path |
| Browser blocks camera on insecure origin | Explain that camera access requires a secure context |
