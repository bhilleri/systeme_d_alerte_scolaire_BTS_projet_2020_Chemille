<?php
include "configuration/conf.php";
//require_once dirname(dirname(__FILE__))."\modele\bdd.php";
require_once "modele/bdd.php";

class Chargement_liste_categorie_d_alerte extends BDD{
	
	public function __construct(){
		
		parent::__construct();
		
	}
	

	public function chargement_liste($donnee){

	## Lecture des données
	$draw = $donnee['draw'];
	$ligne = $donnee['start'];
	$ligneParPage = $donnee['length']; // Nombre de ligne par page
	$indexColonne = $donnee['order'][0]['column']; // Index de la colonne
	$nomColonne = $donnee['columns'][$indexColonne]['data']; // Nom de la colonne
	$ordreTriColonne = $donnee['order'][0]['dir']; // ASC ou DESC (requete sql)
	$valeurRecherchee = $donnee['search']['value']; // Valeur recherchée

	## Total des données	
	$requete = $this->bdd->prepare("SELECT COUNT(*) AS nombre FROM alerte");
	$requete->execute();
	$enregistrement = $requete->fetch();
	$totalEnregistrement = $enregistrement['nombre'];
		

	if($valeurRecherchee == ''){
		## Total des données sans filtre
		$totalRecordwithFilter = $totalEnregistrement;
		
		## Si tout afficher sur une page
		if($ligneParPage == -1)
			$ligneParPage = $totalEnregistrement;

		## Récupérartion des données
		$requete = $this->bdd->prepare("SELECT 
		nomAlerte, couleurAlerte 
		FROM alerte ORDER BY ".$nomColonne." ".$ordreTriColonne." LIMIT :debut,:offset");
		$requete->bindValue(':debut', $ligne, PDO::PARAM_INT);
		$requete->bindValue(':offset', $ligneParPage, PDO::PARAM_INT);
		$requete->execute();
		$resultatRecherche = $requete->fetchAll();
	}	
	else {
		## Total des données avec filtre
		$requete = $this->bdd->prepare("SELECT COUNT(*) AS nombre FROM alerte 
		WHERE nomAlerte LIKE :valeur");
		$requete->bindValue(':valeur', "%$valeurRecherchee%");
		$requete->execute();
		$enregistrement = $requete->fetch();
		$totalRecordwithFilter = $enregistrement['nombre'];
		
		## Si tout afficher sur une page
		if($ligneParPage == -1)
			$ligneParPage = $totalEnregistrement;
		
		## Récupérartion des données
		$requete = $this->bdd->prepare("SELECT nomAlerte, couleurAlerte FROM alerte WHERE nomAlerte LIKE :valeur
		ORDER BY ".$nomColonne." ".$ordreTriColonne." LIMIT :debut,:offset");
		$requete->bindValue(':valeur', "%$valeurRecherchee%");
		$requete->bindValue(':debut', $ligne, PDO::PARAM_INT);
		$requete->bindValue(':offset', $ligneParPage, PDO::PARAM_INT);
		$requete->execute();
		$resultatRecherche = $requete->fetchAll();
		
	}
		
	$data = array();

	foreach($resultatRecherche as $ligne){
	   $data[] = array(
		  "nomAlerte"=>$ligne['nomAlerte'],
           "couleurAlerte"=>$ligne['couleurAlerte']
           
	   );
	}

	## Réponse
	$response = array(
	   	"draw" => $draw,
	   	"iTotalRecords" => $totalEnregistrement,
	   	"iTotalDisplayRecords" => $totalRecordwithFilter,
	   	"aaData" => $data
	);

	echo json_encode($response);


  }     
    
}
    


?>