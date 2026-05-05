<?php
// blog/includes/nav.php
// Shared nav partial for all blog PHP pages.
// All paths are root-relative (start with /) — works from any subdirectory depth.
// NO DOCTYPE / html / head / body tags — this is a fragment only.
?>
<!-- COOKIE BANNER -->
<div class="cookie-banner" id="cookie-banner" style="display:none" role="dialog" aria-label="Cookie-Einstellungen">
  <p class="cookie-text">
    Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
    <a href="/datenschutz.html">Datenschutzerklärung</a>.
  </p>
  <div class="cookie-actions">
    <button class="cookie-btn cookie-btn--decline" id="cookie-decline" data-i18n="cookie.decline">Ablehnen</button>
    <button class="cookie-btn cookie-btn--accept"  id="cookie-accept"  data-i18n="cookie.accept">Akzeptieren</button>
  </div>
</div>

<!-- MOBILE OVERLAY -->
<div class="nav-mobile-overlay" id="mobile-overlay" role="navigation" aria-label="Mobile Navigation">
  <button class="nav-mobile-close" id="mobile-close" aria-label="Menü schließen">&#x2715;</button>
  <a href="/leistungen.html" data-i18n="nav.leistungen">Leistungen</a>
  <a href="/projekte.html"   data-i18n="nav.projekte">Projekte</a>
  <a href="/ueber-uns.html"  data-i18n="nav.unternehmen">Unternehmen</a>
  <a href="/karriere.html"   data-i18n="nav.karriere">Karriere</a>
  <a href="/index.html#contact" data-i18n="nav.kontakt">Kontakt</a>
  <div class="lang-toggle lang-toggle--mobile" aria-label="Sprache wechseln">
    <button class="lang-btn lang-active" data-lang="de" aria-pressed="true">DE</button>
    <span class="lang-sep" aria-hidden="true">|</span>
    <button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
  </div>
</div>

<!-- NAVBAR -->
<nav id="navbar" role="navigation" aria-label="Hauptnavigation">
  <a href="/index.html" class="nav-logo" aria-label="ALANBAU — Startseite">
    <img src="/assets/images/logo.png" alt="ALANBAU Logo" width="48" height="48">
    <span class="nav-logo-text">ALAN<span class="red">BAU</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="/leistungen.html"    data-i18n="nav.leistungen">Leistungen</a></li>
    <li><a href="/projekte.html"      data-i18n="nav.projekte">Projekte</a></li>
    <li><a href="/ueber-uns.html"     data-i18n="nav.unternehmen">Unternehmen</a></li>
    <li><a href="/karriere.html"      data-i18n="nav.karriere">Karriere</a></li>
    <li><a href="/index.html#contact" data-i18n="nav.kontakt">Kontakt</a></li>
  </ul>
  <div class="nav-right">
    <div class="lang-toggle" aria-label="Sprache wechseln">
      <button class="lang-btn lang-active" data-lang="de" aria-pressed="true">DE</button>
      <span class="lang-sep" aria-hidden="true">|</span>
      <button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
    </div>
    <a href="/index.html#contact" class="btn-primary" aria-label="Projektanfrage stellen" data-i18n="nav.cta">
      Anfrage stellen &rarr;
    </a>
    <button class="nav-hamburger" id="hamburger" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-overlay">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
