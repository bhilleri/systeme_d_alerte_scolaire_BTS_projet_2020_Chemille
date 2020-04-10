<?php
require_once dirname(dirname(__FILE__))."/modele/bdd.php";
require_once "modele/bdd.php";

class visualiser_le_code_PIN extends BDD{
    public function __construct(){
        parent::__construct();
    }



    public function renvoit_code_PIN()
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
}
    ?>