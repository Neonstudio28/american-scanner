# Video Readiness

Detection should not start until the video element has usable dimensions and ready state. Guard against zero-sized frames and unavailable metadata before sampling or drawing overlays.