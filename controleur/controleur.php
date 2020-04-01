<?php
require_once "sous_controleur_login.php";
require_once "sous_controleur_accueil.php";
require_once "sous_controleur_exercice.php";
require_once "sous_controleur_gestion_du_compte.php";
require_once "modele/session.php";

class Controleur
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if(Session::mise_a_jour()==true)
		{
			if(!isset($this->parametres['sous_controleur']))
			{
				$this->parametres['sous_controleur'] = "accueil";
				$this->parametres['option']= "affichage_accueil";
			}
			else
			{
				if(!isset($this->parametres["sous_controleur"]))
				{
					$this->parametres['sous_controleur'] = "accueil";
					$this->parametres['option']= "affichage_accueil";
				}
				else
				{
					if($this->parametres['sous_controleur'] == "login" && $this->parametres['option']!= "deconnexion")
					{
						$this->parametres['sous_controleur'] = "accueil";
						$this->parametres['option']= "affichage_accueil";
					}					
				}

			}
		}
		else
		{
			$this->parametres['sous_controleur'] = "login";
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