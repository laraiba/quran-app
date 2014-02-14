<?php

include_once __DIR__ . '/../src/zendsearch/vendor/autoload.php';

$index = ZendSearch\Lucene\Lucene::create(__DIR__ . '/../src/data/index');

$quranDataJson = file_get_contents(__DIR__ . '/../src/data/quran-data.json');
$quranData     = json_decode($quranDataJson, true);

$quranTextJson = file_get_contents(__DIR__ . '/../src/data/quran-uthmani.json');
$quranText     = json_decode($quranTextJson, true);

$quranTranslationJson = file_get_contents(__DIR__ . '/../src/data/translation-id.json');
$quranTranslation     = json_decode($quranTranslationJson, true);

foreach ($quranTranslation as $ayaId => $row) {
    $doc =  new ZendSearch\Lucene\Document();
    $doc->addField(ZendSearch\Lucene\Document\Field::keyword('id', $row['_id']));
    $doc->addField(ZendSearch\Lucene\Document\Field::text('text', $row['text']));
    $doc->addField(ZendSearch\Lucene\Document\Field::keyword('suraNumber', $row['suraNumber']));
    $doc->addField(ZendSearch\Lucene\Document\Field::keyword('ayaNumber', $row['ayaNumber']));
    $index->addDocument($doc);
}

$index->optimize();
