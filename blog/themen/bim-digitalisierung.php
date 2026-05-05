<?php
$catName       = 'BIM & Digitalisierung';
$catDesc       = 'Building Information Modeling, digitale Bauprozesse und die Zukunft der Baubranche.';
$catUrl        = 'https://www.alanbau.de/blog/themen/bim-digitalisierung.php';
$catBreadcrumb = 'BIM & Digitalisierung';
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIM &amp; Digitalisierung — Thema · ALANBAU Blog</title>
  <meta name="description" content="Building Information Modeling, digitale Bauprozesse und die Zukunft der Baubranche.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.alanbau.de/blog/themen/bim-digitalisierung.php">
  <meta property="og:type"        content="website">
  <meta property="og:title"       content="BIM &amp; Digitalisierung — Thema · ALANBAU Blog">
  <meta property="og:description" content="Building Information Modeling, digitale Bauprozesse und die Zukunft der Baubranche.">
  <meta property="og:image"       content="https://www.alanbau.de/assets/images/architectural-plans-U7EQprB_.jpeg">
  <meta property="og:url"         content="https://www.alanbau.de/blog/themen/bim-digitalisierung.php">
  <link rel="alternate" type="application/rss+xml" title="ALANBAU Blog" href="/blog/feed.xml">
  <link rel="icon" href="/assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Semi+Condensed:wght@600;700;800&display=swap">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://www.alanbau.de/" },
      { "@type": "ListItem", "position": 2, "name": "Blog",       "item": "https://www.alanbau.de/blog/" },
      { "@type": "ListItem", "position": 3, "name": <?= json_encode($catBreadcrumb) ?> }
    ]
  }
  </script>
</head>
<body>
<?php require_once dirname(__FILE__) . '/../includes/nav.php'; ?>

<section class="page-hero" aria-label="Thema Einführung">
  <div class="container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/index.html">Startseite</a>
      <span aria-hidden="true">›</span>
      <a href="/blog/">Blog</a>
      <span aria-hidden="true">›</span>
      <span aria-current="page"><?= htmlspecialchars($catBreadcrumb, ENT_QUOTES, 'UTF-8') ?></span>
    </nav>
    <p class="page-hero-label">Thema</p>
    <h1 class="page-hero-title"><?= htmlspecialchars($catName, ENT_QUOTES, 'UTF-8') ?></h1>
    <p class="page-hero-sub"><?= htmlspecialchars($catDesc, ENT_QUOTES, 'UTF-8') ?></p>
  </div>
</section>

<section class="blog-overview" aria-label="Artikel zu diesem Thema" style="background: var(--bg-alt);">
  <div class="container">
    <div class="blog-grid">
      <p class="blog-empty">Hier erscheinen bald neue Beiträge zu diesem Thema.</p>
    </div>
  </div>
</section>

<?php require_once dirname(__FILE__) . '/../includes/footer.php'; ?>
<script src="/assets/js/i18n.js"></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
