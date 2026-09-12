# Reset race cases

Exercise reset during every asynchronous phase:

- model loading
- camera startup
- detection request
- detected-to-scanning delay
- active scan interval
- completion animation
- audio playback

After reset, no delayed callback should restore the previous phase or restart audio.
