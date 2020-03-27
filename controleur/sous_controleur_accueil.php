<?php
require_once "vue/IHM_login.php";
require_once "vue/IHM_accueil.php";


class Sous_controleur_accueil
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['option']))
		{
			$this->parametres['option'] = "affichage_accueil";
		}
	}

 			
	public function dispatcheur()
	{
       

		switch ($this->parametres['option'])
			{		
			
				case "affichage_accueil" :
					$ihm = new IHM_accueil();				
					$ihm->generer_accueil("accueil");
					
				break;
				case "test":
					$ihm = new IHM_login();				
					$ihm->generer_login("login");

				break;

			}
	}
}
?>