// KidWeb — desktop-web components for ChangLek kid learning app

// ── SideNav (left rail) ────────────────────────────────────
function SideNav({ active, onChange }) {
  const items = [
    { id: 'home',    icon: 'home',         label: 'Home' },
    { id: 'lessons', icon: 'book-open',    label: 'Lessons' },
    { id: 'play',    icon: 'gamepad-2',    label: 'Play' },
    { id: 'me',      icon: 'user-round',   label: 'Me' },
  ];
  return (
    <aside style={{
      width: 200, height: '100%', background: 'var(--cream-50)',
      borderRight: '1px solid var(--ink-100)', padding: '24px 12px',
      display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, padding: '4px 10px 18px' }}>
        <img src="../../assets/nong-avatar.png" alt="" style={{ width: 40, height: 40, borderRadius: '50%' }}/>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--coral-600)' }}>ChangLek</div>
      </div>
      {items.map(i => {
        const on = i.id === active;
        return (
          <button key={i.id} onClick={() => onChange(i.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderRadius: 'var(--r-md)',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            background: on ? 'var(--coral-100)' : 'transparent',
            color: on ? 'var(--coral-700)' : 'var(--ink-700)',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
          }}>
            <i data-lucide={i.icon} style={{ width: 22, height: 22 }}></i> {i.label}
          </button>
        );
      })}
    </aside>
  );
}

// ── TopStrip (greeting + streak/stars in topbar) ──────────
function TopStrip({ name = 'Praewa', streak = 5, stars = 142 }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: '20px 32px 14px' }}>
      <div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Sawasdee 👋</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, color: 'var(--ink-900)', lineHeight: 1.05 }}>Hi, {name}!</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div className="cl-chip cl-chip--amber" style={{ padding: '8px 14px', fontSize: 15 }}>
          <i data-lucide="flame" style={{ width: 16, height: 16 }}></i> {streak} day streak
        </div>
        <div className="cl-chip cl-chip--coral" style={{ padding: '8px 14px', fontSize: 15 }}>
          <i data-lucide="star" style={{ width: 16, height: 16 }}></i> {stars} stars
        </div>
      </div>
    </div>
  );
}

// ── BigGoalCard (wide hero) ───────────────────────────────
function BigGoalCard({ done = 8, target = 10 }) {
  const pct = Math.min(1, done / target);
  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--coral-400), var(--coral-500))',
      borderRadius: 'var(--r-2xl)', padding: 28, color: '#fff',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 8px 0 var(--coral-700), 0 16px 32px rgba(255,122,69,0.25)',
      display: 'flex', alignItems: 'center', gap: 24, minHeight: 140,
    }}>
      <img src="../../assets/nong-mascot.png" width="140" alt=""
           style={{ filter: 'drop-shadow(0 6px 0 rgba(0,0,0,0.1))' }}/>
      <div style={{ flex: 1 }}>
        <div style={{ font: 'var(--type-label)', opacity: 0.9 }}>TODAY'S GOAL</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, lineHeight: 1.1, marginTop: 4 }}>
          {done} of {target} stars ⭐
        </div>
        <div style={{ height: 14, background: 'rgba(255,255,255,0.3)', borderRadius: 999, marginTop: 14, overflow: 'hidden', maxWidth: 480 }}>
          <div style={{ height: '100%', width: (pct*100)+'%', background: '#fff', borderRadius: 999 }}></div>
        </div>
        <div style={{ font: 'var(--type-body)', opacity: 0.95, marginTop: 10 }}>2 more to keep your streak going!</div>
      </div>
      <img src="../../assets/sticker-confetti-burst.svg" width="120" alt=""
           style={{ position: 'absolute', right: -10, top: -10, opacity: 0.6 }}/>
    </div>
  );
}

