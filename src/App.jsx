import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const SCAN_DURATION = 4000

// ─── Bouncing Stardavd Component ───────────────────────────────────────────
function BouncingStars({ stars }) {
  const itemRefs = useRef({})
  const posRef = useRef({})
  const frameRef = useRef(null)

  useEffect(() => {
    if (!stars.length) return
    // Initialise positions from the star seed data
    stars.forEach(s => {
      posRef.current[s.id] = { x: s.x, y: s.y, vx: s.vx, vy: s.vy }
    })

    let startTime = null
    function tick(ts) {
      if (!startTime) startTime = ts
      const dt = Math.min((ts - startTime) / 16, 3) // normalise to ~60fps ticks
      startTime = ts

      stars.forEach(s => {
        const p = posRef.current[s.id]
        if (!p) return
        p.x += p.vx * dt
        p.y += p.vy * dt
        // Bounce off edges (size roughly 10vw)
        if (p.x < 0)   { p.x = 0;   p.vx =  Math.abs(p.vx) }
        if (p.x > 88)  { p.x = 88;  p.vx = -Math.abs(p.vx) }
        if (p.y < 0)   { p.y = 0;   p.vy =  Math.abs(p.vy) }
        if (p.y > 88)  { p.y = 88;  p.vy = -Math.abs(p.vy) }

        const el = itemRefs.current[s.id]
        if (el) {
          el.style.left = p.x + 'vw'
          el.style.top  = p.y + 'vh'
        }
      })
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [stars])

  return (
    <>
      {stars.map(s => (
        <img
          key={s.id}
          ref={el => { if (el) itemRefs.current[s.id] = el }}
          src="/stardavd.png"
          alt=""
          className="bouncing-star"
          style={{
            width: s.size + 'px',
            animationDuration: Math.abs(3 / s.spinSpeed) + 's',
            animationDirection: s.spinSpeed > 0 ? 'normal' : 'reverse',
          }}
        />
      ))}
    </>
  )
}

export default function App() {
  const videoRef = useRef(null)
  const detectorRef = useRef(null)
  const anthemPlayerRef = useRef(null)
  const animFrameRef = useRef(null)
  const audioContextRef = useRef(null)
  const phaseRef = useRef('idle')
  const anthemStartedRef = useRef(false)

  const [phase, setPhase] = useState('idle')
  const [scanProgress, setScanProgress] = useState(0)
  const [faceBox, setFaceBox] = useState(null)
  const [modelLoading, setModelLoading] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
  const [starsVisible, setStarsVisible] = useState(false)
  const [eaglesFlying, setEaglesFlying] = useState([])
  const [bouncingStars, setBouncingStars] = useState([])
  const [scanData, setScanData] = useState({ dna: 0, culture: 0, freedom: 0, eagle: 0, burger: 0 })

  // ─── Init face-api.js TinyFaceDetector ───
  useEffect(() => {
    async function initDetector() {
      // Wait for face-api to load from CDN (deferred script)
      let attempts = 0
      while (!window.faceapi && attempts < 40) {
        await new Promise(r => setTimeout(r, 250))
        attempts++
      }
      if (!window.faceapi) {
        console.warn('face-api.js not loaded, using fallback')
        setModelLoading(false)
        return
      }
      try {
        await window.faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        detectorRef.current = 'faceapi'
      } catch (e) {
        console.warn('Model load failed:', e)
      }
      setModelLoading(false)
    }
    initDetector()
  }, [])

  // ─── Start camera ───
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false,
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          // autoPlay attribute handles playback — no explicit .play() needed
        }
      } catch (err) {
        console.error('Camera error:', err)
      }
    }
    startCamera()
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop())
      }
    }
  }, [])

  // ─── Detection loop ───
  useEffect(() => {
    if (modelLoading) return
    let scanStartTime = null
    let scanInterval = null
    let consecutiveHits = 0
    let consecutiveMisses = 0

    async function detect() {
      if (!videoRef.current || videoRef.current.readyState < 2) {
        animFrameRef.current = requestAnimationFrame(detect)
        return
      }

      const currentPhase = phaseRef.current
      if (currentPhase === 'scanning' || currentPhase === 'complete') {
        animFrameRef.current = requestAnimationFrame(detect)
        return
      }

      let detected = false
      let detectedBox = null

      if (detectorRef.current === 'faceapi' && window.faceapi) {
        try {
          const result = await window.faceapi.detectSingleFace(
            videoRef.current,
            new window.faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.4 })
          )
          if (result) {
            detected = true
            const b = result.box
            detectedBox = { xMin: b.x, yMin: b.y, width: b.width, height: b.height }
          }
        } catch (e) { /* ignore */ }
      } else {
        // Skin-tone fallback
        detected = detectFallback()
        if (detected) {
          const vw = videoRef.current.videoWidth || 640
          const vh = videoRef.current.videoHeight || 480
          detectedBox = { xMin: vw * 0.2, yMin: vh * 0.05, width: vw * 0.6, height: vh * 0.7 }
        }
      }

      if (detected) {
        consecutiveHits++
        consecutiveMisses = 0
        if (detectedBox) setFaceBox(detectedBox)

        if (consecutiveHits === 5 && currentPhase === 'idle') {
          phaseRef.current = 'detected'
          setPhase('detected')
          setTimeout(() => {
            if (phaseRef.current !== 'detected') return
            phaseRef.current = 'scanning'
            setPhase('scanning')
            scanStartTime = Date.now()
            scanInterval = setInterval(() => {
              const elapsed = Date.now() - scanStartTime
              const progress = Math.min((elapsed / SCAN_DURATION) * 100, 100)
              const p = Math.floor(progress)
              setScanProgress(p)
              setScanData({
                dna: Math.min(p * 1.2, 100),
                culture: Math.min(p * 0.9, 100),
                freedom: Math.min(p * 1.1, 100),
                eagle: Math.min(p * 0.95, 100),
                burger: Math.min(p * 1.3, 100),
              })
              if (progress >= 40 && !anthemStartedRef.current) {
                anthemStartedRef.current = true
                playAnthem()
              }
              if (progress >= 100) {
                clearInterval(scanInterval)
                scanInterval = null
                phaseRef.current = 'complete'
                setPhase('complete')
                triggerComplete()
              }
            }, 30)
          }, 900)
        }
      } else {
        consecutiveMisses++
        consecutiveHits = 0
        if (consecutiveMisses > 15 && (currentPhase === 'idle' || currentPhase === 'detected')) {
          phaseRef.current = 'idle'
          setPhase('idle')
          setFaceBox(null)
          setScanProgress(0)
          anthemStartedRef.current = false
          if (scanInterval) { clearInterval(scanInterval); scanInterval = null }
        }
      }

      animFrameRef.current = requestAnimationFrame(detect)
    }

    animFrameRef.current = requestAnimationFrame(detect)
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      if (scanInterval) clearInterval(scanInterval)
    }
  }, [modelLoading])

  function detectFallback() {
    // Simple brightness change / skin tone canvas detection
    if (!videoRef.current) return false
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      ctx.drawImage(videoRef.current, 0, 0, 32, 32)
      const data = ctx.getImageData(0, 0, 32, 32).data
      let skinPixels = 0
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2]
        // Rough skin tone detection (works for many skin tones)
        if (r > 80 && g > 40 && b > 20 && r > g && r > b && (r - g) > 10) {
          skinPixels++
        }
      }
      return skinPixels > 80 // ~8% of 32x32 pixels = likely face present
    } catch (e) {
      return false
    }
  }

  function triggerComplete() {
    let glitches = 0
    const glitchTimer = setInterval(() => {
      setGlitchActive(v => !v)
      glitches++
      if (glitches > 14) {
        clearInterval(glitchTimer)
        setGlitchActive(false)
        setStarsVisible(true)
        spawnEagles()
      }
    }, 80)
    playEagleScreech()
    if (!anthemStartedRef.current) {
      anthemStartedRef.current = true
      playAnthem()
    }
  }

  function spawnEagles() {
    // Bouncing Stardavd images
    const stars = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,   // % initial X
      y: 10 + Math.random() * 70,   // % initial Y
      vx: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      vy: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      size: 80 + Math.random() * 80,
      spinSpeed: (Math.random() * 4 + 2) * (Math.random() > 0.5 ? 1 : -1),
    }))
    setBouncingStars(stars)
  }

  function playEagleScreech() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    audioContextRef.current = ctx
    const dur = 1.8

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1200

    const distortion = ctx.createWaveShaper()
    const samples = 512
    const curve = new Float32Array(samples)
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1
      curve[i] = (Math.PI + 300) * x / (Math.PI + 300 * Math.abs(x))
    }
    distortion.curve = curve

    osc.connect(distortion)
    distortion.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.type = 'sawtooth'
    const t = ctx.currentTime
    osc.frequency.setValueAtTime(400, t)
    osc.frequency.exponentialRampToValueAtTime(2500, t + 0.2)
    osc.frequency.exponentialRampToValueAtTime(700, t + 0.6)
    osc.frequency.exponentialRampToValueAtTime(2000, t + 0.9)
    osc.frequency.exponentialRampToValueAtTime(500, t + dur)

    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(1.0, t + 0.05)
    gain.gain.setValueAtTime(0.7, t + 0.6)
    gain.gain.linearRampToValueAtTime(0, t + dur)

    osc.start(t)
    osc.stop(t + dur)
  }

  function playAnthem() {
    // Stop any previously playing anthem
    if (anthemPlayerRef.current) {
      anthemPlayerRef.current.pause()
      anthemPlayerRef.current.currentTime = 0
    }
    const audio = new Audio('/anthem.mp3')
    audio.volume = 0.85
    audio.play().catch(e => console.warn('Anthem play failed:', e))
    anthemPlayerRef.current = audio
  }

  function resetScan() {
    phaseRef.current = 'idle'
    setPhase('idle')
    setFaceBox(null)
    setScanProgress(0)
    setStarsVisible(false)
    setEaglesFlying([])
    setGlitchActive(false)
    setScanData({ dna: 0, culture: 0, freedom: 0, eagle: 0, burger: 0 })
    setBouncingStars([])
    anthemStartedRef.current = false
    // Stop anthem
    if (anthemPlayerRef.current) {
      anthemPlayerRef.current.pause()
      anthemPlayerRef.current.currentTime = 0
      anthemPlayerRef.current = null
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close() } catch (e) { }
      audioContextRef.current = null
    }
  }

  const isScanning = phase === 'scanning'
  const isComplete = phase === 'complete'
  const isDetected = phase === 'detected'

  // Normalized face box for SVG with precise aspect-ratio cover projection
  const normBox = useCallback((box) => {
    if (!box || !videoRef.current) return null
    const vw = videoRef.current.videoWidth || 640
    const vh = videoRef.current.videoHeight || 480

    const videoAspect = vw / vh
    const targetAspect = 1280 / 720

    let scale, offsetX = 0, offsetY = 0

    if (videoAspect < targetAspect) {
      // Video is taller than 16:9 (e.g. 4:3 webcam), top/bottom cropped
      scale = 1280 / vw
      const scaledH = vh * scale
      offsetY = (720 - scaledH) / 2
    } else {
      // Video is wider than 16:9, left/right cropped
      scale = 720 / vh
      const scaledW = vw * scale
      offsetX = (1280 - scaledW) / 2
    }

    // Mirror X because video element has CSS transform: scaleX(-1)
    const mirroredX = vw - box.xMin - box.width

    const x = offsetX + mirroredX * scale
    const y = offsetY + box.yMin * scale
    const w = box.width * scale
    const h = box.height * scale

    // Check if biometric text would clip off right edge
    const textOnLeft = (x + w + 180) > 1240
    const textX = textOnLeft ? Math.max(20, x - 14) : Math.min(1080, x + w + 14)
    const textAnchor = textOnLeft ? 'end' : 'start'

    return { x, y, w, h, textX, textAnchor }
  }, [])

  const nb = faceBox ? normBox(faceBox) : null

  return (
    <div className="app-container">
      {starsVisible && <div className="stars-overlay" />}

      {/* Loading */}
      {modelLoading && (
        <div className="loading-screen">
          <div className="loading-inner">
            <div className="loading-spinner" />
            <p className="loading-text">PATRIOT SCANNER™</p>
            <p className="loading-sub">Initializing facial patriotism protocols...</p>
          </div>
        </div>
      )}

      {/* Video + overlay */}
      <div className={`video-wrapper${glitchActive ? ' glitch' : ''}`}>
        <video ref={videoRef} autoPlay playsInline muted className="video-feed" />

        <svg className="scan-svg" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice">
          {/* Scanline grid */}
          {(isScanning) && Array.from({ length: 15 }, (_, i) => (
            <line key={i} x1="0" y1={i * 48} x2="1280" y2={i * 48}
              stroke="#00ff88" strokeWidth="0.5" opacity="0.12" />
          ))}

          {/* Corner HUD brackets */}
          <g stroke="#00ff88" strokeWidth="2" fill="none" className="hud-corners">
            <path d="M20,70 L20,20 L70,20" />
            <path d="M1210,20 L1260,20 L1260,70" />
            <path d="M20,650 L20,700 L70,700" />
            <path d="M1210,700 L1260,700 L1260,650" />
          </g>

          {/* HUD text */}
          <text x="30" y="100" fill="#00ff88" fontSize="11" fontFamily="'Share Tech Mono',monospace" opacity="0.9">
            MOSSAD SCANNER™ v4.2.0
          </text>
          <text x="30" y="118" fill="#00ff88" fontSize="9" fontFamily="'Share Tech Mono',monospace" opacity="0.6">
            {modelLoading ? 'LOADING...' :
              phase === 'idle' ? '▶ AWAITING SUBJECT' :
              phase === 'detected' ? '⚠ TARGET LOCKED' :
              phase === 'scanning' ? `▶ ANALYZING SUBJECT [${scanProgress}%]` :
              '✓ ANALYSIS COMPLETE'}
          </text>

          <text x="1250" y="100" fill="#00ff88" fontSize="11" fontFamily="'Share Tech Mono',monospace" textAnchor="end">🇮🇱 MOSSAD</text>
          <text x="1250" y="118" fill="#00ff88" fontSize="9" fontFamily="'Share Tech Mono',monospace" textAnchor="end" opacity="0.6">
            INTEL PROTOCOLS ACTIVE
          </text>

          {/* Idle crosshair */}
          {phase === 'idle' && !modelLoading && (
            <g opacity="0.35">
              <circle cx="640" cy="360" r="90" stroke="#00ff88" strokeWidth="1" fill="none" strokeDasharray="10,6" />
              <circle cx="640" cy="360" r="120" stroke="#00ff88" strokeWidth="0.5" fill="none" strokeDasharray="4,8" />
              <line x1="640" y1="250" x2="640" y2="330" stroke="#00ff88" strokeWidth="1" />
              <line x1="640" y1="390" x2="640" y2="470" stroke="#00ff88" strokeWidth="1" />
              <line x1="520" y1="360" x2="600" y2="360" stroke="#00ff88" strokeWidth="1" />
              <line x1="680" y1="360" x2="760" y2="360" stroke="#00ff88" strokeWidth="1" />
              <text x="640" y="242" fill="#00ff88" fontSize="13" fontFamily="'Share Tech Mono',monospace" textAnchor="middle" opacity="0.8">
                POSITION FACE IN CENTER
              </text>
            </g>
          )}

          {/* Face box */}
          {nb && (isDetected || isScanning || isComplete) && (
            <g>
              {/* Main face rect */}
              <rect x={nb.x} y={nb.y} width={nb.w} height={nb.h}
                fill="none"
                stroke={isComplete ? '#FFD700' : '#00ff88'}
                strokeWidth={isScanning ? 2 : 2.5}
                strokeDasharray={isScanning ? '8,4' : 'none'}
                className={isScanning ? 'scan-box-dash' : ''}
              />

              {/* Corner accents */}
              {(() => {
                const c = isComplete ? '#FFD700' : '#00ff88'
                const len = Math.min(nb.w, nb.h) * 0.18
                return (
                  <g stroke={c} strokeWidth="3.5" fill="none">
                    <path d={`M${nb.x},${nb.y + len} L${nb.x},${nb.y} L${nb.x + len},${nb.y}`} />
                    <path d={`M${nb.x + nb.w - len},${nb.y} L${nb.x + nb.w},${nb.y} L${nb.x + nb.w},${nb.y + len}`} />
                    <path d={`M${nb.x},${nb.y + nb.h - len} L${nb.x},${nb.y + nb.h} L${nb.x + len},${nb.y + nb.h}`} />
                    <path d={`M${nb.x + nb.w - len},${nb.y + nb.h} L${nb.x + nb.w},${nb.y + nb.h} L${nb.x + nb.w},${nb.y + nb.h - len}`} />
                  </g>
                )
              })()}

              {/* Scanning beam */}
              {isScanning && (() => {
                const scanY = nb.y + nb.h * (scanProgress / 100)
                return (
                  <g>
                    <rect x={nb.x} y={nb.y} width={nb.w} height={nb.h * (scanProgress / 100)}
                      fill="url(#scanGradient)" />
                    <line x1={nb.x - 5} y1={scanY} x2={nb.x + nb.w + 5} y2={scanY}
                      stroke="#00ff88" strokeWidth="2.5" opacity="0.95" />
                    {/* Glow on scan line */}
                    <line x1={nb.x} y1={scanY} x2={nb.x + nb.w} y2={scanY}
                      stroke="#88ffdd" strokeWidth="6" opacity="0.25" />
                  </g>
                )
              })()}

              {/* Biometric readout */}
              {(isScanning || isComplete) && (
                <g fill={isComplete ? '#00ffcc' : '#00ff88'} fontFamily="'Share Tech Mono',monospace" fontSize="9.5" textAnchor={nb.textAnchor}>
                  <text x={nb.textX} y={Math.max(30, nb.y + 14)}>═══ MOSSAD SCAN ═══</text>
                  <text x={nb.textX} y={Math.max(46, nb.y + 30)}>INTEL RATING....{Math.floor(scanData.freedom)}%</text>
                  <text x={nb.textX} y={Math.max(62, nb.y + 46)}>HUMMUS AFFIN....{Math.floor(scanData.eagle)}%</text>
                  <text x={nb.textX} y={Math.max(78, nb.y + 62)}>CHUTZPAH IQ.....{Math.floor(scanData.burger)}%</text>
                  <text x={nb.textX} y={Math.max(94, nb.y + 78)}>SHABBAT DNA.....{Math.floor(scanData.dna)}%</text>
                  <text x={nb.textX} y={Math.max(110, nb.y + 94)}>FALAFEL MATCH...{Math.floor(scanData.culture)}%</text>
                  <text x={nb.textX} y={Math.max(130, nb.y + 114)}>
                    {isComplete ? '★ ORIGIN: 🇮🇱 ISRAEL ★' : 'ORIGIN: ANALYZING...'}
                  </text>
                </g>
              )}

              {/* Target lock dot at center of face */}
              {isDetected && (
                <g>
                  <circle cx={nb.x + nb.w / 2} cy={nb.y + nb.h / 2} r="4"
                    fill="none" stroke="#FF3B30" strokeWidth="2" className="target-pulse" />
                  <circle cx={nb.x + nb.w / 2} cy={nb.y + nb.h / 2} r="2" fill="#FF3B30" />
                </g>
              )}
            </g>
          )}

          {/* Gradient def */}
          <defs>
            <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" stopOpacity="0" />
              <stop offset="100%" stopColor="#00ff88" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>

        {/* DETECTED banner */}
        {isDetected && (
          <div className="detected-banner">
            <span className="blink-text">⚠ FACE DETECTED — INITIATING PATRIOT SCAN ⚠</span>
          </div>
        )}

        {/* Progress bar */}
        {(isScanning || isDetected) && (
          <div className="progress-container">
            <div className="progress-label">
              <span>FACIAL PATRIOTISM ANALYSIS</span>
              <span className="progress-pct">{scanProgress}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${scanProgress}%` }} />
              <div className="progress-glow" style={{ left: `${Math.max(scanProgress, 1)}%` }} />
            </div>
            <div className="progress-chips">
              {['DNA', 'INTEL', 'CHUTZPAH', 'HUMMUS_IQ', 'SHABBAT'].map((label, i) => (
                <div key={label} className={`chip${scanProgress > i * 20 ? ' chip-active' : ''}`}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═══ COMPLETION OVERLAY ═══ */}
      {isComplete && (
        <div className="complete-overlay" onClick={resetScan}>

          {/* bg.png full-screen background */}
          <div className="mossad-bg" />

          {/* Bouncing + spinning Stardavd images */}
          <BouncingStars stars={bouncingStars} />

          {/* Splashing Hebrew red text */}
          <div className="hebrew-splash-layer" aria-hidden="true">
            {[
              'בלילה שבו הירח נעלם',
              'נשמעו צעדים במסדרון',
              'הדלת נפתחה — לא היה שם איש',
              'רק הרוח נשאה לחישה',
              'הקירות עצמם זכרו',
              'צל שאינו שייך לאיש',
              'השעון נעצר בחצות',
              'כל המראות החשיכו',
            ].map((txt, i) => (
              <span key={i} className="hebrew-splash-word"
                style={{ animationDelay: `${i * 0.18}s`, '--r': Math.random() * 360 + 'deg', '--tx': (Math.random() * 160 - 80) + 'px', '--ty': (Math.random() * 160 - 80) + 'px' }}>
                {txt}
              </span>
            ))}
          </div>

          {/* Result card */}
          <div className="result-card mossad-card">
            <div className="scan-complete-label">— SCAN COMPLETE —</div>

            <div className={`result-main-text mossad-title${glitchActive ? ' glitch-text' : ''}`}>
              SIR WELCOME TO<br />MOSSAD
            </div>

            <div className="result-percentage mossad-pct">1000%</div>

            <div className="hebrew-block">
              <p>בלילה שבו הירח נעלם, נשמעו צעדים במסדרון הישן, אך כאשר הדלת נפתחה לא היה שם איש. רק הרוח נשאה לחישה חרישית, כאילו הקירות עצמם זכרו דבר שאסור היה להיזכר בו.</p>
              <p>אומרים שבין העצים העתיקים מסתתר צל שאינו שייך לאיש. מי שמביט בו זמן רב מדי מתחיל לשמוע את שמו נלחש מתוך החשכה, גם כאשר הוא לגמרי לבדו.</p>
              <p>השעון נעצר בדיוק בחצות, וכל המראות בבית החשיכו בבת אחת. רק השתקפות אחת נשארה במקומה, מביטה בשקט גם אחרי שהאדם כבר התרחק.</p>
            </div>

            <div className="result-badge-row">
              <span className="rbadge mossad-badge">🕍 INTEL CERTIFIED</span>
              <span className="rbadge mossad-badge">🧆 HUMMUS APPROVED</span>
              <span className="rbadge mossad-badge">🕵️ AGENT VERIFIED</span>
              <span className="rbadge mossad-badge">⭐ SHABBAT BLESSED</span>
            </div>

            <div className="result-flag-row">🇮🇱 ✡️ 🇮🇱 ✡️ 🇮🇱</div>

            <p className="click-again">( click anywhere to scan again )</p>
          </div>
        </div>
      )}
    </div>
  )
}
