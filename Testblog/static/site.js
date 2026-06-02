/* created.bylina — site.js
   Minimal vanilla JS: nav mobile, rotating hero text, reading progress,
   newsletter form, collab form. No React, no Babel, no external deps. */

(function () {
  'use strict';

  // -----------------------------------------------------------------------
  // Mobile nav toggle
  // -----------------------------------------------------------------------
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close nav when a link is clicked
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -----------------------------------------------------------------------
  // Rotating hero word
  // -----------------------------------------------------------------------
  const el = document.getElementById('rotating-word');
  if (el) {
    const raw   = el.dataset.words || '';
    const words = raw.split(',').map(w => w.trim()).filter(Boolean);
    if (words.length > 1) {
      let idx = 0;
      setInterval(function () {
        el.classList.add('fade-out');
        setTimeout(function () {
          idx = (idx + 1) % words.length;
          el.textContent = words[idx];
          el.classList.remove('fade-out');
        }, 320);
      }, 2400);
    }
  }

  // -----------------------------------------------------------------------
  // Reading progress bar (article pages only)
  // -----------------------------------------------------------------------
  const bar = document.getElementById('reading-progress');
  if (bar) {
    function updateProgress() {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const total    = h.scrollHeight - h.clientHeight;
      const pct      = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // -----------------------------------------------------------------------
  // Newsletter form
  // -----------------------------------------------------------------------
  const nlForm = document.getElementById('newsletter-form');
  const nlOk   = document.getElementById('newsletter-ok');
  if (nlForm && nlOk) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = nlForm.querySelector('input[type="email"]');
      if (!email || !email.value) return;
      nlForm.style.display  = 'none';
      nlOk.style.display    = 'block';
    });
  }

  // -----------------------------------------------------------------------
  // Collab / contact form
  // -----------------------------------------------------------------------
  const collabForm = document.getElementById('collab-form');
  const collabOk   = document.getElementById('collab-ok');
  if (collabForm && collabOk) {
    collabForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = collabForm.querySelector('input[type="email"]');
      const msg   = collabForm.querySelector('textarea');
      if (!email || !email.value || !msg || !msg.value) return;
      collabForm.style.display   = 'none';
      collabOk.style.display     = 'block';
    });
  }

})();
