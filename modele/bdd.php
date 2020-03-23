<?php

require_once "configuration/conf.php";

class BDD{
		
    protected $bdd; 

    public function __construct(){
		
        global $config;

        $this->bdd = new PDO('mysql:host='.$config["HOTE"].';dbname='.$config["BASE_DE_DONNEES"].';charset=utf8' , $config["LOGIN"] , $config["MOT_DE_PASSE"]);
    }
}
?>	