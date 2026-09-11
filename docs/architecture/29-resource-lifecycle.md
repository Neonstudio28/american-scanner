# Resource lifecycle

Camera tracks belong to the camera effect and are stopped during cleanup. Animation frames belong to the detection/star effects and must be cancelled during cleanup. Audio elements and AudioContexts belong to the scan session and should be stopped or closed during reset.