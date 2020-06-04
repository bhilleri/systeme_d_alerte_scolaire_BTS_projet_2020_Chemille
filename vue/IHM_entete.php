<?php
require_once "template3.php";
class IHM_entete
{
    protected $template;

	
	public function __construct()
	{
		$this->template = new Template('vue');

	}
 			
	public function generer_entete($titre, $CSS=[],$JS=[], $MODULE=[] )
	{
		$this->template->set_filenames(array('entete' => 'tpl/entete.tpl.html'));
		$this->template->assign_var('TITRE',$titre);		
		
		foreach($CSS as $infos)
		{ 	 	
			$this->template->assign_block_vars('css', array('FICHIER' => $infos));
		}	
		
		foreach($JS as $infos)
		{ 	 	
			$this->template->assign_block_vars('js', array('FICHIER' => $infos));
		}
		
		foreach($MODULE as $infos)
		{ 	 	
			$this->template->assign_block_vars('module', array('FICHIER' => $infos));
		}	
		
		
		$this->template->display('entete');	
	}
	public function get_template()
	{
		return $this->template;
	}
}

?>