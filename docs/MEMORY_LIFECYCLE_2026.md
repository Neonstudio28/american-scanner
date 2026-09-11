# Memory Lifecycle

Release references to media streams, animation frames, timers, audio objects, and detector state when scanning ends or the component unmounts. Cleanup must be safe to run more than once.