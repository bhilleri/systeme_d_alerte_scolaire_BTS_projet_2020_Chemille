<?php

//require_once dirname(dirname(__FILE__))."\modele\bdd.php";
require_once "modele/bdd.php";

class Exercice extends BDD{
	
	public function __construct(){
		
		parent::__construct();
		
	}
	

	public function Liste_exercice(){
		// FIXME: Remplacer avec mes donnees
		$donnees = $this->bdd->prepare('SELECT nomExercice FROM exercice' );	
		$donnees->execute();
		
		$resultat = $donnees->fetch(PDO::FETCH_ASSOC);
		$donnees->closeCursor();
				
		return $resultat['nomExercice'];
	}
}




?>