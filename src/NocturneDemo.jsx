import { useEffect, useRef, useState } from 'react'

const PURPLE = '#b47cff'
const GREEN = '#7fffb2'
const RED = '#ff6b6b'

const clsMap = {
  gm:   { color: '#cdbfff' },
  dim:  { color: '#6a5a8a' },
  roll: { color: PURPLE },
}

const narr0Lines = [
  { t: 'GM  "Kaelen\'s blade bites deep — the goblin', cls: 'gm', delay: 240 },
  { t: '      reels back, ichor steaming on the', cls: 'gm', delay: 360 },
  { t: '      ash-black stone."', cls: 'gm', delay: 360 },
]

const storyLines = [
  { t: 'GM  "You descend into the ashfall crypt.', cls: 'gm', delay: 300 },
  { t: '      Cold air bites at your torchlight."', cls: 'gm', delay: 420 },
  { t: '', cls: 'dim', delay: 160 },
  { t: '   ⟶ Perception check    🎲 14   (success)', cls: 'roll', delay: 420 },
  { t: '', cls: 'dim', delay: 160 },
  { t: 'GM  "A faint scratching echoes from the dark', cls: 'gm', delay: 300 },
  { t: '      ahead — something waits in the black."', cls: 'gm', delay: 420 },
]

function animateHp(setter, from, to, duration) {
  const start = performance.now()
  function step(now) {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    setter(Math.round(from + (to - from) * ease))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function Typewriter({ lines, height = '150px' }) {
  const [rendered, setRendered] = useState([])
  const bodyRef = useRef()
  const timers = useRef([])
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    let cum = 0
    lines.forEach((l) => {
      cum += l.delay
      timers.current.push(setTimeout(() => setRendered(prev => [...prev, l]), cum))
    })
    return () => timers.current.forEach(clearTimeout)
  }, [lines])
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [rendered])
  return (
    <div ref={bodyRef} style={{ padding: '14px 16px', height, overflowY: 'auto', background: '#140d1f' }}>
      {rendered.map((l, i) => (
        <div key={i} style={{ fontFamily: "'Courier New', monospace", fontSize: '12.5px', lineHeight: '1.9', whiteSpace: 'pre-wrap', ...clsMap[l.cls] }}>
          {l.t}
        </div>
      ))}
      <span style={{ display: 'inline-block', width: '7px', height: '14px', background: PURPLE, verticalAlign: 'middle', animation: 'noct-blink 1s step-end infinite' }} />
    </div>
  )
}

