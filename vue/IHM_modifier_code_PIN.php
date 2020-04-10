<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";
require_once "vue/IHM_fin.php";

class IHM_modifier_code_PIN
{ 
	private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
        
	}
 			


	public function generer_modifier_code_PIN($title)
	{
		$fichiers_CSS = array("css/main.css", "css/modifier_code_PIN.css");
		
		$fichiers_JS = array("modifier_code_PIN.js");

		$entete = new IHM_entete();

		$entete->generer_entete($title, $fichiers_CSS, $fichiers_JS);

		$menu = new IHM_menu();

		$menu->generer_menu();		//la page de loggin ne doit afficher que le logo dans le menu

		$this->template->set_filenames(array('gestion_du_compte' => 'tpl/modifier_code_PIN.tpl.html'));

		$this->template->display('modifier_code_PIN');

		$fin = new IHM_fin();
		$fin->generer_fin();


	}
}
?>