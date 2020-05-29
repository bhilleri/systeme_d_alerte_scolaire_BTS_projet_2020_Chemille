Le projet consiste à réaliser un système d'alerte scolaire informatisé.
Il s'agit d'un projet réalisé dans le cadre d'un BTS Système numérique en 2 ans.

L'objectif visant à réaliser le système d'alerte a été pratiquement achevé l'année dernière.
Ainsi les fonctionnalités réalisée l'année dernière sont :
    Différents types d'alertes existent
    Déclanchement ou arrêt  d'une alerte depuis n'importe quel ordinateur de l'école
    Réception de l'alerte ou Réception de l'arrêt  par le serveur et diffusion à l'ensemble  des ordinateurs de l'école
    Affichage de l'alerte sur les ordinateurs et arrêt de l'affichage


En Janvier 2020, un deuxième groupe de 3 personnes dont je fais partie est chargé de reprendre ce projet et de le complété

Les fonctionnalités comprennent  :
    L'ajout d'un système de lancement d'exercice
    L'ajout d'un détecteur  d'incendie capable de détecter si un incendie se déclare à proximité du serveur
    L'ajout d'une interface administrateur

En dehors de la partie concernant les exercices, je dois réaliser l'ensemble de l'interface administrateur.

Les fonctionnalités que je dois mettre en place sont :
    Système d'authentification
    Configuration du mot de passe et du code PIN (code utilisé pour déclencher  les alertes)
    Possibilité de visualiser les catégories d'alertes et de les modifier
    Possibilité de visualiser les alertes précédemment déclenchées, d'en supprimer et de créer un rapport PDF.
    Possibilité d'avoir accès à la liste des ordinateurs qui se sont connecté aux réseaux et de créer un rapport des ordinateurs connues
    


Le fonctionnement du site nécessite d'avoir accès à la base de données. Pour le moment la base de donnée n'est pas divulguée sur Github


Dans le dossier configuration, il faut créer le fichier conf.php et y placer ces éléments :
<?php
$config = array(
    "HOTE" => '(adresse IP de la base de donnée)',
    "BASE_DE_DONNEES" => '(nom de la base de donnée)',
    "LOGIN" => '(nom d'utilisateur)' , 
    "MOT_DE_PASSE" => '(mot de passe)',
	"NOM_SESSION" => '(nom de la session)',
	"DUREE_SESSION" => 900,	
);
?>

Les éléments mis entre parenthèses doivent contenir les valeurs correspondant à la base de données