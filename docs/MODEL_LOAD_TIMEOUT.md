# Model Load Timeout

Model initialization should have a bounded wait. After the timeout, stop polling, surface a recoverable status, and avoid scheduling duplicate initialization attempts.