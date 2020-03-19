<?php
require_once "template3.php";
class IHM_menu
{
    protected $template;

	
	public function __construct()
	{
		$this->template = new Template('vue');

	}
 			
	public function generer_menu($menu_complet = true)
	{
		$this->template->set_filenames(array('menu' => 'tpl/menu.tpl.html'));
		$this->template->assign_vars(array(
			'MENU_COMPLET' => $menu_complet
		));
		
		$this->template->display('menu');	
	}
	public function get_template()
	{
		return $this->template;
	}
}

?>