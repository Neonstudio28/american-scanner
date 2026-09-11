# Audio Context Lifecycle

Create Web Audio resources only when needed, handle autoplay restrictions, and close contexts during reset or teardown. Do not leave audio nodes running after a scan session ends.