<?php
require_once "vue/IHM_categorie_d_alerte.php";
require_once "modele/chargement_liste_categorie_d_alerte.php";



class Sous_controleur_categorie_d_alerte
{
	private $parametres;
	
	public function __construct(&$parametres)
	{
		$this->parametres = $parametres;
		if (!isset($this->parametres['option']))
			$this->parametres['option'] = "liste_des_categories_d_alerte";
	}

 			
	public function dispatcheur()
	{

		switch ($this->parametres['option'])
			{		
			
				case "liste_des_categories_d_alerte" :
					$ihm = new IHM_categorie_d_alerte();				
					$ihm->generer_categorie_d_alerte("categorie d'alerte");
				
				break;

				case "chargement_liste_categorie_d_alerte" :
					$action = new Chargement_liste_categorie_d_alerte();
					
					$action->chargement_liste($this->parametres);
				break;
					

			}

	}
}
?>