function HpBar({ cur, max, color }) {
  const pct = Math.max(0, (cur / max) * 100)
  return (
    <div style={{ flex: 1, height: '8px', background: '#241a33', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: '4px', transition: 'width 0.25s' }} />
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{ margin: '20px', border: '2px solid #2e2340', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ background: '#1c1430', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #2e2340' }}>
        {[RED, '#ffb347', PURPLE].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        <span style={{ color: '#8a7ab0', fontSize: '11px', letterSpacing: '0.14em', flex: 1, textAlign: 'center' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '7px 16px' }}>
      <span style={{ width: '112px', color: '#c9bfe0', fontSize: '12.5px' }}>{label}</span>
      {children}
    </div>
  )
}

export default function NocturneDemo() {
  const [stage, setStage] = useState(0)
  const [die, setDie] = useState(null)
  const [goblinHp, setGoblinHp] = useState(12)
  const [showNarr0, setShowNarr0] = useState(false)
  const [p3synced, setP3synced] = useState(false)
  const [p4claimed, setP4claimed] = useState(false)
  const timers = useRef([])
  const dieInterval = useRef(null)

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (dieInterval.current) { clearInterval(dieInterval.current); dieInterval.current = null }
  }

  const goTo = (s) => {
    clearTimers()
    setStage(s)
    setDie(null); setGoblinHp(12); setShowNarr0(false)
    setP3synced(false); setP4claimed(false)
  }

  useEffect(() => {
    if (stage === 0) {
      dieInterval.current = setInterval(() => setDie(1 + Math.floor(Math.random() * 20)), 70)
      timers.current.push(
        setTimeout(() => { clearInterval(dieInterval.current); dieInterval.current = null; setDie(17) }, 1100),
        setTimeout(() => animateHp(setGoblinHp, 12, 4, 500), 1500),
        setTimeout(() => setShowNarr0(true), 2100),
      )
    }
    if (stage === 1) {
      timers.current.push(
        setTimeout(() => setP3synced(true), 1500),
        setTimeout(() => setP4claimed(true), 2700),
      )
    }
    return clearTimers
  }, [stage])

  const labels = [
    'stage 1 of 3 — combat & AI narration',
    'stage 2 of 3 — live multiplayer table',
    'stage 3 of 3 — AI game master',
  ]

  const landed = die === 17
  const online = 3 + (p4claimed ? 1 : 0)

  return (
    <div style={{ background: '#0a0a0f', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Courier New', monospace" }}>
      <style>{`@keyframes noct-blink { 50% { opacity: 0; } } @keyframes noct-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }`}</style>

      <div style={{ color: '#6a5a8a', fontSize: '17px', letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', padding: '14px 20px 0' }}>
        {labels[stage]}
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', padding: '8px 0 4px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === stage ? PURPLE : '#2a2a3a', transition: 'background 0.3s' }} />
        ))}
      </div>

      {/* STAGE 0 — combat + narration */}
      {stage === 0 && (
        <Panel title="NOCTURNE — TABLE OF THE ASHFALL COMPACT">
          <div style={{ padding: '10px 0 6px', color: '#6a5a8a', fontSize: '10px', letterSpacing: '0.14em', textAlign: 'center', textTransform: 'uppercase' }}>Initiative</div>
          <Row label="▸ Kaelen"><HpBar cur={18} max={24} color={GREEN} /><span style={{ width: '54px', color: '#c9bfe0', fontSize: '12px', textAlign: 'right' }}>18/24</span></Row>
          <Row label={`Goblin ${landed ? '← hit' : ''}`}><HpBar cur={goblinHp} max={12} color={RED} /><span style={{ width: '54px', color: '#c9bfe0', fontSize: '12px', textAlign: 'right' }}>{goblinHp}/12</span></Row>
          <Row label="Mira"><HpBar cur={20} max={20} color={GREEN} /><span style={{ width: '54px', color: '#c9bfe0', fontSize: '12px', textAlign: 'right' }}>20/20</span></Row>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '14px 0 10px' }}>
            <div style={{ width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${PURPLE}`, borderRadius: '10px', color: PURPLE, fontSize: '22px', fontWeight: 700, boxShadow: landed ? `0 0 18px ${PURPLE}66` : 'none', transition: 'box-shadow 0.3s' }}>
              {die ?? '—'}
            </div>
            <div style={{ color: landed ? GREEN : '#6a5a8a', fontSize: '13px' }}>
              {die == null ? '🎲 roll to attack…' : landed ? `d20 + 5 = 22   HIT!` : 'rolling…'}
            </div>
          </div>

          {showNarr0 && <Typewriter lines={narr0Lines} height="88px" />}
        </Panel>
      )}

      {/* STAGE 1 — live sync */}
      {stage === 1 && (
        <Panel title="NOCTURNE — LIVE TABLE">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px 6px', color: '#8a7ab0', fontSize: '11px', letterSpacing: '0.1em' }}>
            <span>CAMPAIGN CODE · ASH-7X2</span>
            <span><span style={{ color: GREEN }}>●</span> {online} online</span>
          </div>
          {[
            { slot: 'P1', name: 'Kaelen', status: 'synced', hp: '18/24' },
            { slot: 'P2', name: 'Mira', status: 'synced', hp: '20/20' },
            { slot: 'P3', name: 'Doran', status: p3synced ? 'synced' : 'syncing', hp: '15/18' },
            { slot: 'P4', name: p4claimed ? 'Vera' : null, status: p4claimed ? 'synced' : 'open', hp: '22/22' },
          ].map((p) => (
            <div key={p.slot} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderTop: '1px solid #1c1430' }}>
              <span style={{ color: PURPLE, fontSize: '11px', width: '26px' }}>{p.slot}</span>
              <span style={{ flex: 1, color: p.name ? '#e0d8f0' : '#5a4a7a', fontSize: '13px' }}>{p.name ?? 'open slot — claim to join'}</span>
              {p.status === 'synced' && <><span style={{ color: GREEN, fontSize: '12px' }}>✓ synced</span><span style={{ color: '#8a7ab0', fontSize: '12px', width: '46px', textAlign: 'right' }}>{p.hp}</span></>}
              {p.status === 'syncing' && <span style={{ color: '#ffb347', fontSize: '12px', animation: 'noct-pulse 1s infinite' }}>● syncing…</span>}
              {p.status === 'open' && <span style={{ color: '#5a4a7a', fontSize: '18px', animation: 'noct-pulse 1.4s infinite' }}>+</span>}
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '12px 0 16px', color: '#6a5a8a', fontSize: '11px', letterSpacing: '0.08em' }}>updates ripple across every device in real time</div>
        </Panel>
      )}

      {/* STAGE 2 — AI GM story */}
      {stage === 2 && (
        <Panel title="NOCTURNE — AI GAME MASTER">
          <Typewriter lines={storyLines} height="188px" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 16px 16px', justifyContent: 'center' }}>
            {['Investigate the sound', 'Ready your weapon', 'Light a second torch'].map((c) => (
              <span key={c} style={{ border: `1px solid ${PURPLE}55`, color: '#c9bfe0', borderRadius: '99px', padding: '5px 14px', fontSize: '11.5px' }}>{c}</span>
            ))}
          </div>
        </Panel>
      )}

      {/* NAV */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '4px 20px 18px' }}>
        <button className="sim-nav-btn" onClick={() => goTo(stage - 1)} disabled={stage === 0}>← prev</button>
        <button className="sim-nav-btn" onClick={() => goTo(stage + 1)} disabled={stage === 2}>next →</button>
      </div>
    </div>
  )
}
