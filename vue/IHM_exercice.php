<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";
require_once "vue/IHM_fin.php";

class IHM_exercice
{ 
    private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
	}
 			
	public function generer_liste_exercice($title)
	{
        $fichiers_CSS = array("css\datatables.min.css","css\liste_exercice.css");
        $fichiers_JS = array("js\jquery.dataTables.min.js","js\liste_exercice.js");
        
		$entete = new IHM_entete();
        $entete->generer_entete($title,$fichiers_CSS,$fichiers_JS);
		
		$menu = new IHM_menu();
		$menu->generer_menu();
		
        
        
		$this->template->set_filenames(array('execice' => 'tpl/liste_exercice.tpl.html'));
        
		
        $this->template->display('execice');
     
		$fin = new IHM_fin();
		$fin->generer_fin();
	}
}
?>