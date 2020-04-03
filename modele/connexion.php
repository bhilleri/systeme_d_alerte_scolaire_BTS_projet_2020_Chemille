<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";
class Connexion extends BDD{
    public function __construct(){
        parent::__construct();
    }



    public function verifier($nom, $password){ 

        /* $nom contient le nom d'utilisateur entré dans le champ loggin
        $password contient le mot de passe entré dans le champ password */

        $this->bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        /* La requète renvoit le mot de passe qui correspond à l'utilisateur recherché */
        $authentification = $this->bdd->prepare('SELECT mdp_utilisateur FROM utilisateur 
        WHERE nom_utilisateur = :nom ');
    $authentification->bindValue(":nom",strtolower($nom));	
    $authentification->execute();
    
    $resultat = $authentification->fetch(PDO::FETCH_ASSOC);
    $authentification->closeCursor();

    /* Dans le cas où le nom d'utilisateur est faut. Aucun mot de passe n'est retourné par la requète.
    Il faut donc s'assurer qu'un mot de passe est bien été retourné par la requète avant de la comparer avec le bon mot de passe */
    if (isset($resultat["mdp_utilisateur"]))
    {
     return password_verify($password, $resultat["mdp_utilisateur"]);
    }
    else
    {
        return false;
    }
}
}
?>