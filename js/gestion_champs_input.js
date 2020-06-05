/**Regroupe les champs permettant de rentrer une donnée. Elle regroupe ainsi l'input, le paragraphe d'erreur et le div contenant l'erreur.*/
export class gestion_champs_input
{
    input;
    texte_erreur;
    div_erreur;
    constructor(champ_input, champ_texte_erreur, champ_div_erreur)
    {
        this.input = champ_input;
        this.texte_erreur = champ_texte_erreur;
        this.div_erreur = champ_div_erreur;
    }
    /**
     * renvoit la chained de charactère contenue dans l'input
     * @return {string} la chaine contenue dans l'input
     */
    get_input()
    {
        return this.input.val();
    }

    /**
     * vide l'input pour permettre à l'utilisateur de rentrer à nouveau des données
     */
    vider_input()
    {
        this.input.val("");
    }

    /**
     * Affiche une erreur avec un texte prédéfinie
     * @param {string} texte - texte expliquant l'erreur
     */
    afficher_erreur(texte)
    {
        this.texte_erreur.text(texte);
        this.div_erreur.css("display", "block");
    }
    
    /**
     * Affiche une erreur en mettant le focus sur l'input qui pose problème
     * @param {string} texte - texte expliquant l'erreur 
     */
    afficher_erreur_et_focus(texte)
    {
        this.afficher_erreur(texte);
        this.vider_input();
        this.input.focus();
    }

    /**
     * Masque l'erreur et efface le texte contenu dans l'erreur
     */
    masquer_erreur()
    {
        this.texte_erreur.text("");
        this.div_erreur.css("display", "none");
    }

    focus()
    {
        this.input.focus();
    }
};