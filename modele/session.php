<?php
	require_once "configuration/conf.php";

class Session
{
	private static $session_lancee = false;
	private static $session_existante = false;
	private static $session_nom = "";
	private static $session_duree = "";
		
	// constructeur en privé pour empécher l'instanciation
	private function __construct(){}
		
	private static function lancer()
	{
		if(self::$session_lancee == false)
		{
			session_start();
			self::$session_lancee = true;
			if (isset($_SESSION['expire'])) 
			{
				self::$session_existante = true;
			}
		}
	}

	public static function mise_a_jour()
	{
		$resu = false;
		
		if(self::$session_lancee == false)
			self::lancer();
		
		if(self::$session_existante == true)
		{				
			if( time() - $_SESSION['debut'] < $_SESSION['expire'])
			{
				$_SESSION['debut'] = time();
				$resu = true;
			}
			else
			{
				$resu = false;
				self::detruire();
			}
		}
		
		return $resu;
	}
	
	public static function get_session_lancee()
	{
		return self::$session_lancee;
	}
	
	public static function creer()
	{
		global $config;
		
		if(self::$session_existante == true)
			self::detruire();
		
		if(self::$session_lancee == false)
			self::lancer();

		self::$session_nom = $config["NOM_SESSION"];
		self::$session_duree = $config["DUREE_SESSION"];
		if(self::$session_nom != "")
			session_name(self::$session_nom);
		$_SESSION["debut"] = time();
		$_SESSION["expire"] = (integer)self::$session_duree;
		self::$session_existante = true;
	}
		
	public static function detruire()	
	{
		$resu = false;
		
		if(self::$session_lancee == false)
			self::lancer();
		
		if(self::$session_existante == true)
		{
			$resu = true;
			session_unset();
			session_destroy();
			self::$session_lancee = false;
			self::$session_existante = false;
			self::$session_nom = "";
			self::$session_duree = "";			
		}
		
		return $resu;
	}
		
		
		
		
	public static function set_donnee($cle,$donnee)
	{
		$resu = false;
		
		if(self::$session_lancee == false)
			self::lancer();
		
		if(self::$session_existante == true)
		{		
			$resu = true;
			$_SESSION[$cle] = $donnee;
		}
		
		return $resu;
	}
		
		
	public static function get_donnee($cle)
	{
		if(self::$session_lancee == false)
			self::lancer();
		
		$resu = "";
		
		if(self::$session_existante == true)
		{
			if(isset($_SESSION[$cle]))
				$resu = $_SESSION[$cle];
		}
		
		return $resu;
	}	
}
?>