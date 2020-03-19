<?php
require_once "vue/IHM_login.php";
require_once "vue/IHM_accueil.php";
require_once "vue/IHM_liste_des_alertes.php";
require_once "sous_controleur_login.php";
require_once "sous_controleur_accueil.php";

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
					$sous_controleur = new Sous_controleur_login($parametres);
					$sous_controleur->dispatcheur();
				break;

				case "liste_des_alertes":
					$ihm = new IHM_liste_des_alertes("");
					$ihm->generer_liste_des_alertes();
				break;

				case "accueil":
					$sous_controleur = new Sous_controleur_accueil($parametres);
					$sous_controleur->dispatcheur();
			}
	}
}
?>