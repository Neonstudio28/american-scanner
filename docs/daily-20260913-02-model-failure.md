# Model failure handling

Model loading is an optional startup dependency. A failed model load must produce an explicit fallback state and must not leave the interface permanently reporting that the model is loading.