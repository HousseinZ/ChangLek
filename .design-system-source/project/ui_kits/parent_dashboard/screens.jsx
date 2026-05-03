// Parent Dashboard screens.

function OverviewScreen() {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <TopBar subtitle="Welcome back, Khun Praew" title="How Praewa is doing"/>
      <div style={{ padding: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          <StatCard icon="flame"  tile="amber"   label="Day streak" value="5"   delta="+2 this week" deltaUp/>
          <StatCard icon="star"   tile="coral"   label="Stars"       value="142" delta="+38 this week" deltaUp/>
          <StatCard icon="book-open" tile="sky"  label="Lessons done"value="14"  delta="of 20 this month" />
          <StatCard icon="clock"  tile="success" label="Time learning" value="3h 20m" delta="+45m vs last wk" deltaUp/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
          <div className="cl-card" style={{ padding: 22 }}>
            <h3 style={{ margin: '0 0 14px', font: 'var(--type-h3)', color: 'var(--ink-900)' }}>Skill progress</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ProgressBar label="Vocabulary" value={72}/>
              <ProgressBar label="Listening"  value={58} color="var(--sky-400)"/>
              <ProgressBar label="Speaking"   value={41} color="var(--amber-400)"/>
              <ProgressBar label="Reading"    value={28} color="var(--celebrate-purple)"/>
            </div>
            <div style={{ marginTop: 18, padding: 14, background: 'var(--sky-50)', borderRadius: 'var(--r-md)', display: 'flex', gap: 12, alignItems: 'center' }}>
              <i data-lucide="info" style={{ color: 'var(--sky-600)', width: 20, height: 20, flexShrink: 0 }}></i>
              <div style={{ font: 'var(--type-body-sm)', color: 'var(--ink-700)' }}>
                Praewa is strong on vocabulary. Try the <b>"Read with Nong"</b> add-on to boost reading.
              </div>
            </div>
          </div>
          <MiniCalendar/>
        </div>
        <div className="cl-card" style={{ padding: 22, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 style={{ margin: 0, font: 'var(--type-h3)', color: 'var(--ink-900)' }}>Upcoming classes</h3>
            <a href="#" style={{ font: 'var(--type-label)' }}>See full schedule</a>
          </div>
          <ScheduleRow day="Tue 14" time="4:00–4:50pm" course="Numbers & Counting" tutor="Anna" status="today"/>
          <ScheduleRow day="Thu 16" time="4:00–4:50pm" course="Colors & Shapes"   tutor="Anna" status="upcoming"/>
          <ScheduleRow day="Tue 21" time="4:00–4:50pm" course="Animals at the Zoo" tutor="Mark" status="upcoming"/>
        </div>
      </div>
    </div>
  );
}

function BillingScreen() {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <TopBar subtitle="Plan & invoices" title="Billing"/>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="cl-card" style={{ padding: 22 }}>
          <div style={{ font: 'var(--type-label)', color: 'var(--fg-3)' }}>CURRENT PLAN</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--coral-600)', marginTop: 4 }}>Little Explorer</div>
          <div style={{ font: 'var(--type-body)', color: 'var(--ink-700)', marginTop: 4 }}>2 classes/week · ฿1,290 / month</div>
          <div style={{ marginTop: 16, padding: 14, background: 'var(--cream-100)', borderRadius: 'var(--r-md)' }}>
            <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>NEXT CHARGE</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--ink-900)' }}>฿1,290 on May 15</div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button className="cl-btn cl-btn--secondary cl-btn--sm">Change plan</button>
            <button className="cl-btn cl-btn--ghost cl-btn--sm">Cancel</button>
          </div>
        </div>
        <div className="cl-card" style={{ padding: 22 }}>
          <div style={{ font: 'var(--type-label)', color: 'var(--fg-3)' }}>PAYMENT METHOD</div>
          <div style={{ marginTop: 10, padding: 14, border: '2px solid var(--ink-100)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="cl-icon-tile cl-icon-tile--sky"><i data-lucide="credit-card"></i></span>
            <div style={{ flex: 1 }}>
              <div style={{ font: 'var(--type-body)', fontWeight: 700, color: 'var(--ink-900)' }}>SCB Visa ···· 4218</div>
              <div style={{ font: 'var(--type-caption)', color: 'var(--fg-3)' }}>Expires 09/27</div>
            </div>
            <i data-lucide="chevron-right" style={{ color: 'var(--ink-400)' }}></i>
          </div>
          <button className="cl-btn cl-btn--ghost cl-btn--sm" style={{ marginTop: 10 }}>+ Add payment method</button>
        </div>
        <div className="cl-card" style={{ padding: 22, gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 6px', font: 'var(--type-h3)' }}>Invoice history</h3>
          <BillItem desc="Little Explorer · April 2026" date="Apr 15, 2026" amount="฿1,290" paid/>
          <BillItem desc="Little Explorer · March 2026" date="Mar 15, 2026" amount="฿1,290" paid/>
          <BillItem desc="Little Explorer · February 2026" date="Feb 15, 2026" amount="฿1,290" paid/>
          <BillItem desc="Trial class" date="Jan 28, 2026" amount="Free" paid/>
        </div>
      </div>
    </div>
  );
}

function ScheduleScreen() {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <TopBar subtitle="2 classes per week" title="Schedule"/>
      <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        <div className="cl-card" style={{ padding: 6 }}>
          <ScheduleRow day="Tue 14" time="4:00–4:50pm" course="Numbers & Counting" tutor="Anna" status="today"/>
          <ScheduleRow day="Thu 16" time="4:00–4:50pm" course="Colors & Shapes"   tutor="Anna" status="upcoming"/>
          <ScheduleRow day="Tue 21" time="4:00–4:50pm" course="Animals at the Zoo" tutor="Mark" status="upcoming"/>
          <ScheduleRow day="Thu 23" time="4:00–4:50pm" course="My Family"          tutor="Mark" status="upcoming"/>
          <ScheduleRow day="Tue 7"  time="4:00–4:50pm" course="Hello & Goodbye"    tutor="Anna" status="done"/>
          <ScheduleRow day="Thu 9"  time="4:00–4:50pm" course="Big & Small"        tutor="Anna" status="done"/>
        </div>
        <MiniCalendar/>
      </div>
    </div>
  );
}

Object.assign(window, { OverviewScreen, BillingScreen, ScheduleScreen });
