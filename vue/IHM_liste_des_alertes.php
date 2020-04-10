<?php

require_once "template3.php";

class IHM_liste_des_alertes
{ 
    private $template;

    
	public function __construct($title)
	{
		$this->template = new Template('vue');
        $this->title = $title;
        
	}

	public function generer_liste_des_alertes()
	{
		$this->template->set_filenames(array('liste_des_alertes' => 'tpl/liste_des_alertes.tpl.html'));
		$this->template->assign_vars(array(
			"TITLE" => 'Liste des alertes'
		));

		$this->template->display('liste_des_alertes');
	}
	
}
?>