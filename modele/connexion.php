<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";
class Connexion extends BDD{
    public function __construct(){
        parent::__construct();
    }

    public function verifier($nom, $mdp){
        $authentification = $this->bdd->prepare('SELECT count(*) as resultat FROM utilisateur 
        WHERE nom_utilisateur = :nom AND mdp_utilisateur = :mdp');
    $authentification->bindValue(":nom",strtolower($nom));	
    $authentification->bindValue(":mdp",$mdp);
    $authentification->execute();
    
    $resultat = $authentification->fetch(PDO::FETCH_ASSOC);
    $authentification->closeCursor();
            
    return $resultat['resultat'];

    }
}




?>