# CDN Dependency Review

The app loads face-api.js from a CDN. Review version pinning, availability, integrity strategy, and fallback behavior before changing the CDN URL. Prefer reproducible dependency versions in production.