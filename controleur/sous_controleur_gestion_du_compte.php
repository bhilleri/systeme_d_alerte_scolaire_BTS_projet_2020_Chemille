<?php
require_once "vue/IHM_gestion_du_compte.php";
require_once "vue/IHM_accueil.php";
require_once "modele/connexion.php";


class Sous_controleur_gestion_de_compte
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['option']))
			$this->parametres['option'] = "information_general";
	}

 			
	public function dispatcheur()
	{
       

		switch ($this->parametres['option'])
			{		
			
				case "information_general" :
					$ihm = new IHM_gestion_du_compte();				
					$ihm->generer_login("gestion du compte");
				
				break;

			}
	}
}
?>