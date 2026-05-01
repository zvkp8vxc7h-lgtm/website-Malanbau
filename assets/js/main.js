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

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── 3D CARD TILT ─────────────────────────────────────── */
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

  /* ── SERVICE MODAL ────────────────────────────────────── */
  const svcOverlay = document.getElementById('svc-modal-overlay');
  const svcClose   = document.getElementById('svc-modal-close');

  const svcData = {
    projektmanagement: {
      num: '01',
      icon: '🏗️',
      title: 'Bau-Projektmanagement',
      lead: 'Von der ersten Idee bis zur Schlüsselübergabe steuern wir Ihr Bauprojekt mit Präzision, Erfahrung und Leidenschaft.',
      items: [
        'Projektsteuerung (AHO-Projektstufen)',
        'Kosten- & Termincontrolling',
        'Qualitätsmanagement',
        'Stakeholder- & Risikomanagement',
        'Technische Due Diligence',
        'Multiprojektmanagement',
        'Bankenreporting & Monitoring',
        'Inbetriebnahmemanagement',
      ],
    },
    hochtiefbau: {
      num: '02',
      icon: '🏢',
      title: 'Hoch- & Tiefbau',
      lead: 'Schlüsselfertige Bauausführung auf höchstem Niveau — Wohnungsbau, Gewerbebau, Tiefbau und Erschließung.',
      items: [
        'Mauer- & Stahlbetonarbeiten',
        'Schlüsselfertige Gebäude',
        'Mehrfamilienhäuser & Wohnquartiere',
        'Gewerbe- & Industriebau',
        'Tiefbau & Erschließung',
        'Umbau & Revitalisierung',
        'Baulogistikkonzepte',
        'Qualitätsüberwachung (LPH 8 HOAI)',
      ],
    },
    baudienstleistungen: {
      num: '03',
      icon: '🔧',
      title: 'Baudienstleistungen',
      lead: 'Umfassende Dienstleistungen rund ums Bauen — Planung, Ausbau, Renovierung und Materialbeschaffung.',
      items: [
        'Bauplanung & Konzeptstudien',
        'Innenausbau & Renovierung',
        'Ausschreibung & Vergabe',
        'Baumaterial-Beschaffung',
        'Elektromaterial-Beschaffung',
        'Technische Gebäudebeurteilung',
        'Digitale Mängelerfassung',
        'Moderierung & Sanierung',
      ],
    },
  };

  function openSvcModal(key) {
    const d = svcData[key];
    if (!d || !svcOverlay) return;
    document.getElementById('svc-num').textContent   = d.num;
    document.getElementById('svc-icon').textContent  = d.icon;
    document.getElementById('svc-title').textContent = d.title;
    document.getElementById('svc-lead').textContent  = d.lead;
    const list = document.getElementById('svc-list');
    list.innerHTML = d.items.map(i => `<li>${i}</li>`).join('');
    svcOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSvcModal() {
    svcOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', () => openSvcModal(el.dataset.service));
  });
  if (svcClose)   svcClose.addEventListener('click', closeSvcModal);
  if (svcOverlay) svcOverlay.addEventListener('click', e => { if (e.target === svcOverlay) closeSvcModal(); });

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

})();
