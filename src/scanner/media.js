export function stopMediaStream(stream) {
  if (!stream?.getTracks) return
  stream.getTracks().forEach(track => {
    try {
      track.stop?.()
    } catch {
      // A broken track should not prevent the remaining tracks from stopping.
    }
  })
}

export function stopAudio(audio) {
  if (!audio) return
  audio.pause?.()
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
