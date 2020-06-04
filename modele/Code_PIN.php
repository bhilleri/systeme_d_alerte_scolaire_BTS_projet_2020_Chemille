<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";
require_once "modele/connexion.php";
class code_PIN extends BDD{
    public function __construct(){
        parent::__construct();
    }

    public function visualiser_code_PIN()
    {

        $code_PIN = $this->bdd->prepare('SELECT codePin as code_pin FROM codepin');
        $code_PIN->execute();
        $resultat = $code_PIN->fetch(PDO::FETCH_ASSOC);
        $code_PIN->closeCursor();

        if(!isset($resultat))
        {
            $resultat["code_pin"] = -1;
        }

        return $resultat;
    }



    //modifier code PIN est une fonction
    /**
     * modifier code PIN est une fonction
     */
    public function modifier_code_PIN($password, $nouveau_code_PIN){ 

        /* $nom contient le nom d'utilisateur entré dans le champ loggin
        $password contient le mot de passe entré dans le champ password */
        $this->bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
        $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $verification_du_mot_de_passe = new Connexion();

        $expression_reguliere_est_un_nombre = '/^\d+$/m';

        if(preg_match_all($expression_reguliere_est_un_nombre, $nouveau_code_PIN, $buffer, PREG_SET_ORDER, 0) ===1 )
        {
            if($verification_du_mot_de_passe->verifier(Session::get_donnee("nom_utilisateur"), $password))
            {
                $modification_code_PIN = $this->bdd->prepare('update codePin set codePin = :code');
                $modification_code_PIN->bindValue(":code",$nouveau_code_PIN);	
                $modification_code_PIN->execute();
                $modification_code_PIN->closeCursor();


                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return -1;
        }
    }
}
?>