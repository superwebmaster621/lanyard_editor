<?php
	$dir = "../img/clips";
	$arr = scandir($dir);

	echo json_encode($arr);
?>