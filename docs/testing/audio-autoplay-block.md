# Audio autoplay block

Browsers may reject `audio.play()`. The scanner must catch that rejection and continue normally, because audio is decorative feedback rather than a prerequisite for detection.