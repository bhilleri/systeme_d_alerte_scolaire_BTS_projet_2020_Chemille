<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";
class code_PIN extends BDD{
    public function __construct(){
        parent::__construct();
    }

    public function visualiser(){
        $code_pin = $this->bdd->prepare('SELECT  as resultat FROM utilisateur 
        WHERE nom_utilisateur = :nom AND mdp_utilisateur = :mdp');
    $code_pin->bindValue(":nom",strtolower($nom));	
    $code_pin->bindValue(":mdp",$mdp);
    $code_pin->execute();
    
    $resultat = $code_pin->fetch(PDO::FETCH);
    $code_pin->closeCursor();
            
    return $resultat['resultat'];

    }
}




?>