<?php
	$myfile = fopen("bookmarks.json", "w");
	fwrite($myfile, $_POST['trans_data']);
	fclose($myfile);
?>