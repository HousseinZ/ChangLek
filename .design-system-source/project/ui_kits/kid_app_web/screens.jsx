// KidWeb screens — desktop-web composed pages.

function HomeScreen({ onTab, active, onOpen }) {
  const lessons = [
    { unit: 1, title: 'Animal Sounds',   mins: 8,  status: 'done',    accent: 'success' },
    { unit: 1, title: 'Big & Small',     mins: 10, status: 'done',    accent: 'success' },
    { unit: 2, title: 'Counting 1–10',   mins: 12, status: 'current', accent: 'coral' },
    { unit: 2, title: 'Colors & Shapes', mins: 10, status: 'locked',  accent: 'sky' },
    { unit: 2, title: 'Animals at Zoo',  mins: 12, status: 'locked',  accent: 'amber' },
    { unit: 3, title: 'My Family',       mins: 10, status: 'locked',  accent: 'coral' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <TopStrip name="Praewa" streak={5} stars={142}/>
      <div style={{ padding: '0 32px 32px' }}>
        <BigGoalCard done={8} target={10}/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', margin: '24px 0 12px' }}>
          <h2 style={{ margin: 0, font: 'var(--type-h2)', color: 'var(--ink-900)' }}>Today's lessons</h2>
          <a href="#" style={{ font: 'var(--type-label)', color: 'var(--sky-600)', textDecoration: 'none' }}>See all →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {lessons.map((l, i) => (
            <LessonCard key={i} {...l} onClick={l.status === 'current' ? onOpen : null}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function PathScreen({ onTab, active, onPlay }) {
  const nodes = [
    { x: 50, label: 'Hi!',     status: 'done',    accent: 'success' },
    { x: 70, label: 'Family',  status: 'done',    accent: 'success' },
    { x: 50, label: 'Animals', status: 'done',    accent: 'success' },
    { x: 30, label: 'Numbers', status: 'current', accent: 'coral' },
    { x: 50, label: 'Colors',  status: 'locked',  accent: 'sky' },
    { x: 70, label: 'Shapes',  status: 'locked',  accent: 'amber' },
    { x: 50, label: 'Food',    status: 'locked',  accent: 'sky' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 32px 8px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div className="cl-chip cl-chip--coral">UNIT 2</div>
        <h2 style={{ margin: 0, font: 'var(--type-h2)', color: 'var(--ink-900)' }}>Numbers & Counting</h2>
      </div>
      <div style={{ flex: 1, position: 'relative', padding: '12px 32px 40px' }}>
        <div style={{ position: 'relative', height: 800, maxWidth: 480, margin: '0 auto' }}>
          <svg width="100%" height="800" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 100 800" preserveAspectRatio="none">
            <path d="M 50 70 Q 80 130 70 200 Q 60 270 50 320 Q 40 370 30 440 Q 20 510 50 560 Q 80 610 70 680 Q 60 750 50 770"
                  stroke="var(--ink-200)" strokeWidth="3" strokeDasharray="4 8" fill="none" strokeLinecap="round"/>
          </svg>
          {nodes.map((n, i) => (
            <div key={i} style={{ position: 'absolute', top: 30 + i*110, left: `calc(${n.x}% - 50px)` }}>
              <PathNode {...n} onClick={n.status === 'current' ? onPlay : null}/>
            </div>
          ))}
          <img src="../../assets/sticker-star.svg" width="56" alt=""
               style={{ position: 'absolute', top: 380, right: -10, transform: 'rotate(15deg)' }}/>
        </div>
      </div>
    </div>
  );
}

function LessonScreen({ onTab, active, onDone, celebrating, closeCeleb }) {
  const [picked, setPicked] = React.useState(null);
  const correct = 'Five';
  const choices = [
    { word: 'Three', emoji: '🐠' },
    { word: 'Five',  emoji: '🖐️' },
    { word: 'Two',   emoji: '👀' },
    { word: 'Seven', emoji: '🌈' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '20px 32px 16px', display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--ink-100)' }}>
        <button style={{ background:'none', border:'none', cursor:'pointer', padding: 4 }}>
          <i data-lucide="x" style={{ width: 28, height: 28, color: 'var(--ink-500)' }}></i>
        </button>
        <div style={{ flex: 1, height: 14, background: 'var(--cream-200)', borderRadius: 999, overflow: 'hidden', maxWidth: 600 }}>
          <div style={{ width: '60%', height: '100%', background: 'var(--coral-500)' }}></div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, color: 'var(--coral-600)', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>
          <i data-lucide="heart" style={{ width: 20, height: 20, fill: 'currentColor' }}></i> 3
        </div>
      </div>
      <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <div style={{ font: 'var(--type-label)', color: 'var(--fg-3)', textAlign: 'center' }}>MATCH THE WORD</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, color: 'var(--ink-900)', lineHeight: 1.15, textAlign: 'center', marginTop: 6 }}>
          How many fingers? 🖐️
        </div>
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, width: '100%', maxWidth: 560 }}>
          {choices.map(c => (
            <ChoiceCard key={c.word} {...c}
              picked={picked === c.word}
              correct={picked === c.word ? c.word === correct : null}
              onClick={() => setPicked(c.word)}/>
          ))}
        </div>
        <button className="cl-btn cl-btn--lg" style={{ marginTop: 32, minWidth: 280 }}
          disabled={!picked} onClick={onDone}>
          {picked ? (picked === correct ? 'Nice! Continue' : 'Try again') : 'Pick an answer'}
        </button>
      </div>
      {celebrating && <CelebrationOverlay onClose={closeCeleb}/>}
    </div>
  );
}

function ProfileScreen() {
  const badges = [
    { c: 'var(--celebrate-orange)', icon: 'sun',     label: 'First Day' },
    { c: 'var(--celebrate-pink)',   icon: 'heart',   label: 'Bookworm' },
    { c: 'var(--celebrate-blue)',   icon: 'compass', label: 'Explorer' },
    { c: 'var(--celebrate-green)',  icon: 'sparkles',label: 'Streaker' },
    { c: 'var(--celebrate-purple)', icon: 'crown',   label: 'Class Star' },
    { c: 'var(--ink-200)', icon: 'lock', label: '?', locked: true },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '32px 32px 28px', textAlign: 'center', background: 'linear-gradient(180deg, var(--coral-100), transparent)' }}>
        <img src="../../assets/nong-avatar.png" alt="" style={{ width: 120, height: 120, borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}/>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--ink-900)', marginTop: 10 }}>Praewa</div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Age 7 · Joined Mar 2026</div>
      </div>
      <div style={{ padding: '0 32px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, maxWidth: 720, margin: '0 auto' }}>
        <Stat icon="flame" v="5" l="Day streak" tile="amber"/>
        <Stat icon="star" v="142" l="Stars" tile="coral"/>
        <Stat icon="trophy" v="5" l="Badges" tile="sky"/>
      </div>
      <div style={{ padding: '0 32px 32px', maxWidth: 720, margin: '0 auto' }}>
        <h3 style={{ margin: '8px 0 16px', font: 'var(--type-h3)', color: 'var(--ink-900)' }}>Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ textAlign: 'center', opacity: b.locked ? 0.5 : 1 }}>
              <div style={{
                width: 80, height: 80, margin: '0 auto', borderRadius: '50%', background: b.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 0 rgba(0,0,0,0.12)', color: '#fff',
              }}><i data-lucide={b.icon} style={{ width: 36, height: 36 }}></i></div>
              <div style={{ font: 'var(--type-caption)', color: 'var(--ink-700)', marginTop: 6, fontWeight: 700 }}>{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, v, l, tile }) {
  return (
    <div className="cl-card" style={{ padding: 16, textAlign: 'center' }}>
      <div className={`cl-icon-tile cl-icon-tile--${tile}`} style={{ margin: '0 auto 6px' }}>
        <i data-lucide={icon}></i>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, color: 'var(--ink-900)' }}>{v}</div>
      <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{l}</div>
    </div>
  );
}

Object.assign(window, { HomeScreen, PathScreen, LessonScreen, ProfileScreen });
