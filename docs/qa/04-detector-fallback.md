# Detector fallback QA

When the face detector model cannot load, verify the fallback path does not throw, the loading indicator eventually clears, and a scan can still return to `idle` after sustained misses.