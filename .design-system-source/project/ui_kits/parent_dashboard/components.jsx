// Parent Dashboard components — calm, data-forward.

function Sidebar({ active, onChange }) {
  const items = [
    { id: 'home',     icon: 'layout-dashboard', label: 'Overview' },
    { id: 'progress', icon: 'trending-up',      label: 'Progress' },
    { id: 'schedule', icon: 'calendar',         label: 'Schedule' },
    { id: 'billing',  icon: 'credit-card',      label: 'Billing' },
    { id: 'messages', icon: 'message-circle',   label: 'Messages' },
  ];
  return (
    <aside style={{
      width: 240, height: '100%', background: 'var(--cream-50)',
      borderRight: '1px solid var(--ink-100)',
      padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 4,
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 18px' }}>
        <img src="../../assets/nong-avatar.png" alt="" style={{ width: 36, height: 36, borderRadius: '50%' }}/>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--coral-600)', lineHeight: 1 }}>ChangLek</div>
          <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Parent Portal</div>
        </div>
      </div>
      {items.map(i => {
        const on = i.id === active;
        return (
          <button key={i.id} onClick={() => onChange(i.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 'var(--r-md)',
            border: 'none', cursor: 'pointer', textAlign: 'left',
            background: on ? 'var(--coral-100)' : 'transparent',
            color: on ? 'var(--coral-700)' : 'var(--ink-700)',
            font: 'var(--type-body)', fontWeight: 600,
          }}>
            <i data-lucide={i.icon} style={{ width: 18, height: 18 }}></i> {i.label}
          </button>
        );
      })}
      <div style={{ marginTop: 'auto', padding: 10, background: 'var(--cream-100)', borderRadius: 'var(--r-md)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--coral-300)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800 }}>P</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: 'var(--type-label)', color: 'var(--ink-800)' }}>Khun Praew</div>
          <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Parent</div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 28px 14px', borderBottom: '1px solid var(--ink-100)',
    }}>
      <div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{subtitle}</div>
        <h1 style={{ margin: 0, font: 'var(--type-h2)', color: 'var(--ink-900)' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="cl-btn cl-btn--ghost cl-btn--sm"><i data-lucide="bell" style={{ width: 16, height: 16 }}></i></button>
        <button className="cl-btn cl-btn--accent cl-btn--sm">+ Book trial class</button>
      </div>
    </div>
  );
}

function StatCard({ icon, tile, label, value, delta, deltaUp }) {
  return (
    <div className="cl-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span className={`cl-icon-tile cl-icon-tile--${tile}`}><i data-lucide={icon} style={{ width: 18, height: 18 }}></i></span>
        <div style={{ flex: 1 }}>
          <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{label}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--ink-900)', lineHeight: 1.1 }}>{value}</div>
        </div>
      </div>
      {delta && (
        <div style={{ marginTop: 10, font: 'var(--type-caption)', color: deltaUp ? 'var(--success-700)' : 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <i data-lucide={deltaUp ? 'trending-up' : 'minus'} style={{ width: 14, height: 14 }}></i> {delta}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ label, value, color = 'var(--coral-500)' }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ font: 'var(--type-label)', color: 'var(--ink-700)' }}>{label}</span>
        <span style={{ font: 'var(--type-label)', color: 'var(--ink-500)' }}>{value}%</span>
      </div>
      <div style={{ height: 10, background: 'var(--cream-200)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ width: value+'%', height: '100%', background: color, borderRadius: 999 }}></div>
      </div>
    </div>
  );
}

function ScheduleRow({ day, time, course, tutor, status }) {
  const statusStyle = {
    upcoming: { bg: 'var(--sky-100)', fg: 'var(--sky-700)', label: 'Upcoming' },
    today:    { bg: 'var(--coral-100)', fg: 'var(--coral-700)', label: 'Today' },
    done:     { bg: 'var(--success-100)', fg: 'var(--success-700)', label: 'Attended' },
  }[status];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 110px', gap: 14, alignItems: 'center', padding: '12px 14px', borderRadius: 'var(--r-md)', borderBottom: '1px solid var(--ink-100)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--coral-600)', lineHeight: 1 }}>{day.split(' ')[1]}</div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{day.split(' ')[0]}</div>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--ink-900)' }}>{course}</div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{time}</div>
      </div>
      <div style={{ font: 'var(--type-caption)', color: 'var(--ink-700)' }}>Teacher {tutor}</div>
      <span className="cl-chip" style={{ background: statusStyle.bg, color: statusStyle.fg, justifySelf: 'end' }}>{statusStyle.label}</span>
    </div>
  );
}

function BillItem({ desc, date, amount, paid }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 4px', borderBottom: '1px solid var(--ink-100)' }}>
      <span className={`cl-icon-tile ${paid ? 'cl-icon-tile--success' : ''}`} style={{ background: paid ? 'var(--success-100)' : 'var(--amber-100)', color: paid ? 'var(--success-700)' : 'var(--amber-600)' }}>
        <i data-lucide={paid ? 'check' : 'clock'} style={{ width: 18, height: 18 }}></i>
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ font: 'var(--type-body)', fontWeight: 700, color: 'var(--ink-900)' }}>{desc}</div>
        <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>{date}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--ink-900)' }}>{amount}</div>
    </div>
  );
}

function MiniCalendar() {
  const days = ['M','T','W','T','F','S','S'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2);
  const today = 12, classes = [3, 8, 12, 17, 24];
  return (
    <div className="cl-card" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--ink-900)' }}>May 2026</div>
        <div style={{ display: 'flex', gap: 4 }}>
          <i data-lucide="chevron-left" style={{ width: 18, height: 18, color: 'var(--ink-500)' }}></i>
          <i data-lucide="chevron-right" style={{ width: 18, height: 18, color: 'var(--ink-500)' }}></i>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((d, i) => <div key={i} style={{ textAlign: 'center', font: 'var(--type-caption)', color: 'var(--fg-3)', padding: 4 }}>{d}</div>)}
        {dates.map((d, i) => {
          const valid = d > 0 && d <= 31;
          const isToday = d === today;
          const hasClass = classes.includes(d);
          return (
            <div key={i} style={{
              aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--r-sm)',
              background: isToday ? 'var(--coral-500)' : 'transparent',
              color: isToday ? '#fff' : valid ? 'var(--ink-700)' : 'transparent',
              fontWeight: isToday || hasClass ? 700 : 400,
              position: 'relative',
            }}>
              {valid ? d : ''}
              {hasClass && !isToday && <div style={{ position: 'absolute', bottom: 2, width: 4, height: 4, borderRadius: 2, background: 'var(--coral-500)' }}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, TopBar, StatCard, ProgressBar, ScheduleRow, BillItem, MiniCalendar });
