# Audio Lifecycle

Audio is an optional enhancement and must never block scanning.

Stop active audio when resetting the scanner, unmounting, or starting a replacement sound. Catch rejected `play()` promises because browsers may block autoplay until user interaction.