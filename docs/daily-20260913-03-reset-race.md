# Reset race cases

Reset can occur while detection or completion timers are active. Test reset during idle, detected, scanning, and completion phases. No delayed callback should resurrect scan progress, audio, stars, or completion UI after reset.