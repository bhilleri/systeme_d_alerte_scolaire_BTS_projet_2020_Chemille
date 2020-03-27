<?php
require_once "vue/IHM_login.php";
require_once "vue/IHM_accueil.php";
require_once "modele/connexion.php";


class Sous_controleur_login
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['option']))
			$this->parametres['option'] = "page_de_login";
	}

 			
	public function dispatcheur()
	{
       

		switch ($this->parametres['option'])
			{		
			
				case "page_de_login" :
					$ihm = new IHM_login();				
					$ihm->generer_login("login");
				
				break;
				
				case "tentative_de_connexion" :
					$data = json_decode(file_get_contents('php://input'),true);
					$connexion = new Connexion();
					$resu = $connexion->verifier($data['login'],$data['password']);
					$res["aquitement"] = $resu;
					echo(json_encode($res));
					break;


			}
	}
}
?>