# Retry Policy

Retries should be bounded and user-driven where possible. Permission failures, model failures, and media failures should not create tight retry loops or repeated resource allocation.