<?php

require_once "template3.php";
require_once "vue/IHM_entete.php";
require_once "vue/IHM_menu.php";

class IHM_exercice
{ 
    private $template;
    
	public function __construct()
	{
		$this->template = new Template('vue');
	}
 			
	public function generer_exercice($title,$exercices)
	{
        $fichiers_CSS = array("css/main.css");
        $fichiers_JS = array();
        
		$entete = new IHM_entete();
        $entete->generer_entete($title,$fichiers_CSS,$fichiers_JS);
		
		$menu = new IHM_menu();
		$menu->generer_menu();
		
        
        
		$this->template->set_filenames(array('execice' => 'tpl/liste_exercice.tpl.html'));
        
		$this->template->assign_vars(array(
            "EXERCICE" => $exercices,
        ));	
        
        $this->template->display('execice');
     
        
	}
}
?>
