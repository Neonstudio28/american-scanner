# CDN Failure Handling

Document the failure mode when the face-api dependency cannot be fetched. The application should not keep retrying indefinitely and should expose a local, understandable recovery path where possible.