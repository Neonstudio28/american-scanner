# Camera Permissions

Request `getUserMedia` only when the scanner needs it. Handle denial, missing devices, insecure contexts, and browser policy failures without crashing the app.

A permission error should leave the page usable and explain how the user can retry.