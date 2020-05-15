<?php
require_once "vue/IHM_gestion_du_compte.php";
require_once "modele/Code_PIN.php";


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
					$data = json_decode(file_get_contents('php://input'),true);
					$action = new Code_PIN();
					$reponse["resultat"] = $action->modifier($data['password'], $data['nouveau_code_PIN']);
					echo(json_encode($reponse));
				break;
				case "visualiser_le_code_PIN":
					$action = new Code_PIN();
					$reponse = $action->visualiser_code_PIN();
					echo(json_encode($reponse));
				break;	

			}

	}
}
?>