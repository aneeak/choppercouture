/* =============================================
   DINKAISCH // navigation + animations
   ============================================= */

let currentPage = 0;
const TOTAL_PAGES = 7;
const pages = document.getElementById('pages');
const navButtons = document.querySelectorAll('.nav-links button, .nav-logo');
const indicator = document.getElementById('page-indicator');

const pageNames = ['Home', 'Campaigns', 'Podcast', 'Flyer', 'Tattoo', 'Graffiti', 'About'];

function goToPage(n) {
  if (n < 0 || n >= TOTAL_PAGES) return;

  // Reset scroll on previous page
  const prevPage = pages.children[currentPage];
  prevPage.scrollTop = 0;

  currentPage = n;
  pages.style.transform = `translateX(-${n * 100}vw)`;

  // Update nav active state
  document.querySelectorAll('.nav-links button').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === n);
  });

  // Update indicator
  indicator.textContent = `${String(n + 1).padStart(2, '0')} / ${String(TOTAL_PAGES).padStart(2, '0')}`;

  // Trigger animations on the new page after transition
  setTimeout(() => triggerPageAnimations(n), 100);

  // Update URL hash
  const names = ['', 'campaigns', 'podcast', 'flyer', 'tattoo', 'graffiti', 'about'];
  history.replaceState(null, '', names[n] ? '#' + names[n] : '#');
}

// Wire nav buttons
document.querySelectorAll('[data-page]').forEach(btn => {
  btn.addEventListener('click', () => goToPage(parseInt(btn.dataset.page)));
});

// =============================================
// Scroll-reveal per page with IntersectionObserver
// =============================================
const scrollObservers = new Map();

function setupPageObserver(pageIndex) {
  const page = pages.children[pageIndex];
  if (!page || scrollObservers.has(pageIndex)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, {
    root: page,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  page.querySelectorAll('.fade-in, .fade-in-up, .scroll-reveal').forEach(el => {
    obs.observe(el);
  });

  scrollObservers.set(pageIndex, obs);
}

function triggerPageAnimations(pageIndex) {
  setupPageObserver(pageIndex);
  // Also directly show already-visible elements (those at top)
  const page = pages.children[pageIndex];
  if (!page) return;
  page.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}

// =============================================
// Custom Cursor
// =============================================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
let mx = -100, my = -100;
let cx = -100, cy = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top = my + 'px';
});

function animateCursor() {
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('button, a, .home-nav-item, [data-page]').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// =============================================
// Keyboard navigation
// =============================================
document.addEventListener('keydown', e => {
  const page = pages.children[currentPage];
  const atBottom = page.scrollTop + page.clientHeight >= page.scrollHeight - 40;
  const atTop = page.scrollTop <= 10;

  if (e.key === 'ArrowRight' || (e.key === 'ArrowDown' && atBottom)) {
    e.preventDefault(); goToPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' || (e.key === 'ArrowUp' && atTop && currentPage > 0)) {
    e.preventDefault(); goToPage(currentPage - 1);
  }
});

// =============================================
// Touch swipe support
// =============================================
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = touchStartX - e.changedTouches[0].clientX;
  const dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx > 0) goToPage(currentPage + 1);
    else goToPage(currentPage - 1);
  }
}, { passive: true });

// =============================================
// Handle URL hash on load
// =============================================
const hashMap = { campaigns: 1, podcast: 2, flyer: 3, tattoo: 4, graffiti: 5, about: 6 };

function initFromHash() {
  const hash = window.location.hash.replace('#', '');
  const page = hashMap[hash] ?? 0;
  goToPage(page);
}

// =============================================
// Init
// =============================================
initFromHash();
// Setup observers for all pages
for (let i = 0; i < TOTAL_PAGES; i++) setupPageObserver(i);
