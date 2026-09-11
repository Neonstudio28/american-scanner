# Camera disconnect QA

Disconnect or disable the active camera after the page has loaded. The app should not crash, throw an unhandled promise, or retain a misleading live-detection result. A fresh camera session should be able to recover after permission is restored.