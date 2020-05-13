<?php
require_once "vue/IHM_login.php";
require_once "vue/IHM_accueil.php";
require_once "modele/connexion.php";
require_once "modele/session.php";


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
					//traduction du message json reçus depuis login.js contenant le login et le mot de passe
					$data = json_decode(file_get_contents('php://input'),true);
					$connexion = new Connexion();
					//verification de la validité du login et du mot de passe
					$resu = $connexion->verifier($data['login'],$data['password']);
					//remplissage de l'aquitement
					$res["aquitement"] = $resu;
					//renvoit de l'acquitement
					echo(json_encode($res));
					
					//Si la connexion est validé => ouverture de la session pour permettre la connexion
					if($resu==1)
					{
						Session::creer();
						Session::set_donnee("nom_utilisateur",$data['login']);
					}
					break;

					case "deconnexion":
							Session::detruire();
							//aprés la déconnexion, le site redirige vers la page de connexion
							header('Location: index.php?sous_controleur=login&option=page_de_login');
					break;
						


			}
	}
}
?>