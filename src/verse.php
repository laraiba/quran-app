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
        <title>La Raiba - Al Quran</title>
        <link rel="stylesheet" href="style/css/reset.css">
        <link rel="stylesheet" href="style/css/bootstrap.min.css">
        <link rel="stylesheet" href="style/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="style/css/style.css">
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top" id="top-navbar"><a href="/#/verse/<?php echo htmlspecialchars($requestedAya['_id']) ?>"><span class="glyphicon glyphicon-chevron-left"></span> Kembali ke Al Quran</a></div>

        <div class="content" id="quran-content">
            <ul class="quran">
                <li class="verse clearfix active">
                    <p class="arabic-text"><?php echo htmlspecialchars($requestedAya['arabicText']) ?></p>
                    <p class="translation"><span class="aya-number"><?php echo htmlspecialchars($requestedAya['ayaNumber']) ?>.</span> <span class="translation-text"><?php echo htmlspecialchars($requestedAyaTranslation['text']) ?></span></p>
                </li>
            </ul>
            <a href="/#/verse/<?php echo htmlspecialchars($requestedAya['_id']) ?>"><?php echo htmlspecialchars($requestedSuraData['tname'] . ' ( ' . $requestedSuraData['name'] . ' )') ?> ayat <?php echo htmlspecialchars($requestedAya['ayaNumber']) ?> (<?php echo htmlspecialchars($requestedAya['_id']) ?>)</a>
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
