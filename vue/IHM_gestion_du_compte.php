<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";
require_once "vue/IHM_fin.php";

class IHM_gestion_du_compte
{ 
	private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
        
	}
 			


	public function generer_login($title)
	{
		$fichiers_CSS = array("css/gestion_du_compte.css", "css/jquery-ui.structure.min.css", "css/jquery-ui.theme.min.css");
		
		$fichiers_JS = array( "js/jquery-ui.min.js");

		$fichier_MODULE = array("js/gestion_du_compte.js");

		$entete = new IHM_entete();

		$entete->generer_entete($title, $fichiers_CSS, $fichiers_JS, $fichier_MODULE);

		$menu = new IHM_menu();

		$menu->generer_menu();		

		$this->template->set_filenames(array('gestion_du_compte' => 'tpl/gestion_du_compte.tpl.html'));

		$this->template->display('gestion_du_compte');

		$fin = new IHM_fin();
		$fin->generer_fin();


	}
}
?>