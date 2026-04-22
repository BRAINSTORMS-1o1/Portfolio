// ============================================================
//  MAIN.JS — Portfolio Interactivity
//  Sections: Scroll | Nav | Theme | Typing | Render | Form
// ============================================================

/* ────────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
   Shows a thin gradient bar at the very top of the page.
───────────────────────────────────────────────────────────── */
const scrollProgressBar = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrolled = window.scrollY;
  const total    = document.body.scrollHeight - window.innerHeight;
  scrollProgressBar.style.width = ((scrolled / total) * 100) + '%';
}

/* ────────────────────────────────────────────────────────────
   NAVBAR  — sticky glass + active-link highlight
───────────────────────────────────────────────────────────── */
const navHeader = document.getElementById('navHeader');
const navLinks  = document.querySelectorAll('a.nav-link');

function updateNav() {
  // Glassmorphism on scroll
  navHeader.classList.toggle('scrolled', window.scrollY > 60);

  // Back-to-top button visibility
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNav();
}, { passive: true });

/* ────────────────────────────────────────────────────────────
   MOBILE HAMBURGER MENU
───────────────────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

// Close menu when any mobile link is tapped
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden',  'true');
  });
});

/* ────────────────────────────────────────────────────────────
   DARK / LIGHT MODE TOGGLE  — persisted in localStorage
───────────────────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');

// Restore saved preference (default: dark)
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ────────────────────────────────────────────────────────────
   TYPING / ROLE ANIMATION  — cycles through PORTFOLIO_DATA.personal.roles
───────────────────────────────────────────────────────────── */
(function initTyping() {
  const el     = document.getElementById('typedText');
  if (!el) return;
  const roles  = PORTFOLIO_DATA.personal.roles;
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    deleting ? ci-- : ci++;
    el.textContent = word.slice(0, ci);

    let delay = deleting ? 45 : 95;
    if (!deleting && ci === word.length) { delay = 2200; deleting = true; }
    else if (deleting && ci === 0)       { deleting = false; ri = (ri + 1) % roles.length; delay = 380; }

    setTimeout(tick, delay);
  }
  tick();
})();

/* ────────────────────────────────────────────────────────────
   RENDER SKILLS
───────────────────────────────────────────────────────────── */
(function renderSkills() {
  const grid = document.querySelector('.skills-grid');
  if (!grid) return;
  grid.innerHTML = PORTFOLIO_DATA.skills.map(s =>
    `<span class="skill-badge"><span aria-hidden="true">${s.icon}</span>${s.name}</span>`
  ).join('');
})();

/* ────────────────────────────────────────────────────────────
   RENDER STATS
───────────────────────────────────────────────────────────── */
(function renderStats() {
  const container = document.querySelector('.about-stats');
  if (!container) return;
  container.innerHTML = PORTFOLIO_DATA.stats.map(s =>
    `<div class="stat">
       <span class="stat-number">${s.number}</span>
       <span class="stat-label">${s.label}</span>
     </div>`
  ).join('');
})();

/* ────────────────────────────────────────────────────────────
   RENDER PROJECTS
───────────────────────────────────────────────────────────── */
(function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.projects.map(p => {
    const imgHTML = p.image
      ? `<img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy">`
      : `<div class="project-img-placeholder" aria-hidden="true">${p.emoji}</div>`;

    const techHTML = p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

    return `
      <article class="project-card reveal-up" data-tags="${p.tags.join(' ')}">
        ${imgHTML}
        <div class="project-body">
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech">${techHTML}</div>
          <div class="project-links">
            <a href="${p.liveUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live demo of ${p.title}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
            <a href="${p.githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="${p.title} source code on GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </article>`;
  }).join('');

})();

/* ────────────────────────────────────────────────────────────
   PROJECT FILTERS
───────────────────────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.dataset.tags.includes(filter);
      card.style.display = match ? '' : 'none';
    });
  });
});

/* ────────────────────────────────────────────────────────────
   RENDER RESUME TIMELINES
───────────────────────────────────────────────────────────── */
function renderTimeline(containerId, items, type) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item">
      <div class="timeline-period">${item.period}</div>
      <div class="timeline-title">${type === 'exp' ? item.title  : item.degree}</div>
      <div class="timeline-org"  >${type === 'exp' ? item.company : item.school}</div>
      <p   class="timeline-desc"  >${item.description}</p>
    </div>`
  ).join('');
}
renderTimeline('expTimeline', PORTFOLIO_DATA.experience, 'exp');
renderTimeline('eduTimeline', PORTFOLIO_DATA.education,  'edu');

/* ────────────────────────────────────────────────────────────
   CONTACT FORM  — validation + submit (EmailJS-ready)
   To hook up real email sending:
     1. Sign up at https://emailjs.com (free tier)
     2. Replace the sendEmail() stub below with your real call
───────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn     = document.getElementById('submitBtn');
    const txtSpan = btn.querySelector('.btn-text');
    const ldSpan  = btn.querySelector('.btn-loading');
    const successEl = document.getElementById('formSuccess');

    // Loading state
    txtSpan.hidden = true;
    ldSpan.hidden  = false;
    btn.disabled   = true;

    try {
      await sendEmail({
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      });

      contactForm.reset();
      clearErrors();
      successEl.hidden = false;
      setTimeout(() => (successEl.hidden = true), 6000);
    } catch (err) {
      alert('Oops — something went wrong. Please try emailing me directly.');
      console.error(err);
    } finally {
      txtSpan.hidden = false;
      ldSpan.hidden  = true;
      btn.disabled   = false;
    }
  });
}

/**
 * sendEmail — STUB
 * Replace the body of this function with your actual email service call.
 *
 * ── EmailJS example ─────────────────────────────────────────
 * return emailjs.send('SERVICE_ID', 'TEMPLATE_ID', data, 'PUBLIC_KEY');
 *
 * ── Formspree example ───────────────────────────────────────
 * return fetch('https://formspree.io/f/YOUR_ID', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(data),
 * });
 *
 * ── Your own Express/Node endpoint ──────────────────────────
 * return fetch('/api/contact', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(data),
 * });
 */
async function sendEmail(data) {
  // ⚠️  Replace this with a real implementation above!
  console.log('Contact form data:', data);
  await new Promise(r => setTimeout(r, 1400)); // Simulated network delay
}

function validateForm() {
  clearErrors();
  let ok = true;
  const rules = [
    { id: 'name',    check: v => v.trim().length >= 2,    msg: 'Please enter your name (min. 2 characters).' },
    { id: 'email',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
    { id: 'subject', check: v => v.trim().length >= 3,    msg: 'Subject must be at least 3 characters.' },
    { id: 'message', check: v => v.trim().length >= 10,   msg: 'Message must be at least 10 characters.' },
  ];
  rules.forEach(({ id, check, msg }) => {
    const input = document.getElementById(id);
    if (!check(input.value)) {
      input.classList.add('error');
      document.getElementById(id + 'Error').textContent = msg;
      ok = false;
    }
  });
  return ok;
}

function clearErrors() {
  ['name','email','subject','message'].forEach(id => {
    document.getElementById(id)?.classList.remove('error');
    const err = document.getElementById(id + 'Error');
    if (err) err.textContent = '';
  });
}

/* ────────────────────────────────────────────────────────────
   INTERSECTION OBSERVER — scroll reveal animations
───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ────────────────────────────────────────────────────────────
   BACK TO TOP BUTTON
───────────────────────────────────────────────────────────── */
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ────────────────────────────────────────────────────────────
   SMOOTH SCROLL for all anchor links
───────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
