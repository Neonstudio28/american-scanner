# Error reporting

Console messages should identify recoverable camera and model-loading failures without logging frame data. Avoid serializing media streams, image pixels, detector boxes, or other sensitive runtime data into future diagnostics.