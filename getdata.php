<?php
	$filename = "bookmarks.json";
    $json_string = file_get_contents($filename);

    echo $json_string;
?>