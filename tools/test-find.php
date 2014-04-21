<?php

include_once __DIR__ . '/../src/search/vendor/autoload.php';

$index = ZendSearch\Lucene\Lucene::open(__DIR__ . '/../src/data/index');

//$hits = $index->find('tunjuk jalan lurus');
$hits = $index->find('text:(+bors~) stems:(bors~^0.1)');

foreach ($hits as $hit) {
    $doc = $hit->getDocument();
    var_dump($doc->getFieldValue('id'));
    var_dump($doc->getFieldValue('text'));
}
