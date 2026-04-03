/* ═══════════════════════════════════════════════════
   ALEX MORGAN — STUDENT PORTFOLIO — script.js
   ═══════════════════════════════════════════════════ */

// ── Navbar: scroll state ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
 
// ── Scroll Reveal ──
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals
      const siblings = entry.target.closest('.skills-grid, .projects-grid, .cert-grid, .events-grid, .creative-grid, .hobbies-grid, .about-grid, .interest-cards, .hero-content');
      let delay = 0;
      if (siblings) {
        const items = [...siblings.querySelectorAll('.reveal')];
        delay = items.indexOf(entry.target) * 80;
      }
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── Skill bars: animate when visible ──
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fillBar 1.4s ease forwards';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(fill => skillObserver.observe(fill));

// ── Read More / Collapse creative cards ──
document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const expand   = document.getElementById(targetId);
    const isOpen   = expand.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.querySelector('.btn-text').textContent = isOpen ? 'Read Less' : 'Read More';
  });
});

// ── Contact form ──
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled    = true;
    setTimeout(() => {
      formSuccess.classList.add('show');
      form.reset();
      btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      btn.disabled  = false;
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const activateNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--gold)';
    }
  });
};
window.addEventListener('scroll', activateNav, { passive: true });

// ── Hero: subtle parallax on scroll ──
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBgText.style.transform = `translateY(calc(-50% + ${y * 0.2}px))`;
  }, { passive: true });
}
