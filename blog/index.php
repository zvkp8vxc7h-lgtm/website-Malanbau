<?php
// blog/index.php — Blog Übersichtsseite
// PHP is used only for require_once includes — all content is static HTML.
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Bauwissen &amp; Einblicke · Alan Projektmanagement GmbH</title>
  <meta name="description" content="Fachwissen aus dem Bereich Bau-Projektmanagement, Nachhaltiges Bauen, BIM und LEAN — von Alan Projektmanagement GmbH.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.alanbau.de/blog/">
  <meta property="og:type"        content="website">
  <meta property="og:title"       content="Blog — Bauwissen &amp; Einblicke · ALANBAU">
  <meta property="og:description" content="Fachwissen aus dem Bereich Bau-Projektmanagement, Nachhaltiges Bauen, BIM und LEAN.">
  <meta property="og:image"       content="https://www.alanbau.de/assets/images/construction-workers.jpg">
  <meta property="og:url"         content="https://www.alanbau.de/blog/">
  <link rel="alternate" type="application/rss+xml" title="ALANBAU Blog" href="/blog/feed.xml">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
    {"@type":"ListItem","position":1,"name":"Startseite","item":"https://www.alanbau.de/"},
    {"@type":"ListItem","position":2,"name":"Blog"}
  ]}
  </script>
  <link rel="icon" href="/assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body>
<?php require_once dirname(__FILE__) . '/includes/nav.php'; ?>

<section class="page-hero" aria-label="Blog Einführung">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/index.html">Startseite</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page">Blog</span>
    </nav>
    <p class="page-hero-label">Alan Projektmanagement GmbH</p>
    <h1 class="page-hero-title">News &amp;<br>Einblicke</h1>
    <p class="page-hero-sub">Fachwissen, Branchentrends und Einblicke aus dem Bereich Bau-Projektmanagement und Bauwesen.</p>
  </div>
</section>

<section class="blog-overview" aria-label="Alle Artikel">
  <div class="container">
    <nav class="blog-filters" aria-label="Themen filtern">
      <a href="/blog/"                                   class="blog-filter active">Alle</a>
      <a href="/blog/themen/bau-projektmanagement.php"   class="blog-filter">Bau-Projektmanagement</a>
      <a href="/blog/themen/nachhaltigkeit.php"          class="blog-filter">Nachhaltigkeit</a>
      <a href="/blog/themen/bim-digitalisierung.php"     class="blog-filter">BIM &amp; Digitalisierung</a>
      <a href="/blog/themen/wohnungsbau.php"             class="blog-filter">Wohnungsbau</a>
      <a href="/blog/themen/lean-management.php"         class="blog-filter">LEAN Management</a>
    </nav>
    <div class="blog-grid reveal-stagger">
      <article class="blog-card reveal">
        <a href="/blog/artikel/demo-bauprojektmanagement-berlin.php" class="blog-card__img-link" tabindex="-1" aria-hidden="true">
          <img
            src="/assets/images/construction-workers.jpg"
            alt="Bauarbeiter auf einer Baustelle in Berlin"
            width="640" height="360"
            loading="lazy">
        </a>
        <div class="blog-card__body">
          <div class="blog-card__meta">
            <span class="blog-card__cat">Bau-Projektmanagement</span>
            <time class="blog-card__date" datetime="2026-05-03">3. Mai 2026</time>
          </div>
          <h2 class="blog-card__title">
            <a href="/blog/artikel/demo-bauprojektmanagement-berlin.php">
              Bau-Projektmanagement Berlin: Was macht ein guter Projektsteuerer?
            </a>
          </h2>
          <p class="blog-card__teaser">
            Erfahren Sie, welche Aufgaben ein Bau-Projektsteuerer übernimmt und warum professionelles Projektmanagement den Unterschied zwischen einem erfolgreichen und einem verzögerten Bauprojekt macht.
          </p>
          <a href="/blog/artikel/demo-bauprojektmanagement-berlin.php"
             class="blog-card__cta"
             aria-label="Weiterlesen: Bau-Projektmanagement Berlin">
            Weiterlesen &rarr;
          </a>
        </div>
      </article>
    </div>
  </div>
</section>

<?php require_once dirname(__FILE__) . '/includes/footer.php'; ?>
<script src="/assets/js/i18n.js"></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