// ── LessonCard (grid tile) ────────────────────────────────
function LessonCard({ unit, title, mins, status, onClick, accent = 'coral' }) {
  const accentMap = {
    coral:  ['var(--coral-100)',  'var(--coral-600)'],
    sky:    ['var(--sky-100)',    'var(--sky-700)'],
    amber:  ['var(--amber-100)',  'var(--amber-600)'],
    success:['var(--success-100)','var(--success-700)'],
  };
  const [bg, fg] = accentMap[accent];
  const locked = status === 'locked';
  const done   = status === 'done';
  return (
    <button onClick={onClick} disabled={locked} style={{
      background: '#fff', border: 'none', cursor: locked ? 'not-allowed' : 'pointer',
      borderRadius: 'var(--r-xl)', padding: 20, textAlign: 'left',
      boxShadow: locked ? 'var(--shadow-sm)' : 'var(--shadow-md), var(--inner-highlight)',
      opacity: locked ? 0.55 : 1, position: 'relative',
      transition: 'transform 150ms var(--ease-bounce)',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}
    onMouseOver={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(-3px)'; }}
    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{
        height: 100, borderRadius: 'var(--r-md)', background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <i data-lucide={done ? 'check' : locked ? 'lock' : 'play'} style={{ width: 44, height: 44, color: fg }}></i>
        {done && <span className="cl-chip cl-chip--success" style={{ position: 'absolute', top: 8, right: 8 }}>Done</span>}
      </div>
      <div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Unit {unit} · {mins} min</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--ink-900)', marginTop: 2 }}>{title}</div>
      </div>
    </button>
  );
}

// ── PathNode (winding lesson path, larger for web) ────────
function PathNode({ label, status = 'locked', accent = 'coral', onClick }) {
  const colors = {
    coral:  { bg: 'var(--coral-500)', shadow: 'var(--coral-700)' },
    sky:    { bg: 'var(--sky-400)',   shadow: 'var(--sky-600)' },
    amber:  { bg: 'var(--amber-400)', shadow: 'var(--amber-600)' },
    success:{ bg: 'var(--success-500)', shadow: 'var(--success-700)' },
  }[accent];
  const isLocked = status === 'locked';
  return (
    <button onClick={onClick} disabled={isLocked} style={{
      width: 100, height: 100, borderRadius: '50%',
      background: isLocked ? 'var(--ink-200)' : colors.bg,
      boxShadow: isLocked ? '0 7px 0 var(--ink-300)' : `0 7px 0 ${colors.shadow}`,
      border: 'none', cursor: isLocked ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', position: 'relative',
    }}>
      {status === 'done' && <i data-lucide="check" style={{ width: 44, height: 44 }}></i>}
      {status === 'current' && <i data-lucide="star" style={{ width: 44, height: 44 }}></i>}
      {isLocked && <i data-lucide="lock" style={{ width: 32, height: 32, color: 'var(--ink-500)' }}></i>}
      {status === 'current' && (
        <div style={{
          position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
          background: '#fff', color: 'var(--coral-700)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
          padding: '4px 12px', borderRadius: 999, boxShadow: 'var(--shadow-sm)', whiteSpace: 'nowrap',
        }}>{label}</div>
      )}
    </button>
  );
}

// ── ChoiceCard (large for desktop) ────────────────────────
function ChoiceCard({ word, emoji, picked, correct, onClick }) {
  let border = 'var(--ink-100)';
  let bg = '#fff';
  if (picked && correct === true)  { border = 'var(--success-500)'; bg = 'var(--success-50)'; }
  if (picked && correct === false) { border = 'var(--danger-500)';  bg = 'var(--danger-50)'; }
  return (
    <button onClick={onClick} style={{
      background: bg, border: `3px solid ${border}`, borderRadius: 'var(--r-xl)',
      padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      cursor: 'pointer', boxShadow: '0 4px 0 ' + border, textAlign: 'center',
      transition: 'transform 150ms var(--ease-bounce)',
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <div style={{ fontSize: 64, lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--ink-900)' }}>{word}</div>
    </button>
  );
}

// ── CelebrationOverlay ────────────────────────────────────
function CelebrationOverlay({ onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(74,47,30,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, zIndex: 10,
    }}>
      <div style={{
        background: '#fff', borderRadius: 'var(--r-2xl)', padding: 36, textAlign: 'center',
        boxShadow: 'var(--shadow-xl)', maxWidth: 440, position: 'relative',
        backgroundImage: 'url(../../assets/pattern-confetti.svg)', backgroundSize: 220,
      }}>
        <img src="../../assets/nong-mascot.png" alt="" style={{ width: 200, marginTop: -70, filter: 'drop-shadow(0 6px 0 rgba(255,122,69,0.2))' }}/>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, color: 'var(--coral-600)' }}>Lesson done! 🎉</div>
        <div style={{ font: 'var(--type-body)', color: 'var(--ink-700)', margin: '8px 0 20px' }}>You earned <b>+12 stars</b> and grew your streak!</div>
        <button className="cl-btn cl-btn--lg" onClick={onClose} style={{ width: '100%' }}>Keep going</button>
      </div>
    </div>
  );
}

Object.assign(window, { SideNav, TopStrip, BigGoalCard, LessonCard, PathNode, ChoiceCard, CelebrationOverlay });
