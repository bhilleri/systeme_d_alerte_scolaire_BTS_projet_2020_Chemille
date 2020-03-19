<?php
	require_once "controleur/controleur.php";
	
	$page=new Controleur($_REQUEST);
	$page->dispatcheur();
?>


