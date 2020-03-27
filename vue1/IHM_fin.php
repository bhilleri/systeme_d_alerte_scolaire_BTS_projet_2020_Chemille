<?php
require_once "template3.php";
class IHM_fin
{
    protected $template;

	
	public function __construct()
	{
		$this->template = new Template('vue');

	}
 			
	public function generer_fin()
	{
		$this->template->set_filenames(array('fin' => 'tpl/fin.tpl.html'));
		
		$this->template->display('fin');	
	}
	public function get_template()
	{
		return $this->template;
	}
}

?>