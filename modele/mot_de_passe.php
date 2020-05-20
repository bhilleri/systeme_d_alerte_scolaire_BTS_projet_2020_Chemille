<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";
require_once "modele/connexion.php";
class Mot_de_passe extends BDD{
    public function __construct(){
        parent::__construct();
    }




    public function modifier_mot_de_passe($password, $nouveau_mot_de_passe){ 

        /* $nom contient le nom d'utilisateur entré dans le champ loggin
        $password contient le mot de passe entré dans le champ password */
        $nouveau_mot_de_passe = password_hash($nouveau_mot_de_passe, PASSWORD_DEFAULT);
        $this->bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $verification_du_mot_de_passe = new Connexion();
        if($verification_du_mot_de_passe->verifier(Session::get_donnee("nom_utilisateur"), $password))
        {
            
            $modification_code_PIN = $this->bdd->prepare('update utilisateur set mdp_utilisateur = :mot_de_passe where nom_utilisateur = :nom_utilisateur');
            $modification_code_PIN->bindValue(":mot_de_passe",$nouveau_mot_de_passe);
            $modification_code_PIN->bindValue(":nom_utilisateur",Session::get_donnee("nom_utilisateur"));		
            $modification_code_PIN->execute();
            $modification_code_PIN->closeCursor();
            return true;


        }
        else
        {
            return false;
        }
        
}
}
?>