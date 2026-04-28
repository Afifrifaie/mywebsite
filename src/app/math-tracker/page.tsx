'use client'

import { useState, useEffect } from 'react'

type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6'
type Tab = 'stamp' | 'all' | 'manage'

interface Pupil {
  id: string
  name: string
  level: Level
  className: string
  stamps: string[]
}

const LEVELS: Level[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6']
const STORAGE_KEY = 'math-tracker-pupils'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const SAMPLE_PUPILS: Pupil[] = []

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-SG', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

// ── Reusable neon select ──────────────────────────────────────────────────────
function NeonSelect({
  value, onChange, disabled, color, children,
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  color: 'pink' | 'cyan' | 'purple'
  children: React.ReactNode
}) {
  const borderColor = { pink: '#ff2d78', cyan: '#00e5ff', purple: '#bf5af2' }[color]
  const glowColor = { pink: '#ff2d7880', cyan: '#00e5ff80', purple: '#bf5af280' }[color]
  const labelColor = { pink: '#ff2d78', cyan: '#00e5ff', purple: '#bf5af2' }[color]

  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      style={{
        background: '#0a0118',
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 8px ${glowColor}, inset 0 0 6px ${glowColor}33`,
        color: disabled ? '#555' : labelColor,
        fontFamily: "var(--font-pixel), monospace",
        fontSize: '10px',
      }}
      className="w-full px-3 py-3 rounded-lg outline-none cursor-pointer disabled:cursor-not-allowed appearance-none"
    >
      {children}
    </select>
  )
}

// ── Neon button ───────────────────────────────────────────────────────────────
function NeonButton({
  onClick, color, children, disabled, fullWidth, small,
}: {
  onClick?: () => void
  color: 'pink' | 'cyan' | 'yellow' | 'green'
  children: React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
  small?: boolean
}) {
  const styles = {
    pink:   { bg: '#ff2d78', border: '#ffd700', shadow: '#ff2d7899', text: '#fff' },
    cyan:   { bg: '#00e5ff', border: '#ffd700', shadow: '#00e5ff99', text: '#0a0118' },
    yellow: { bg: '#ffd700', border: '#ff2d78', shadow: '#ffd70099', text: '#0a0118' },
    green:  { bg: '#39ff14', border: '#ffd700', shadow: '#39ff1499', text: '#0a0118' },
  }[color]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? '#2a1a4a' : styles.bg,
        border: `2px solid ${disabled ? '#3d1a6e' : styles.border}`,
        boxShadow: disabled ? 'none' : `0 0 10px ${styles.shadow}, 0 0 20px ${styles.shadow}`,
        color: disabled ? '#555' : styles.text,
        fontFamily: "var(--font-pixel), monospace",
        fontSize: small ? '8px' : '10px',
      }}
      className={`${fullWidth ? 'w-full' : ''} px-4 py-3 rounded-lg font-bold tracking-wider transition-all active:scale-95 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

export default function MathTrackerPage() {
  const [pupils, setPupils] = useState<Pupil[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('stamp')

  // Stamp tab
  const [selectedLevel, setSelectedLevel] = useState<Level | ''>('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPupilId, setSelectedPupilId] = useState('')
  const [stampSuccess, setStampSuccess] = useState(false)

  // Filter tab
  const [filterLevel, setFilterLevel] = useState<Level | ''>('')
  const [filterClass, setFilterClass] = useState('')
  const [filterMinStamps, setFilterMinStamps] = useState('')
  const [filterMaxStamps, setFilterMaxStamps] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  // Manage tab
  const [newName, setNewName] = useState('')
  const [newLevel, setNewLevel] = useState<Level | ''>('')
  const [newClass, setNewClass] = useState('')
  const [newClassInput, setNewClassInput] = useState('')
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setPupils(JSON.parse(stored))
    } else {
      setPupils(SAMPLE_PUPILS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_PUPILS))
    }
  }, [])

  function save(updated: Pupil[]) {
    setPupils(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function classesForLevel(level: Level | '') {
    if (!level) return []
    return [...new Set(pupils.filter(p => p.level === level).map(p => p.className))].sort()
  }

  function allFilterClasses(level: Level | '') {
    if (!level) return [...new Set(pupils.map(p => p.className))].sort()
    return classesForLevel(level)
  }

  const pupilsInSelection = pupils
    .filter(p => p.level === selectedLevel && p.className === selectedClass)
    .sort((a, b) => a.name.localeCompare(b.name))

  const selectedPupil = pupils.find(p => p.id === selectedPupilId)

  function giveStamp() {
    if (!selectedPupil) return
    const today = new Date().toISOString().split('T')[0]
    save(pupils.map(p => p.id === selectedPupilId ? { ...p, stamps: [...p.stamps, today] } : p))
    setStampSuccess(true)
    setTimeout(() => setStampSuccess(false), 3000)
  }

  function removeLastStamp() {
    if (!selectedPupil || selectedPupil.stamps.length === 0) return
    save(pupils.map(p => p.id === selectedPupilId ? { ...p, stamps: p.stamps.slice(0, -1) } : p))
  }

  function addPupil() {
    const cls = newClass === '__new__' ? newClassInput.trim() : newClass
    if (!newName.trim() || !newLevel || !cls) return
    const pupil: Pupil = { id: generateId(), name: newName.trim(), level: newLevel, className: cls, stamps: [] }
    save([...pupils, pupil])
    setNewName(''); setNewLevel(''); setNewClass(''); setNewClassInput('')
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 3000)
  }

  function exportData() {
    const filename = `math-arcade-${new Date().toISOString().split('T')[0]}.json`
    const blob = new Blob([JSON.stringify(pupils, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  function removePupil(id: string) {
    if (!confirm('Remove this pupil? Their stamp history will be deleted.')) return
    save(pupils.filter(p => p.id !== id))
    if (selectedPupilId === id) setSelectedPupilId('')
  }

  const filteredPupils = pupils
    .filter(p => {
      if (filterLevel && p.level !== filterLevel) return false
      if (filterClass && p.className !== filterClass) return false
      if (filterMinStamps !== '' && p.stamps.length < parseInt(filterMinStamps)) return false
      if (filterMaxStamps !== '' && p.stamps.length > parseInt(filterMaxStamps)) return false
      return true
    })
    .sort((a, b) => a.level.localeCompare(b.level) || a.className.localeCompare(b.className) || a.name.localeCompare(b.name))

  const managePupils = [...pupils].sort(
    (a, b) => a.level.localeCompare(b.level) || a.className.localeCompare(b.className) || a.name.localeCompare(b.name)
  )

  const hasFilters = filterLevel || filterClass || filterMinStamps !== '' || filterMaxStamps !== ''
  const existingClasses = classesForLevel(newLevel)
  const showNewClassInput = newClass === '__new__' || existingClasses.length === 0

  // ── shared input style ──
  const inputStyle: React.CSSProperties = {
    background: '#0a0118',
    border: '2px solid #3d1a6e',
    color: '#fff',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '13px',
  }

  return (
    <div style={{ background: '#0d0221', minHeight: '100vh' }} className="pb-16">
      <div className="max-w-3xl mx-auto px-4 pt-10">

        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <div
            className="inline-block px-6 py-4 mb-4 arcade-flicker"
            style={{ border: '3px solid #ff2d78', boxShadow: '0 0 16px #ff2d78, 0 0 40px #ff2d7866' }}
          >
            <h1
              className="arcade-font neon-yellow text-2xl sm:text-3xl tracking-widest leading-tight"
            >
              MATH ARCADE
            </h1>
          </div>
          <p className="arcade-font neon-cyan text-xs tracking-widest mt-3">
            ST. ANTHONY&apos;S PRIMARY SCHOOL
          </p>
          <p className="text-xs mt-2" style={{ color: '#6a4a8a' }}>
            {pupils.length} players enrolled
          </p>
        </div>

        {/* ── TAB NAV ── */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-6"
          style={{ background: '#150a30', border: '1px solid #3d1a6e' }}
        >
          {([
            ['stamp', '🏅', 'GIVE STAMP'],
            ['all', '📋', 'ALL PLAYERS'],
            ['manage', '⚙️', 'MANAGE'],
          ] as const).map(([tab, icon, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 px-2 rounded-lg text-center transition-all"
              style={{
                fontFamily: "var(--font-pixel), monospace",
                fontSize: '8px',
                background: activeTab === tab ? '#ff2d78' : 'transparent',
                color: activeTab === tab ? '#fff' : '#6a4a8a',
                boxShadow: activeTab === tab ? '0 0 12px #ff2d7899' : 'none',
                border: activeTab === tab ? '1px solid #ffd700' : '1px solid transparent',
              }}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════
            STAMP TAB
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'stamp' && (
          <div
            className="rounded-xl p-6 space-y-8"
            style={{ background: '#150a30', border: '1px solid #3d1a6e' }}
          >
            {/* ◆ FIND A PUPIL */}
            <div>
              <p className="arcade-font neon-yellow text-xs mb-5 flex items-center gap-2">
                <span>◆</span> FIND A PLAYER
              </p>

              {/* Step 1 — Level */}
              <div className="mb-5">
                <p className="arcade-font neon-pink text-xs mb-3">1. LEVEL</p>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map(level => {
                    const active = selectedLevel === level
                    return (
                      <button
                        key={level}
                        onClick={() => { setSelectedLevel(level); setSelectedClass(''); setSelectedPupilId('') }}
                        className="px-4 py-2.5 rounded-lg transition-all active:scale-95"
                        style={{
                          fontFamily: "var(--font-pixel), monospace",
                          fontSize: '10px',
                          background: active ? '#ff2d78' : '#0a0118',
                          border: `2px solid ${active ? '#ffd700' : '#ff2d78'}`,
                          color: active ? '#fff' : '#ff2d78',
                          boxShadow: active ? '0 0 12px #ff2d78, 0 0 24px #ff2d7866' : '0 0 4px #ff2d7844',
                        }}
                      >
                        {level}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2 — Class */}
              <div className="mb-5">
                <p className="arcade-font neon-cyan text-xs mb-3">2. CLASS</p>
                {!selectedLevel ? (
                  <p className="text-xs" style={{ color: '#4a2a6a' }}>Select a level first</p>
                ) : classesForLevel(selectedLevel).length === 0 ? (
                  <p className="text-xs" style={{ color: '#4a2a6a' }}>No classes yet — add pupils via Manage</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {classesForLevel(selectedLevel).map(cls => {
                      const active = selectedClass === cls
                      return (
                        <button
                          key={cls}
                          onClick={() => { setSelectedClass(cls); setSelectedPupilId('') }}
                          className="px-4 py-2.5 rounded-lg transition-all active:scale-95"
                          style={{
                            fontFamily: "var(--font-pixel), monospace",
                            fontSize: '9px',
                            background: active ? '#00e5ff' : '#0a0118',
                            border: `2px solid ${active ? '#ffd700' : '#00e5ff'}`,
                            color: active ? '#0a0118' : '#00e5ff',
                            boxShadow: active ? '0 0 12px #00e5ff, 0 0 24px #00e5ff66' : '0 0 4px #00e5ff44',
                          }}
                        >
                          {cls}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Step 3 — Pupil */}
              {selectedLevel && selectedClass && (
                <div>
                  <p className="arcade-font text-xs mb-3" style={{ color: '#bf5af2', textShadow: '0 0 8px #bf5af2' }}>
                    3. PLAYER
                  </p>
                  {pupilsInSelection.length === 0 ? (
                    <p className="text-xs" style={{ color: '#4a2a6a' }}>No pupils in {selectedLevel} {selectedClass}</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {pupilsInSelection.map(pupil => {
                        const active = selectedPupilId === pupil.id
                        return (
                          <button
                            key={pupil.id}
                            onClick={() => setSelectedPupilId(pupil.id)}
                            className="p-3 rounded-lg text-left transition-all"
                            style={{
                              background: active ? '#1e0a40' : '#0a0118',
                              border: `2px solid ${active ? '#bf5af2' : '#3d1a6e'}`,
                              boxShadow: active ? '0 0 12px #bf5af299' : 'none',
                            }}
                          >
                            <div className="font-semibold text-white text-sm truncate">{pupil.name}</div>
                            <div className="text-xs mt-1" style={{ color: '#bf5af2' }}>
                              {pupil.stamps.length} stamp{pupil.stamps.length !== 1 ? 's' : ''}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Pupil detail card ── */}
            {selectedPupil && (
              <div
                className="rounded-xl p-5"
                style={{ background: '#0a0118', border: '2px solid #bf5af2', boxShadow: '0 0 20px #bf5af244' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedPupil.name}</h2>
                    <p className="text-xs mt-1" style={{ color: '#6a4a8a' }}>
                      {selectedPupil.level} · {selectedPupil.className}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="arcade-font text-3xl"
                      style={{ color: '#ffd700', textShadow: '0 0 12px #ffd700, 0 0 30px #ffd700' }}
                    >
                      {selectedPupil.stamps.length}
                    </div>
                    <div className="arcade-font text-xs mt-1" style={{ color: '#6a4a8a', fontSize: '7px' }}>
                      STAMPS
                    </div>
                  </div>
                </div>

                {selectedPupil.stamps.length > 0 ? (
                  <div className="mb-5">
                    <p className="arcade-font text-xs mb-2" style={{ color: '#6a4a8a', fontSize: '7px' }}>
                      SESSIONS ATTENDED
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPupil.stamps.map((stamp, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{
                            background: '#1a0a30',
                            border: '1px solid #ffd700',
                            color: '#ffd700',
                            textShadow: '0 0 6px #ffd700',
                          }}
                        >
                          {formatDate(stamp)}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm italic mb-5" style={{ color: '#4a2a6a' }}>
                    First time here — welcome! 🎮
                  </p>
                )}

                <div className="flex gap-3">
                  <NeonButton
                    onClick={giveStamp}
                    color={stampSuccess ? 'green' : 'pink'}
                    fullWidth
                  >
                    {stampSuccess ? '✓ STAMPED!' : '+ GIVE STAMP'}
                  </NeonButton>
                  {selectedPupil.stamps.length > 0 && (
                    <button
                      onClick={removeLastStamp}
                      className="px-4 rounded-lg text-sm font-medium transition-all"
                      style={{ background: '#1a0a30', border: '1px solid #3d1a6e', color: '#6a4a8a' }}
                    >
                      UNDO
                    </button>
                  )}
                </div>
                {stampSuccess && (
                  <p className="arcade-font text-center mt-3" style={{ color: '#39ff14', fontSize: '8px', textShadow: '0 0 8px #39ff14' }}>
                    RECORDED — {formatDate(new Date().toISOString().split('T')[0])}
                  </p>
                )}
              </div>
            )}

            {/* Empty state */}
            {!selectedPupil && (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎮</div>
                <p className="arcade-font neon-yellow text-xs tracking-widest">SELECT A PLAYER TO BEGIN</p>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            ALL PLAYERS TAB
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'all' && (
          <div className="space-y-4">
            {/* Filter toggle */}
            <div className="flex gap-3">
              <NeonButton color="cyan" onClick={() => setShowFilter(f => !f)}>
                ▼ FILTER
              </NeonButton>
              {hasFilters && (
                <NeonButton small color="yellow" onClick={() => {
                  setFilterLevel(''); setFilterClass(''); setFilterMinStamps(''); setFilterMaxStamps('')
                }}>
                  × CLEAR
                </NeonButton>
              )}
            </div>

            {/* Filter panel */}
            {showFilter && (
              <div
                className="rounded-xl p-5"
                style={{ background: '#150a30', border: '1px solid #00e5ff', boxShadow: '0 0 12px #00e5ff33' }}
              >
                <p className="arcade-font neon-cyan text-xs mb-4">FILTER OPTIONS</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#ff2d78', fontSize: '7px' }}>LEVEL</p>
                    <NeonSelect value={filterLevel} onChange={v => { setFilterLevel(v as Level | ''); setFilterClass('') }} color="pink">
                      <option value="">ALL</option>
                      {LEVELS.map(l => <option key={l}>{l}</option>)}
                    </NeonSelect>
                  </div>
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#00e5ff', fontSize: '7px' }}>CLASS</p>
                    <NeonSelect value={filterClass} onChange={setFilterClass} color="cyan">
                      <option value="">ALL</option>
                      {allFilterClasses(filterLevel).map(c => <option key={c}>{c}</option>)}
                    </NeonSelect>
                  </div>
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#ffd700', fontSize: '7px' }}>MIN STAMPS</p>
                    <input
                      type="number" min="0" value={filterMinStamps}
                      onChange={e => setFilterMinStamps(e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-3 rounded-lg outline-none"
                      style={{ ...inputStyle, border: '2px solid #ffd700', boxShadow: '0 0 6px #ffd70044' }}
                    />
                  </div>
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#ffd700', fontSize: '7px' }}>MAX STAMPS</p>
                    <input
                      type="number" min="0" value={filterMaxStamps}
                      onChange={e => setFilterMaxStamps(e.target.value)}
                      placeholder="∞"
                      className="w-full px-3 py-3 rounded-lg outline-none"
                      style={{ ...inputStyle, border: '2px solid #ffd700', boxShadow: '0 0 6px #ffd70044' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Results table */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #3d1a6e' }}
            >
              <div
                className="px-5 py-3 flex justify-between items-center"
                style={{ background: '#1a0a3e', borderBottom: '1px solid #3d1a6e' }}
              >
                <span className="arcade-font text-xs" style={{ color: '#ffd700', fontSize: '8px' }}>
                  {filteredPupils.length} PLAYERS {hasFilters ? 'MATCHED' : 'TOTAL'}
                </span>
                {hasFilters && (
                  <span className="arcade-font text-xs" style={{ color: '#00e5ff', fontSize: '7px' }}>FILTERED</span>
                )}
              </div>

              {filteredPupils.length === 0 ? (
                <div
                  className="p-10 text-center arcade-font text-xs"
                  style={{ background: '#0d0221', color: '#3d1a6e' }}
                >
                  NO PLAYERS MATCH
                </div>
              ) : (
                <div style={{ background: '#0d0221' }}>
                  {filteredPupils.map((pupil, i) => (
                    <div
                      key={pupil.id}
                      className="px-5 py-4 flex items-center justify-between"
                      style={{ borderBottom: i < filteredPupils.length - 1 ? '1px solid #1a0a3e' : 'none' }}
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">{pupil.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#4a2a6a' }}>
                          {pupil.level} · {pupil.className}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="arcade-font text-xl"
                          style={{ color: '#ffd700', textShadow: pupil.stamps.length > 0 ? '0 0 8px #ffd700' : 'none', minWidth: '2rem', textAlign: 'right' }}
                        >
                          {pupil.stamps.length}
                        </div>
                        <div className="text-xs" style={{ color: '#4a2a6a', width: '40px' }}>
                          stamp{pupil.stamps.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            MANAGE TAB
        ══════════════════════════════════════════════════════════ */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            {/* Add form */}
            <div
              className="rounded-xl p-6"
              style={{ background: '#150a30', border: '1px solid #3d1a6e' }}
            >
              <p className="arcade-font neon-pink text-xs mb-5">+ ADD NEW PLAYER</p>
              <div className="space-y-3 mb-4">
                <input
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPupil()}
                  placeholder="Full name"
                  className="w-full px-3 py-3 rounded-lg outline-none"
                  style={{ ...inputStyle, border: '2px solid #3d1a6e' }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#ff2d78', fontSize: '7px' }}>LEVEL</p>
                    <NeonSelect
                      value={newLevel}
                      onChange={v => { setNewLevel(v as Level); setNewClass(''); setNewClassInput('') }}
                      color="pink"
                    >
                      <option value="">Select...</option>
                      {LEVELS.map(l => <option key={l}>{l}</option>)}
                    </NeonSelect>
                  </div>
                  <div>
                    <p className="arcade-font text-xs mb-2" style={{ color: '#00e5ff', fontSize: '7px' }}>CLASS</p>
                    {existingClasses.length > 0 ? (
                      <NeonSelect value={newClass} onChange={setNewClass} color="cyan">
                        <option value="">Select...</option>
                        {existingClasses.map(c => <option key={c}>{c}</option>)}
                        <option value="__new__">+ New class…</option>
                      </NeonSelect>
                    ) : (
                      <input
                        value={newClassInput}
                        onChange={e => setNewClassInput(e.target.value)}
                        placeholder="Class name"
                        className="w-full px-3 py-3 rounded-lg outline-none"
                        style={{ ...inputStyle, border: '2px solid #00e5ff', boxShadow: '0 0 6px #00e5ff44' }}
                      />
                    )}
                  </div>
                </div>
                {showNewClassInput && existingClasses.length > 0 && (
                  <input
                    value={newClassInput}
                    onChange={e => setNewClassInput(e.target.value)}
                    placeholder="New class name"
                    className="w-full px-3 py-3 rounded-lg outline-none"
                    style={{ ...inputStyle, border: '2px solid #00e5ff', boxShadow: '0 0 6px #00e5ff44' }}
                  />
                )}
              </div>
              <div className="flex items-center gap-4">
                <NeonButton
                  onClick={addPupil}
                  color="pink"
                  disabled={!newName.trim() || !newLevel || (!(newClass && newClass !== '__new__') && !newClassInput.trim())}
                >
                  ADD PLAYER
                </NeonButton>
                {addSuccess && (
                  <span className="arcade-font text-xs" style={{ color: '#39ff14', textShadow: '0 0 8px #39ff14', fontSize: '8px' }}>
                    ✓ ADDED!
                  </span>
                )}
              </div>
            </div>

            {/* Pupil list */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #3d1a6e' }}
            >
              <div
                className="px-5 py-3"
                style={{ background: '#1a0a3e', borderBottom: '1px solid #3d1a6e' }}
              >
                <span className="arcade-font text-xs" style={{ color: '#ffd700', fontSize: '8px' }}>
                  {pupils.length} PLAYERS ENROLLED
                </span>
              </div>
              <div className="px-5 py-3" style={{ borderBottom: '1px solid #3d1a6e' }}>
                <button
                  onClick={exportData}
                  className="px-3 py-1 rounded-lg transition-all active:scale-95"
                  style={{
                    fontFamily: 'var(--font-pixel), monospace',
                    fontSize: '7px',
                    background: '#0a0118',
                    border: '2px solid #00e5ff',
                    color: '#00e5ff',
                    boxShadow: '0 0 8px #00e5ff44',
                  }}
                >
                  ↓ EXPORT JSON
                </button>
              </div>
              {managePupils.length === 0 ? (
                <div className="p-8 text-center text-xs" style={{ background: '#0d0221', color: '#3d1a6e' }}>
                  No pupils yet
                </div>
              ) : (
                <div style={{ background: '#0d0221' }}>
                  {managePupils.map((pupil, i) => (
                    <div
                      key={pupil.id}
                      className="px-5 py-3 flex items-center justify-between"
                      style={{ borderBottom: i < managePupils.length - 1 ? '1px solid #1a0a3e' : 'none' }}
                    >
                      <div>
                        <div className="font-semibold text-white text-sm">{pupil.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: '#4a2a6a' }}>
                          {pupil.level} · {pupil.className} · {pupil.stamps.length} stamp{pupil.stamps.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <button
                        onClick={() => removePupil(pupil.id)}
                        className="text-xs px-3 py-1 rounded transition-colors"
                        style={{ color: '#4a2a6a', border: '1px solid #2a1040' }}
                        onMouseEnter={e => { (e.target as HTMLElement).style.color = '#ff2d78'; (e.target as HTMLElement).style.borderColor = '#ff2d78' }}
                        onMouseLeave={e => { (e.target as HTMLElement).style.color = '#4a2a6a'; (e.target as HTMLElement).style.borderColor = '#2a1040' }}
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
