// Byggmeister Tore Hovland AS – vanilla JS

(function () {
  'use strict';

  // ── Sticky header ──────────────────────────────────────────
  const header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile nav toggle ──────────────────────────────────────
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll offset for fixed header ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ── Intersection observer – fade-in on scroll ──────────────
  const fadeEls = document.querySelectorAll(
    '.service-card, .project-card, .kvifor-list li, .stat, .contact-item'
  );
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 4 * 0.08) + 's, transform 0.5s ease ' + (i % 4 * 0.08) + 's';
    io.observe(el);
  });

  document.addEventListener('animationend', function () {}, false); // noop

  // visible class
  document.head.insertAdjacentHTML('beforeend',
    '<style>.visible{opacity:1!important;transform:none!important}</style>'
  );

  // ── Contact form – basic client-side feedback ─────────────
  const form = document.querySelector('.kontakt-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sendt! Me kjem tilbake til deg snart.';
      btn.disabled = true;
      btn.style.background = '#2D6A2D';
      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  }

})();
