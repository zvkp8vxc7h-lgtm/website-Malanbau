<?php
// blog/includes/footer.php
// Shared footer partial for all blog PHP pages.
// All paths are root-relative (start with /) — works from any subdirectory depth.
// NO DOCTYPE / html / head / body tags — fragment only.
?>
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/index.html" class="nav-logo" aria-label="ALANBAU Startseite">
          <img src="/assets/images/logo.png" alt="ALANBAU Logo" width="40" height="40" loading="lazy">
          <span class="nav-logo-text">ALAN<span class="red">BAU</span></span>
        </a>
        <p data-i18n="footer.tagline">Ihr Partner für Bau-Projektmanagement, Hoch- &amp; Tiefbau und Baudienstleistungen in Berlin und deutschlandweit.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/alan-consulting-bau-projektmanagement-gmbh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://www.xing.com/pages/alan-projektmanagement-gmbh/about_us" target="_blank" rel="noopener noreferrer" aria-label="XING">x</a>
        </div>
      </div>

      <div class="footer-col">
        <h5 data-i18n="footer.col.leistungen">Leistungen</h5>
        <ul>
          <li><a href="/leistungen.html#projektmanagement" data-i18n="footer.link.projektmanagement">Bau-Projektmanagement</a></li>
          <li><a href="/leistungen.html#hochtiefbau" data-i18n="footer.link.hochtiefbau">Hoch- &amp; Tiefbau</a></li>
          <li><a href="/leistungen.html#baudienstleistungen" data-i18n="footer.link.baudienstleistungen">Baudienstleistungen</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5 data-i18n="footer.col.unternehmen">Unternehmen</h5>
        <ul>
          <li><a href="/ueber-uns.html" data-i18n="footer.link.ueber-uns">Über uns</a></li>
          <li><a href="/projekte.html" data-i18n="footer.link.projekte">Projekte</a></li>
          <li><a href="/karriere.html" data-i18n="footer.link.karriere">Karriere</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5>Kontakt</h5>
        <ul>
          <li><a href="tel:+4930258141642">+49 (30) 258 141 642</a></li>
          <li><a href="mailto:info@alanprojekt.de">info@alanprojekt.de</a></li>
          <li><a href="https://maps.google.com/?q=Willy-Brandt-Platz+2,+12529+Sch%C3%B6nefeld" target="_blank" rel="noopener noreferrer">Schönefeld, Brandenburg</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h5 data-i18n="footer.col.themen">Themen &amp; Einblicke</h5>
        <ul>
          <li><a href="/blog/">Blog &amp; Einblicke</a></li>
          <li><a href="/branchen.html" data-i18n="footer.link.branchen">Branchen &amp; Märkte</a></li>
          <li><a href="/nachhaltigkeit.html" data-i18n="footer.link.nachhaltigkeit">Nachhaltigkeit</a></li>
          <li><a href="/lean.html" data-i18n="footer.link.lean">LEAN Management</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-certs" aria-label="Zertifikate und Mitgliedschaften">
      <div class="footer-cert-item">
        <img src="/assets/images/zertifikat-ihk-cottbus.png"
             alt="IHK Cottbus Mitglied"
             width="80" height="40" loading="lazy">
        <span>IHK Cottbus</span>
      </div>
      <div class="footer-cert-item">
        <img src="/assets/images/zertifikat-architektenkammer.png"
             alt="Architektenkammer Berlin"
             width="80" height="40" loading="lazy">
        <span>Architektenkammer Berlin</span>
      </div>
    </div>

    <div class="footer-bottom">
      <p data-i18n="footer.copyright">© 2025 Alan Projektmanagement GmbH · HRB 251074 B</p>
      <div class="footer-bottom-links">
        <a href="/impressum.html" data-i18n="footer.link.impressum">Impressum</a>
        <a href="/datenschutz.html" data-i18n="footer.link.datenschutz">Datenschutz</a>
        <a href="/agb.html" data-i18n="footer.link.agb">AGB</a>
      </div>
    </div>
  </div>
</footer>
