<?php

$keyword = (string)$_GET['keyword'];

$searchResults = array();

if (empty($keyword)) {
    echo json_encode($searchResults);
    return;
}

$quranDataJson = file_get_contents(__DIR__ . '/data/quran-data.json');
$quranData     = json_decode($quranDataJson, true);

$quranTextJson = file_get_contents(__DIR__ . '/data/quran-uthmani.json');
$quranText     = json_decode($quranTextJson, true);

$quranTranslationJson = file_get_contents(__DIR__ . '/data/translation-id.json');
$quranTranslation     = json_decode($quranTranslationJson, true);

$lowerCaseKeyword = strtolower($keyword);

foreach ($quranTranslation as $row) {
    $text = strtolower($row['text']);

    if (strpos($text, $lowerCaseKeyword) !== false) {
        $searchResults[$row['_id']] = array(
            'matches' => array(
                $keyword => $keyword,
            ),
        );
    }
}

echo json_encode($searchResults);
