<?php
require_once "sous_controleur_login.php";
require_once "sous_controleur_accueil.php";
require_once "sous_controleur_exercice.php";
require_once "sous_controleur_gestion_du_compte.php";
require_once "modele/session.php";
require_once "modele/mdp.php";

class Controleur
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		//new ajout_mot_de_passe(); //permet de redéfinir un mot de passe haché via le fichier /modele/mdp.php
		$this->parametres = $parametres;
		if(Session::mise_a_jour()==true)	//verification de l'authorisation de la connexion
		{
			//si personne authoriser

			if(!isset($this->parametres['sous_controleur']))	//verification de la validité du sous_controleur appelé
			{
				//si oui redirection vers la page d'accueil
				$this->parametres['sous_controleur'] = "accueil";
				$this->parametres['option']= "affichage_accueil";
			}
			else
			{
				if($this->parametres['sous_controleur'] == "login" && $this->parametres['option']!= "deconnexion")
				{
					//si l'utilisateur déjà connecté demande la page de connexion il sera redirigé vers la page d'accueil afin
					//d'éviter qu'il ne puisse se reconecter
					$this->parametres['sous_controleur'] = "accueil";
					$this->parametres['option']= "affichage_accueil";
				}					

			}
		}
		else
		{
			//si aucune session n'est ouverte, l'utilisateur n'a que le droit d'avoir accès au sous_controleur login
			//parametrage du sous_controleur pour accèder à la page de login
			$this->parametres['sous_controleur'] = "login";

			/*L'authentification dispose de 2 options accessible quand on n'est pas connecté.
			Le premier cas est une demande de connexion quand l'utilisateur appuye sur le bouton se connecter. Cette option est donc définie au moment de la requête
			L'autre possibilité est de vouloir accèder à la page de connexion
			Donc si l'option n'est pas définie sur tentative de connexion alors il s'agit d'une demande d'accès à la page de connexion.*/
			if(isset($this->parametres['option']))	
			{
				if($this->parametres['option'] != "tentative_de_connexion")
				{
					$this->parametres['option'] = "page_de_login";
				}				
			}
			else
			{
				$this->parametres['option'] = "page_de_login";
			}

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
				break;
				
			}
	}
}
?>