<?php

$quranDataJson = file_get_contents(__DIR__ . '/data/quran-data.json');
$quranData     = json_decode($quranDataJson, true);

$quranTextJson = file_get_contents(__DIR__ . '/data/quran-uthmani.json');
$quranText     = json_decode($quranTextJson, true);

$quranTranslationJson = file_get_contents(__DIR__ . '/data/translation-id.json');
$quranTranslation     = json_decode($quranTranslationJson, true);

$requestedAyaId = (string)$_GET['i'];

if (empty($quranText[$requestedAyaId])) {
    // TODO
    // set status 404 not found
    return;
}

$requestedAya = $quranText[$requestedAyaId];
$requestedAyaTranslation = $quranTranslation[$requestedAyaId];

$requestedSuraData = $quranData['suras'][$requestedAya['suraNumber']-1];
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta property="og:url" content="http://la-raiba.com/verse.php?i=<?php echo htmlspecialchars($requestedAya['_id']) ?>" />
        <meta property="og:title" content="QS <?php echo htmlspecialchars($requestedSuraData['tname']) ?> ayat <?php echo htmlspecialchars($requestedAya['ayaNumber']) ?> (QS <?php echo htmlspecialchars($requestedAya['_id']) ?>)" />
        <meta property="og:image" content="http://la-raiba.com" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:description" content="<?php echo htmlspecialchars($requestedAyaTranslation['text']) ?> (QS <?php echo htmlspecialchars($requestedAya['_id']) ?>)" />
        <meta property="og:site_name" content="LaRaiba - Al Quran Digital" />
        <meta property="og:see_also" content="http://la-raiba.com" />
        <meta property="og:type" content="article" />
        <title>La Raiba - Al Quran Digital</title>
        <link rel="stylesheet" href="style/css/reset.css">
        <link rel="stylesheet" href="style/css/bootstrap.min.css">
        <link rel="stylesheet" href="style/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="style/css/style.css">
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top" id="top-navbar"><a href="/#/verse/<?php echo htmlspecialchars($requestedAya['_id']) ?>"><span class="glyphicon glyphicon-chevron-left"></span> Kembali ke <?php echo htmlspecialchars($requestedSuraData['tname'] . ' ( ' . $requestedSuraData['name'] . ' )') ?> ayat <?php echo htmlspecialchars($requestedAya['ayaNumber']) ?> (<?php echo htmlspecialchars($requestedAya['_id']) ?>)</a></div>

        <div class="content" id="quran-content">
            <ul class="quran">
                <li class="verse clearfix active">
                    <p class="arabic-text"><?php echo htmlspecialchars($requestedAya['arabicText']) ?></p>
                    <p class="translation"><span class="aya-number"><?php echo htmlspecialchars($requestedAya['ayaNumber']) ?>.</span> <span class="translation-text"><?php echo htmlspecialchars($requestedAyaTranslation['text']) ?></span></p>
                </li>
            </ul>
            <span><?php echo htmlspecialchars($requestedSuraData['tname'] . ' ( ' . $requestedSuraData['name'] . ' )') ?> ayat <?php echo htmlspecialchars($requestedAya['ayaNumber']) ?> (<?php echo htmlspecialchars($requestedAya['_id']) ?>)</span>
        </div>
        <script src="js/jquery.min.js"></script>
        <script>
            var normalizeArabicText = function(arabicText) {
                var normalized = arabicText.replace(/\u0671/g, "\u0627");
                return normalized;
            };
            
            $('.arabic-text').each(function() {
                var $this = $(this);
                $this.html(normalizeArabicText($this.html()));
            });
        </script>
    </body>
</html>

