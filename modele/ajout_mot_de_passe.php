<?php
require_once "modele/bdd.php";
class ajout_mot_de_passe extends BDD{
    public function __construct(){
        parent::__construct();
        $identifiant = 'administrateur';
        $mdp = password_hash('mot de passe',PASSWORD_DEFAULT);
        $this->bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $ajout = $this->bdd->prepare("INSERT INTO utilisateur (nom_utilisateur,mdp_utilisateur) VALUES(:identifiant,:mdp)");

        $ajout->bindValue(":identifiant",strtolower($identifiant));
        $ajout->bindValue(":mdp",$mdp);	
        
        $ajout->execute();
            
        $ajout->closeCursor();
    }
}

?>