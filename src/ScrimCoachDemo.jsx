import { useEffect, useRef, useState } from 'react'

const ORANGE = '#ff8a3d'
const GREEN = '#7fffb2'
const RED = '#ff6b6b'
const DISCORD = '#5865f2'

function animateCount(setter, from, to, duration, fmt) {
  const start = performance.now()
  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    setter(fmt(from + (to - from) * ease))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const AVATARS = ['#ff8a3d', '#5b8fff', '#7fffb2', '#b47cff', '#ff5c8a']
const MARKERS = [18, 34, 47, 63, 81]

export default function ScrimCoachDemo() {
  const [stage, setStage] = useState(0)
  const [wins, setWins] = useState('0')
  const [losses, setLosses] = useState('0')
  const [winrate, setWinrate] = useState('0%')
  const [winW, setWinW] = useState(0)
  const [lossW, setLossW] = useState(0)
  const [roster, setRoster] = useState(0)
  const [notes, setNotes] = useState(0)
  const timers = useRef([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const goTo = (s) => {
    clearTimers()
    setStage(s)
    setWins('0'); setLosses('0'); setWinrate('0%'); setWinW(0); setLossW(0); setRoster(0); setNotes(0)
  }

  useEffect(() => {
    if (stage === 1) {
      AVATARS.forEach((_, i) => timers.current.push(setTimeout(() => setRoster(r => Math.max(r, i + 1)), 200 + i * 160)))
      timers.current.push(
        setTimeout(() => { setWinW(100); animateCount(setWins, 0, 12, 1000, v => String(Math.round(v))) }, 1000),
        setTimeout(() => { setLossW(100); animateCount(setLosses, 0, 5, 1000, v => String(Math.round(v))) }, 1200),
        setTimeout(() => animateCount(setWinrate, 0, 70, 1100, v => Math.round(v) + '%'), 1400),
      )
    }
    if (stage === 2) {
      MARKERS.forEach((_, i) => timers.current.push(setTimeout(() => setNotes(n => Math.max(n, i + 1)), 500 + i * 360)))
    }
    return clearTimers
  }, [stage])

  const labels = [
    'stage 1 of 3 — members-only access',
    'stage 2 of 3 — team dashboard',
    'stage 3 of 3 — vod review',
  ]

  return (
    <div style={{ background: '#0a0a0f', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Space Mono', monospace" }}>
      <style>{`@keyframes scrim-drop { from { transform: translateY(-14px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } @keyframes scrim-play { from { left: 0; } to { left: 100%; } }`}</style>

      <div style={{ color: '#6a6a85', fontSize: '17px', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', padding: '14px 20px 0' }}>
        {labels[stage]}
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', padding: '8px 0 4px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === stage ? ORANGE : '#2a2a3a', transition: 'background 0.3s' }} />
        ))}
      </div>

      {/* STAGE 0 — discord gate */}
      {stage === 0 && (
        <div style={{ position: 'relative', margin: '20px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #2a2a3a', minHeight: '240px' }}>
          {/* blurred dashboard behind */}
          <div style={{ filter: 'blur(7px)', opacity: 0.5, padding: '16px', pointerEvents: 'none', userSelect: 'none' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {AVATARS.map((c, i) => <div key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', background: c }} />)}
            </div>
            {[70, 100, 85, 55].map((w, i) => (
              <div key={i} style={{ height: '16px', width: w + '%', background: '#2a2a3a', borderRadius: '4px', marginBottom: '10px' }} />
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              {[GREEN, ORANGE, '#5b8fff'].map((c, i) => <div key={i} style={{ flex: 1, height: '48px', background: c, opacity: 0.5, borderRadius: '6px' }} />)}
            </div>
          </div>
          {/* gate overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', background: 'rgba(10,10,15,0.55)' }}>
            <div style={{ color: ORANGE, fontSize: '20px', fontWeight: 700, letterSpacing: '0.04em' }}>ScrimCoach</div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', background: DISCORD, color: '#fff', border: 'none', borderRadius: '8px', padding: '11px 20px', fontSize: '14px', fontFamily: 'inherit', cursor: 'pointer', boxShadow: `0 0 22px ${DISCORD}66` }}>
              <svg width="20" height="15" viewBox="0 0 71 55" fill="#fff"><path d="M60 4.6A58 58 0 0 0 45.4 0l-2 3.8a54 54 0 0 0-16 0L25.5 0A58 58 0 0 0 10.9 4.6C1.6 18.4-.9 31.9.3 45.2a58.4 58.4 0 0 0 17.9 9l4-6.6c-2.2-.8-4.2-1.8-6.2-3 .5-.4 1-.8 1.5-1.1a41.7 41.7 0 0 0 35.6 0l1.5 1.1c-2 1.2-4 2.2-6.2 3l4 6.6a58.2 58.2 0 0 0 17.9-9c1.4-15.4-2.5-28.8-10.3-40.6ZM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.1 0-4 2.8-7.2 6.4-7.2s6.5 3.3 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.1 0-4 2.8-7.2 6.4-7.2s6.5 3.3 6.4 7.2c0 3.9-2.8 7.1-6.4 7.1Z" /></svg>
              Sign in with Discord
            </button>
            <div style={{ color: '#8a8aa0', fontSize: '11px', letterSpacing: '0.08em' }}>members-only · in active development</div>
          </div>
        </div>
      )}

      {/* STAGE 1 — dashboard */}
      {stage === 1 && (
        <div style={{ margin: '20px' }}>
          <div style={{ color: '#6a6a85', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>Roster</div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            {AVATARS.map((c, i) => (
              <div key={i} style={{ width: '38px', height: '38px', borderRadius: '50%', background: c, opacity: i < roster ? 1 : 0.12, transform: i < roster ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.3s' }} />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#14141c', borderRadius: '6px', marginBottom: '16px', border: '1px solid #222' }}>
            <span style={{ color: ORANGE, fontSize: '13px' }}>▸ NEXT SCRIM</span>
            <span style={{ color: '#d0d0e0', fontSize: '13px' }}>Fri 8:00 PM</span>
            <span style={{ color: '#5a5a70', fontSize: '13px', marginLeft: 'auto' }}>vs ▓▓▓▓</span>
          </div>

          <div style={{ color: '#6a6a85', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '10px' }}>Record</div>
          {[{ lbl: 'W', val: wins, w: winW, c: GREEN }, { lbl: 'L', val: losses, w: lossW, c: RED }].map((b) => (
            <div key={b.lbl} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: b.c, width: '16px', fontSize: '13px' }}>{b.lbl}</span>
              <div style={{ flex: 1, height: '10px', background: '#1a1a24', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: (b.lbl === 'W' ? b.w : b.w * 0.42) + '%', height: '100%', background: b.c, borderRadius: '5px', transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
              <span style={{ color: '#d0d0e0', width: '28px', textAlign: 'right', fontSize: '13px' }}>{b.val}</span>
            </div>
          ))}
          <div style={{ textAlign: 'right', color: ORANGE, fontSize: '15px', fontWeight: 700, marginTop: '8px' }}>winrate {winrate}</div>
        </div>
      )}

      {/* STAGE 2 — vod review */}
      {stage === 2 && (
        <div style={{ margin: '28px 20px' }}>
          <div style={{ color: '#6a6a85', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px' }}>Match Review · 12:40</div>
          <div style={{ position: 'relative', height: '12px', background: '#1a1a24', borderRadius: '6px', margin: '34px 0 10px' }}>
            {/* progress fill */}
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '46%', background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE}99)`, borderRadius: '6px' }} />
            {/* playhead */}
            <div style={{ position: 'absolute', left: '46%', top: '-4px', width: '4px', height: '20px', background: '#fff', borderRadius: '2px', boxShadow: '0 0 8px #fff8' }} />
            {/* note markers */}
            {MARKERS.map((pos, i) => i < notes && (
              <div key={i} style={{ position: 'absolute', left: pos + '%', top: '-30px', transform: 'translateX(-50%)', animation: 'scrim-drop 0.35s ease both' }}>
                <div style={{ width: '10px', height: '10px', background: '#5b8fff', borderRadius: '2px', transform: 'rotate(45deg)', margin: '0 auto' }} />
                <div style={{ width: '1px', height: '14px', background: '#5b8fff88', margin: '2px auto 0' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a4a60', fontSize: '10px' }}>
            <span>0:00</span><span>12:40</span>
          </div>
          <div style={{ textAlign: 'center', padding: '22px 0 4px', color: '#6a6a85', fontSize: '11px', letterSpacing: '0.08em' }}>
            <span style={{ color: '#5b8fff' }}>◆</span> timestamped coach notes drop onto the match timeline
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '4px 20px 18px' }}>
        <button className="sim-nav-btn" onClick={() => goTo(stage - 1)} disabled={stage === 0}>← prev</button>
        <button className="sim-nav-btn" onClick={() => goTo(stage + 1)} disabled={stage === 2}>next →</button>
      </div>
    </div>
  )
}
