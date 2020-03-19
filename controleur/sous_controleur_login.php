<?php
require_once "vue/IHM_login.php";


class Sous_controleur_login
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['option']))
			$this->parametres['option'] = "affichage_login";
	}

 			
	public function dispatcheur()
	{
       

		switch ($this->parametres['option'])
			{		
			
				case "affichage_login" :
					$ihm = new IHM_login();				
					$ihm->generer_login("login");
				
				break;

			}
	}
}
?>