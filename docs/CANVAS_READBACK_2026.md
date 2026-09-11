# Canvas Readback

Fallback detection samples a small canvas region. Keep the sampling surface intentionally small, avoid retaining ImageData longer than needed, and stop sampling when the scan is inactive.