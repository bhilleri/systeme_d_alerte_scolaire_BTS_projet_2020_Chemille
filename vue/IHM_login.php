<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";
require_once "vue/IHM_fin.php";

class IHM_login
{ 
	private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
        
	}
 			


	public function generer_login($title)
	{
		$fichiers_CSS = array("css/login.css", "css/main.css");
		
		$fichiers_JS = array("js/login.js");

		$entete = new IHM_entete();

		$entete->generer_entete($title, $fichiers_CSS, $fichiers_JS);

		$menu = new IHM_menu();

		$menu->generer_menu(false);		//la page de loggin ne doit afficher que le logo dans le menu

		$this->template->set_filenames(array('login' => 'tpl/login.tpl.html'));

		$this->template->display('login');

		$fin = new IHM_fin();
		$fin->generer_fin();


	}
}
?>