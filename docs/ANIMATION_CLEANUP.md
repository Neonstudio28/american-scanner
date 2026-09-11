# Animation Cleanup

Cancel requestAnimationFrame loops when components unmount or the scanner stops. Keep DOM style writes inside the active animation lifecycle to avoid stale references.