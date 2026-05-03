# Parent Dashboard — UI Kit

Web app for parents to track their child's learning, schedule, and billing. Built as a 1240×760 browser window.

**Surfaces** (sidebar nav):
- `Overview` — stats, skill progress, mini-calendar, upcoming classes
- `Schedule` — full class list w/ tutor + status
- `Billing` — current plan, payment method, invoice history
- `Progress` / `Messages` — placeholder views (use Overview)

**Files:**
- `index.html` — interactive shell, click sidebar items to switch
- `components.jsx` — Sidebar, TopBar, StatCard, ProgressBar, ScheduleRow, BillItem, MiniCalendar
- `screens.jsx` — composed pages
- `browser-window.jsx` — chrome bezel
