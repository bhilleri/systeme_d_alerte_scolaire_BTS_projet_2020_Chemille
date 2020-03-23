<?php
require_once "vue/IHM_exercice.php";
require_once "modele/exercice.php";

class Sous_controleur_exercice
{
	private $parametres; 
	
	public function __construct($parametres)
	{
		$this->parametres = $parametres;
        if (!isset($this->parametres['option']))
        {
            $this->parametres['option']="liste_exercice";  
	    }
	}

 			
	public function dispatcheur()
	{
        switch ($this->parametres['option'])	
		{					
            case "liste_exercice": 
                $donnee = new Exercice();
                $resultat = $donnee -> Liste_exercice();
                $liste = new IHM_exercice();
                $liste -> generer_exercice("Liste des exercices",$resultat);
                break;
		}
	}
}
?>