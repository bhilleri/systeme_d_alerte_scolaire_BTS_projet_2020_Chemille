<?php

require_once dirname(dirname(__FILE__))."/modele/bdd.php";
//require_once "modele/bdd.php";

class DonneesEssai extends BDD{
	
	public function __construct(){
		
		parent::__construct();
		
	}
	

	public function info(){
		
		$authentification = $this->bdd->prepare('SELECT data FROM info WHERE id_info= :num');
		$authentification->bindValue(":num",1);	
		$authentification->execute();
		
		$resultat = $authentification->fetch(PDO::FETCH_ASSOC);
		$authentification->closeCursor();
				
		return $resultat['data'];
	}
}
?>