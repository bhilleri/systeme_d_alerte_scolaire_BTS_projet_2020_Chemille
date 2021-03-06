<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";
require_once "vue/IHM_fin.php";

class IHM_categorie_d_alerte
{ 
	private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
        
	}
 			


	public function generer_categorie_d_alerte($title)
	{
		$fichiers_CSS = array("css/datatables.min.css", "css/liste_categorie_d_alerte.css", "css/jquery-ui.structure.min.css", "css/jquery-ui.theme.min.css");
		
		$fichiers_JS = array("js/jquery-ui.min.js","js/jquery.dataTables.min.js", "js/categorie_d_alerte/categorie_d_alerte.js");

		$entete = new IHM_entete();

		$entete->generer_entete($title, $fichiers_CSS, $fichiers_JS);

		$menu = new IHM_menu();

		$menu->generer_menu();

		$this->template->set_filenames(array('categorie_d_alerte' => 'tpl/categorie_d_alerte.tpl.html'));

		$this->template->display('categorie_d_alerte');

		$fin = new IHM_fin();
		$fin->generer_fin();


	}
}
?>