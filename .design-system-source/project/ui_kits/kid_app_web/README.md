# Kid Learning Web App — UI Kit

Web-based learning app for kids ages 3–12. Designed for laptops/Chromebooks. Built as a 1240×780 browser window.

**Surfaces** (left sidebar nav):
- `Home` — greeting, daily-goal hero, lesson grid
- `Lessons` — winding lesson path (click the current node to play)
- `Lessons → Lesson` — multiple-choice question; finish to see the celebration overlay
- `Me` — child profile, stats, badges
- `Play` — placeholder

**Files:**
- `index.html` — interactive shell, click sidebar items to navigate
- `components.jsx` — SideNav, TopStrip, BigGoalCard, LessonCard, PathNode, ChoiceCard, CelebrationOverlay
- `screens.jsx` — composed pages
- `browser-window.jsx` — chrome bezel
