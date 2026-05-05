/* ============================================================
   ALANBAU — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── NAVBAR SCROLL STATE ──────────────────────────────── */
  const navbar = document.getElementById('navbar');
  function updateNav() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── HAMBURGER MENU ───────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  function openMenu() {
    hamburger.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileOverlay) {
    mobileOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── SMOOTH SCROLL (anchor links) ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

  /* ── DATA-SCROLL-TO ────────────────────────────────────── */
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      if (!target) return;
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ── 3D CARD TILT ─────────────────────────────────────── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 11}deg) rotateX(${-y * 7}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ── SERVICE MODAL ────────────────────────────────────── */
  const svcOverlay = document.getElementById('svc-modal-overlay');
  const svcClose   = document.getElementById('svc-modal-close');

  const svcData = {
    projektmanagement: {
      num: '01',
      icon: '🏗️',
      titleKey: 'modal.pm.title',
      leadKey:  'modal.pm.lead',
      itemKeys: ['modal.pm.li1','modal.pm.li2','modal.pm.li3','modal.pm.li4','modal.pm.li5','modal.pm.li6','modal.pm.li7','modal.pm.li8'],
    },
    hochtiefbau: {
      num: '02',
      icon: '🏢',
      titleKey: 'modal.hoch.title',
      leadKey:  'modal.hoch.lead',
      itemKeys: ['modal.hoch.li1','modal.hoch.li2','modal.hoch.li3','modal.hoch.li4','modal.hoch.li5','modal.hoch.li6','modal.hoch.li7','modal.hoch.li8'],
    },
    baudienstleistungen: {
      num: '03',
      icon: '🔧',
      titleKey: 'modal.bau.title',
      leadKey:  'modal.bau.lead',
      itemKeys: ['modal.bau.li1','modal.bau.li2','modal.bau.li3','modal.bau.li4','modal.bau.li5','modal.bau.li6','modal.bau.li7','modal.bau.li8'],
    },
  };

  function openSvcModal(key) {
    const d = svcData[key];
    if (!d || !svcOverlay) return;
    const tFn = (window.i18n && window.i18n.t) ? k => window.i18n.t(k) || k : k => k;
    document.getElementById('svc-num').textContent   = d.num;
    document.getElementById('svc-icon').textContent  = d.icon;
    document.getElementById('svc-title').textContent = tFn(d.titleKey);
    document.getElementById('svc-lead').textContent  = tFn(d.leadKey);
    const list = document.getElementById('svc-list');
    list.innerHTML = d.itemKeys.map(k => `<li>${tFn(k)}</li>`).join('');
    const ctaEl = svcOverlay.querySelector('.svc-modal-cta');
    if (ctaEl) ctaEl.textContent = tFn('modal.cta');
    svcOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSvcModal() {
    svcOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('[data-no-modal]')) return;
      openSvcModal(el.dataset.service);
    });
  });
  if (svcClose)   svcClose.addEventListener('click', closeSvcModal);
  if (svcOverlay) svcOverlay.addEventListener('click', e => { if (e.target === svcOverlay) closeSvcModal(); });

  /* ── MODAL CTA: close + scroll ────────────────────────── */
  document.querySelectorAll('[data-close-modal-and-scroll]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      closeSvcModal();
      const target = document.getElementById(el.dataset.closeModalAndScroll);
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── LIGHTBOX ─────────────────────────────────────────── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCls = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => openLightbox(el.dataset.lightbox, el.dataset.lightboxAlt));
    el.style.cursor = 'zoom-in';
  });
  if (lightboxCls) lightboxCls.addEventListener('click', closeLightbox);
  if (lightbox)    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeSvcModal(); } });

  /* ── COOKIE BANNER ────────────────────────────────────── */
  const cookieBanner = document.getElementById('cookie-banner');
  const COOKIE_KEY   = 'alanbau_cookie_consent';

  function hideCookieBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.add('hidden');
    setTimeout(() => cookieBanner.remove(), 500);
  }

  if (cookieBanner && !localStorage.getItem(COOKIE_KEY)) {
    cookieBanner.style.display = '';
  } else if (cookieBanner) {
    cookieBanner.remove();
  }

  const cookieAccept  = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');
  if (cookieAccept)  cookieAccept.addEventListener('click',  () => { localStorage.setItem(COOKIE_KEY, 'accepted');  hideCookieBanner(); });
  if (cookieDecline) cookieDecline.addEventListener('click', () => { localStorage.setItem(COOKIE_KEY, 'declined'); hideCookieBanner(); });

  /* ── CONTACT FORM ─────────────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');
  const submitBtn  = form ? form.querySelector('.form-submit') : null;

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg)   errorMsg.style.display   = 'none';

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      /* Honeypot check */
      if (data.get('botcheck')) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-spinner">⟳</span> Wird gesendet…';
      }

      try {
        const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
        const json = await res.json();
        if (json.success) {
          form.reset();
          if (successMsg) successMsg.style.display = 'block';
        } else {
          throw new Error(json.message || 'Fehler');
        }
      } catch {
        if (errorMsg) errorMsg.style.display = 'block';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Anfrage senden →';
        }
      }
    });
  }


  /* ── PROJECT FILTER ─────────────────────────────────────── */
  const filterTabs  = document.querySelectorAll('.filter-tab');
  const filterCards = document.querySelectorAll('[data-category]');

  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const cat = tab.dataset.filter;
        filterCards.forEach(card => {
          const matches = cat === 'alle' || card.dataset.category === cat;
          matches ? card.removeAttribute('hidden') : card.setAttribute('hidden', '');
        });
      });
    });
  }

  /* ── STATS COUNTER ────────────────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = target + suffix; return; }
    const duration = 1600;
    const start    = performance.now();
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsStrip = document.getElementById('stats-strip');
  if (statsStrip) statsObserver.observe(statsStrip);

})();
