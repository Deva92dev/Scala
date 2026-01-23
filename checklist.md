## Safari Test

Extra: make your code Safari-resilient without testing

Given your stack, these rules reduce Safari pain massively:
Avoid nested transform + position: sticky
Avoid animating large containers on scroll
Prefer opacity + translateY over scale
Keep IntersectionObserver thresholds simple (0.1–0.2)
Disable parallax on iOS by default
Never animate backdrop-filter

✅ CHECKLIST — POINT 2: CROSS-BROWSER TESTING (B2B-READY)
🎯 Goal
Ensure your app behaves correctly and predictably across real user browsers — not just Chrome on your machine.
A. Supported Browser Contract (define once)
You explicitly support:
✅ Chrome (latest − 1)
✅ Firefox (latest − 1)
✅ Safari (latest stable)
✅ Mobile Safari (iOS)
Anything else → graceful degradation, not perfection.
For Safari (
If you know one person with:
Your deployed URL

A short checklist:
Scroll fast
Reload mid-scroll
Resize window
Toggle “Reduce Motion”
)

B. Mandatory Manual Test Pass (per feature or release)
Before marking a feature “done”, check it once in:
⬜ Chrome
⬜ Firefox
⬜ Safari
⬜ Mobile view (Chrome DevTools or real phone)
Rule:
If it breaks in Safari, it’s not done.
C. CSS & Layout Pitfall Checklist (Safari/Firefox killers)
Verify these specifically:
⬜ position: sticky works as expected
⬜ No reliance on 100vh for critical layouts (Safari lies)
⬜ Scroll containers behave correctly (overflow, nested scroll)
⬜ Flexbox alignment consistent
⬜ No layout break when fonts fail to load
⬜ Buttons and inputs render correctly (Safari forms are weird)
D. Font & Typography Safety
⬜ System font fallback defined
Copy code
Css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
⬜ App still readable if custom font fails
⬜ Line height not browser-dependent
E. Forms & Inputs (critical for B2B)
Test all forms in Safari + Firefox:
⬜ Focus states visible
⬜ Labels correctly associated
⬜ Keyboard navigation works
⬜ Validation messages show correctly
⬜ Date / number inputs behave reasonably
F. Modals, Popovers, Dropdowns
⬜ Can open & close reliably
⬜ No scroll lock bugs
⬜ Escape key works
⬜ Click outside closes (where expected)
G. Quick Cross-Browser Smoke Test (5 minutes)
Before deploy:
⬜ Page loads
⬜ Scroll works
⬜ Primary CTA clickable
⬜ No obvious layout breaks
That’s it. Don’t overthink it.
✅ CHECKLIST — POINT 9: SLOW NETWORK & REAL-WORLD PERFORMANCE
🎯 Goal
Your app must feel usable even on bad internet, not just your Wi-Fi.
A. Assume This User Exists
On mobile hotspot
On flaky office VPN
In a developing region
Switching networks mid-session
Design for them.
B. Network Throttling Test (non-negotiable)
In Chrome DevTools → Network:
⬜ Test on Slow 3G
⬜ Test on Fast 3G
For each state, verify:
⬜ App doesn’t freeze
⬜ UI remains responsive
⬜ No infinite spinners
C. Loading States (every async boundary)
Every async operation must have:
⬜ Loading indicator or skeleton
⬜ Disabled buttons while loading
⬜ No layout jump when data arrives
Blank white screen = failure.
D. Skeleton Loaders (high-impact)
⬜ Skeleton matches final layout
⬜ Avoid spinner-only full screens
⬜ Keep perceived performance high
Skeletons > spinners for B2B UX.
E. Error Handling on Bad Network
Simulate offline / failed requests:
⬜ Friendly error message
⬜ Retry option
⬜ App does not crash
⬜ No silent failures
F. Data Fetching Discipline
⬜ Avoid over-fetching
⬜ Paginate large lists
⬜ Debounce search inputs
⬜ Cache where possible (TanStack Query / SWR)
G. Asset & Bundle Hygiene
⬜ Images optimized
⬜ No unnecessary fonts
⬜ Code-splitting where logical
⬜ Avoid loading heavy libraries on first paint
H. Mobile Reality Check
On mobile throttle:
⬜ Tap targets usable
⬜ No hover dependency
⬜ Scroll smooth
⬜ App usable with one hand
I. Final Slow-Network Sanity Test
Ask yourself:
“If this took 5 seconds to load, would a user still trust the app?”
If yes → you shipped responsibly.
🧠 Lock This Into Your System
Add this to your Definition of Done:
✅ Cross-browser tested
✅ Slow network tested
✅ Skeletons & errors handled
✅ No hover-only critical actions
That’s how pros stay calm while the world panics.
