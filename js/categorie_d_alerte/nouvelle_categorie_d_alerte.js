import {gestion_champs_input} from "./gestion_champs_input.js.js.js";

/**Contient et ajoute une catégorie d'alerte en cours d'ajout */
class Nouvelle_categorie_d_alerte
{
    /**Nom qui sera ajouté à la base de données */
    nom_alerte = new gestion_champs_input(chams_input,error ,div_error);
    /**Couleur qui sera par la suite affiché au déclanchement de l'alerte*/
    couleur_alerte;
    /**Référence utilisé pour identifier la catégorie d'alerte*/
    reference_categorie;

    /**Permet de verifier que les champs ont été correctement remplis */
    verifier_champs();
    /**Envois de la requête au serveur et reception de la réponse */
    ajout_de_l_alerte();
}