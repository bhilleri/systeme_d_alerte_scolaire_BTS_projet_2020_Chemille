<?php

require_once "template3.php";

class IHM_accueil
{ 
    private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
        
	}
 			
	public function generer_accueil($title)
	{
		
		$fichiers_CSS = array("css\main.css");		//fichiers css liés à la page
		
		$fichiers_JS = array("");					//fichier Java Script liés 

		$entete = new IHM_entete($this->template);

		$entete->generer_entete($title, $fichiers_CSS, $fichiers_JS);

		$menu = new IHM_menu;

		$menu->generer_menu(true);		//la page d'accueil doit afficher l'ensemble du menu


		$this->template->set_filenames(array('accueil' => 'tpl/accueil.tpl.html'));
        
        $this->template->display('accueil');
	}
	
}
?>