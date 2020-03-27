<?php
require_once "sous_controleur_login.php";
require_once "sous_controleur_accueil.php";
require_once "sous_controleur_exercice.php";
require_once "sous_controleur_gestion_du_compte.php";

class Controleur
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['sous_controleur']))
		{
			$this->parametres['sous_controleur'] = "login";
		}
	}

 			
	public function dispatcheur()
	{
       

		switch ($this->parametres['sous_controleur'])
			{		
			
				case "login" :
					$sous_controleur = new Sous_controleur_login($this->parametres);
					$sous_controleur->dispatcheur();
				break;

				case "exercice": 
					$sous_controleur = new Sous_controleur_exercice($this->parametres);
					$sous_controleur -> dispatcheur();
              	break;

				case "accueil":
					$sous_controleur = new Sous_controleur_accueil($this->parametres);
					$sous_controleur->dispatcheur();
				break;

				case "gestion_du_compte":
					$sous_controleur = new Sous_controleur_gestion_de_compte($this->parametres);
					$sous_controleur->dispatcheur();
			}
	}
}
?>