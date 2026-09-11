# Animation cleanup

Every animation frame scheduled by the scanner should have a matching cancellation path. Effects that create timers or animation frames must clean them up when dependencies change or the component unmounts.