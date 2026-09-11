# Error Handling

Expected runtime failures include camera denial, unavailable camera devices, missing model assets, blocked audio playback, and detector exceptions.

Errors should be contained to the affected capability, logged without sensitive frame data, and surfaced with a useful recovery action. A non-critical effect such as sound should never make the scanner unusable.