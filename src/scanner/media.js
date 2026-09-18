export function stopMediaStream(stream) {
  if (!stream?.getTracks) return

  let tracks
  try {
    tracks = stream.getTracks()
  } catch {
    return
  }
  if (!Array.isArray(tracks)) return

  tracks.forEach(track => {
    try {
      track?.stop?.()
    } catch {
      // A broken track should not prevent the remaining tracks from stopping.
    }
  })
}

export function stopAudio(audio) {
  if (!audio) return
  try {
    audio.pause?.()
  } catch {
    // Cleanup should continue even when a media implementation rejects pause().
  }
  try {
    audio.currentTime = 0
  } catch {
    // Some media implementations expose a read-only currentTime.
  }
}

export function closeAudioContext(context) {
  if (!context?.close) return Promise.resolve()
  try {
    return Promise.resolve(context.close()).catch(() => undefined)
  } catch {
    return Promise.resolve()
  }
}
