<?php
require_once "vue/IHM_gestion_du_compte.php";
require_once "vue/IHM_modifier_code_PIN.php";
require_once "modele/visualiser_le_code_PIN.php";


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
				case "modifier_code_PIN" :
					$ihm = new IHM_modifier_code_PIN();				
					$ihm->generer_modifier_code_PIN("gestion du compte");
				break;
				case "visualiser_le_code_PIN":
					$action = new visualiser_le_code_PIN();
					$reponse = $action->renvoit_code_PIN();
					echo(json_encode($reponse));
				break;	

			}

	}
}
?>