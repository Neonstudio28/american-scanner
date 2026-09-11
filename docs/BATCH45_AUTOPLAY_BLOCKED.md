# Autoplay Blocking

Browsers may block audio playback until user interaction. Treat rejected `play()` promises as expected environmental conditions and keep the scanner usable without sound.