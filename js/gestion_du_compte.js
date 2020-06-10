import {gestion_champs_input} from "./gestion_champs_input.js";

/**Variable contenant le code PIN, définis à "null" quand le code PIN n'est pas connue */
let code_PIN = null;
/**Contient le nom de la popup ouverte */
let nom_popup_ouverte = "";

/**Indique si une popup d'erreur est ouverte */
let popup_erreur_ouverte = false;

/**Nombre de charactère présent dans le code PIN*/
const NOMBRE_DE_CHARACTERE_CODE_PIN = 4;

/**Nombre de minimal de charactère requis dans le mot de passe */
const NOMBRE_MIN_DE_CHARACTERE_MOT_DE_PASSE = 8;

/**Contient les différents noms des boites de dialogues ouvrable sur la page */
const ENUMERATION_NOMS_DES_BOITES_DE_DIALOGUE = {
    dialog_modifier_code_PIN : "dialog_modifier_code_PIN",
    dialog_modifier_mot_de_passe :  "dialog_modifier_mot_de_passe",
};


/**Contient les champs permettant de modifier le code PIN*/
let champs_modifier_code_PIN = {
    password : new gestion_champs_input($("#password"),$("#message_d_erreur_password") ,$("#div_message_d_erreur_password") ),
    code1 : new gestion_champs_input($("#PIN_1"),$("#message_d_erreur_PIN_1") ,$("#div_message_d_erreur_PIN_1") ),
    code2 : new gestion_champs_input($("#PIN_2"),$("#message_d_erreur_PIN_2") ,$("#div_message_d_erreur_PIN_2") ),
};

/**Contient les champs permettant de modifier password*/
let champs_modifier_password = {
    old_password : new gestion_champs_input($("#old_password"),$("#message_d_erreur_old_password") ,$("#div_message_d_erreur_old_password") ),
    new_password1 : new gestion_champs_input($("#new_password_1"),$("#message_d_erreur_new_password_1") ,$("#div_message_d_erreur_new_password_1") ),
    new_password2 : new gestion_champs_input($("#new_password_2"),$("#message_d_erreur_new_password_2") ,$("#div_message_d_erreur_new_password_2") ),
}

/**Masque les champs d'erreur de la fenêtre popup de modifier le code PIN */
function vider_champs_erreur_modifier_code_PIN(){
    champs_modifier_code_PIN.code1.masquer_erreur();
    champs_modifier_code_PIN.code2.masquer_erreur();
    champs_modifier_code_PIN.password.masquer_erreur();
}

/**Masque les champs d'erreur de la fenêtre popup de modifier le password */
function vider_champs_erreur_modifier_password(){
    champs_modifier_password.old_password.masquer_erreur();
    champs_modifier_password.new_password1.masquer_erreur();
    champs_modifier_password.new_password2.masquer_erreur();
}

/**Vide les champs input de la fenêtre popup de modifier le code PIN */
function vider_champ_input_modifier_code_PIN(){
    champs_modifier_code_PIN.code1.vider_input("");
    champs_modifier_code_PIN.code2.vider_input("");
    champs_modifier_code_PIN.password.vider_input("");
}

/**Vide les champs input de la fenêtre popup de modifier le password */
function vider_champs_input_modifier_password(){
    champs_modifier_password.old_password.vider_input("");
    champs_modifier_password.new_password1.vider_input("");
    champs_modifier_password.new_password2.vider_input("");
}

/**Boite de dialogue permettant de modifier le code PIN */
let dialog_modifier_code_PIN = $('#dialog_modifier_code_PIN').dialog({
    dialogClass: 'dialog_modifier_code',
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: '40%',
    modal: true,
    position: {
        my: "center",
        at: "center",
        of: "body"
    },
    buttons: [
        {
            text:"Valider",         //bouton permettant de lancer la demande de changement de code PIN
              class: "Validation",
            click: function () {
                validation_modification_code_PIN();
            }
        },
        {
            text:"Annuler",
            class:"Annulation",
            click: function() {
                $(this).dialog("close");
            }
        }
    ],

    show: {
    },
    hide: {
    },
    open:function(){
        let data = $(this).data("val");
        $(this).dialog('option', 'title', data["titre"])
        $("#texte").text(data["texte"]);
        nom_popup_ouverte = ENUMERATION_NOMS_DES_BOITES_DE_DIALOGUE.dialog_modifier_code_PIN;

        //lors de la fermeture de la fenêtre les champs doivent être réinitialiser
        $('#dialog_modifier_code_PIN').on('dialogclose', function(event){
            nom_popup_ouverte = "";
            vider_champs_erreur_modifier_code_PIN();
            vider_champ_input_modifier_code_PIN();
        })

    },
});

/**Boite de dialogue permettant de modifier le mot de passe */

let dialog_modifier_mot_de_passe = $('#dialog_modifier_mot_de_passe').dialog({
    dialogClass: 'dialog_modifier_code',
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: '40%',
    modal: true,
    position: {
        my: "center",
        at: "center",
        of: "body"
    },
    buttons: [
        {
            text:"Valider",         //bouton permettant de lancer la demande de changement de mot de passe
              class: "Validation",
            click: function () {
                validation_modification_password();     //fonction chargé de changer le code mot de passe
            }
        },
        {
            text:"Annuler",
            class:"Annulation",
            click: function() {
                $(this).dialog("close");
            }
        }
    ],

    show: {
    },
    hide: {
    },
    open:function(){
        let data = $(this).data("val");
        $(this).dialog('option', 'title', data["titre"])
        $("#texte").text(data["texte"]);
        nom_popup_ouverte = ENUMERATION_NOMS_DES_BOITES_DE_DIALOGUE.dialog_modifier_mot_de_passe;
        
        //lors de la fermeture de la fenêtre les champs doivent être réinitialiser
        $('#dialog_modifier_mot_de_passe').on('dialogclose', function(event){
            nom_popup_ouverte= "";
            vider_champs_erreur_modifier_password();
            vider_champs_input_modifier_password();
        })

    },
});


/**Boite de dialogue permettant d'afficher des erreurs de communication avec le serveur */
let dialog_erreur = $('#dialog_erreur').dialog({ 
    dialogClass: 'dialog_erreur_class',
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: '30%',
    modal: true,
    position: {
        my: "center",
        at: "center",
        of: "body"
    },
    buttons: [
        {
            //bouton de validation, le seul bouton de la boite de dialogue d'érreur
            text:"Ok",
            class:"validation_message_d_erreur",
            click: function() {
                $(this).dialog("close");
            }
        }
    ],

    show: {
    },
    hide: {
    },
    open:function(){
        let data = $(this).data("val");
        $(this).dialog('option', 'title', data["titre"])
        $("#texte").text(data["texte"]);
        popup_erreur_ouverte = true;

        

        $('#dialog_erreur').on('dialogclose', function(event){
            popup_erreur_ouverte = false;
        })
    },
});


/**Permet de lancer différentes fonctions après l'ouverture de la page*/
$(document).ready(function(){

    $("#code_pin_montrer").click(function(){
        afficher_code_PIN();
    })

    $("#code_pin_modifier").click(function(){   //ouverture boite de dialogue
        dialog_modifier_code_PIN.data("val", {titre:'Modification du code PIN', texte:"Ce popup permet de modifier le code PIN"}).dialog("open");
           
    })

    $("#password_modifier").click(function(){   //ouverture boite de dialogue
        dialog_modifier_mot_de_passe.data("val", {titre:'Modification du mot de pass', texte:"Ce popup permet de modifier le mot de passe"}).dialog("open");
    })

/**Valide la boite de dialogue active quand la touche entrée a été préssé*/
    $(document).keyup(function (e){ 
        if(e.key==="Enter"){

            if(popup_erreur_ouverte == true)
            {
                dialog_erreur.dialog("close");
            }
            else
            {
                switch(nom_popup_ouverte)
                {
                    case ENUMERATION_NOMS_DES_BOITES_DE_DIALOGUE.dialog_modifier_code_PIN:
                        validation_modification_code_PIN();
                    break;

                    case ENUMERATION_NOMS_DES_BOITES_DE_DIALOGUE.dialog_modifier_mot_de_passe:
                        validation_modification_password();
                    break;
                }
            }
        }
    })
})



/** fonction chargé d'afficher ou de masquer le code PIN*/
function afficher_code_PIN(){

    //Le bouton permettant de demander la visualisation du code PIN va alterner entre Montrer et Cacher
    //On detecte la situation actuelle en lisant le bouton
    if($("#code_pin_montrer").text() == "Montrer")
    {
        //Si le bouton est sur Montrer alors le code PIn est caché
        if(code_PIN== null)
        {
            //Si la variable code_PIN est à null alors elle n'a pas été définit et il faut envoyer une requète au serveur pour l'obtenir
            $.ajax({
                type: 'POST',
                url: 'index.php?sous_controleur=gestion_du_compte&option=visualiser_le_code_PIN',
                dataType:'json',
                success: function(reponse){
                    //on place la réponse dans la varaible code PIN
                    code_PIN = reponse;

                    $("#code_PIN").text(code_PIN.code_pin);
                    $("#code_pin_montrer").text("Cacher");
                },
                error: function () {    //en Cas d'erreur dans la communication avec la serveur, un message est affiché pour indiqué l'érreur
                    dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open");
                    resultat_connexion = false;
                },
            });

        }
        else
        {
            $("#code_PIN").text(code_PIN.code_pin);
            $("#code_pin_montrer").text("Cacher");
        }


    }
    else
    {
        $("#code_PIN").text("*****");
        $("#code_pin_montrer").text("Montrer");
    }
}

/**
 * 
 * @param {gestion_champs_input} champs_password 
 */
function verifier_champs_mot_de_passe(champs_password)
{
    if(champs_password.get_input() === "")
    {
        champs_password.afficher_erreur_et_focus("Mot de passe non saisi")
        return false;
    }
    return true;
}

const EXPRESSION_REGULIRERE_VERIFICATION_CODE_PIN = /^\d{4}$/;
function verifier_champs_nouveau_code_PIN()
{
    if (EXPRESSION_REGULIRERE_VERIFICATION_CODE_PIN.test(champs_modifier_code_PIN.code1.get_input()) === false)
    {
        if(champs_modifier_code_PIN.code1.get_input() === "")
        {
            champs_modifier_code_PIN.code1.afficher_erreur_et_focus("Code PIN non saisi");
        }
        else
        {
            champs_modifier_code_PIN.code1.afficher_erreur_et_focus("Le code PIN doit avoir 4 chiffres");
        }
        

        if (!EXPRESSION_REGULIRERE_VERIFICATION_CODE_PIN.test(champs_modifier_code_PIN.code2.get_input()) && champs_modifier_code_PIN.code2.get_input() !== "")
        {
            champs_modifier_code_PIN.code2.afficher_erreur("Le code PIN doit avoir 4 chiffres")
            champs_modifier_code_PIN.code2.vider_input();
        }
        return false;
    }
    if(champs_modifier_code_PIN.code2.get_input() !== champs_modifier_code_PIN.code1.get_input())
    {
        if(champs_modifier_code_PIN.code2.get_input() === "")
        {
            champs_modifier_code_PIN.code2.afficher_erreur_et_focus("Le code PIN de vérification n'a pas été entré")
        }
        else
        {
            champs_modifier_code_PIN.code1.afficher_erreur_et_focus("Le code PIN de vérification doit être identique au nouveau code PIN")
            champs_modifier_code_PIN.code2.vider_input();
        }
        
        return false;
    }
    return true;
}
const EXPRESSION_REGULIRERE_VERIFICATION_PASSWORD = /^[\w\s]{8,}$/;
function verifier_champs_nouveau_mot_de_passe()
{
    if (!EXPRESSION_REGULIRERE_VERIFICATION_PASSWORD.test(champs_modifier_password.new_password1.get_input()))
    {
        if(champs_modifier_password.new_password1.get_input()==="")
        {
            champs_modifier_password.new_password1.afficher_erreur_et_focus("Nouveau mot de passe non saisi");
        }
        else
        {
            champs_modifier_password.new_password1.afficher_erreur_et_focus("Le mot de passe doit avoir au minimum 8 caractères");
        }


        if (!EXPRESSION_REGULIRERE_VERIFICATION_PASSWORD.test(champs_modifier_password.new_password2.get_input()) && champs_modifier_password.new_password2.get_input() !== "")
        {
            champs_modifier_password.new_password2.afficher_erreur("Le mot de passe doit avoir au minimum 8 caractères");
            champs_modifier_password.new_password2.vider_input();
        }
        return false;
    }
    if(champs_modifier_password.new_password1.get_input() !== champs_modifier_password.new_password2.get_input())
    {
        if (champs_modifier_password.new_password2.get_input()==="")
        {
            champs_modifier_password.new_password2.afficher_erreur_et_focus("Mot de passe de confirmation non saisi");
        }
        else
        {
            champs_modifier_password.new_password1.afficher_erreur_et_focus("Le mot de passe de verification doit être identique au nouveau mot de passe");
            champs_modifier_password.new_password2.vider_input();
        }

        return false;
    }
    return true
}
function validation_modification_code_PIN(){
    vider_champs_erreur_modifier_code_PIN();
    let resultat_verification = {
        code_PIN : verifier_champs_nouveau_code_PIN(),
        password : verifier_champs_mot_de_passe(champs_modifier_code_PIN.password),        
    };

    if (resultat_verification.password && resultat_verification.code_PIN)
    {
        let infos = {
            password : champs_modifier_code_PIN.password.get_input(),
            nouveau_code_PIN : champs_modifier_code_PIN.code1.get_input(),
        };
        //la requète est envoyé et on attend une réponse pour savoir si le mot de passe a bien été changé
        $.ajax({
            type: 'POST',
            url: 'index.php?sous_controleur=gestion_du_compte&option=modifier_code_PIN',
            data: JSON.stringify(infos),
            dataType:'json',
            success: function(reponse){     //en cas de reponse, la reponse est testé pour savoir si l'authentification a été accepté   
            if(reponse.resultat)
                {
                    dialog_modifier_code_PIN.dialog("close");   //si la modification réhussie, alors la boite de dialog est fermé
                    code_PIN = null;
                    
                    $("#code_PIN").text("*****");
                    $("#code_pin_montrer").text("Montrer");

                }
                else
                {
                    champs_modifier_code_PIN.password.afficher_erreur_et_focus("Mot de passe incorect")
                }
            },
            error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
                dialog_erreur.data("val", {titre:"Erreur", texte:"Le serveur ne répond pas"}).dialog("open"); 
            },
        });
    }
}



function validation_modification_password()
{
    vider_champs_erreur_modifier_password();
    let resultat_verification = {
        new_password : verifier_champs_nouveau_mot_de_passe(),
        old_password : verifier_champs_mot_de_passe(champs_modifier_password.old_password),        
    };
    if(resultat_verification.old_password && resultat_verification.new_password)
    {
        /**on renseigne dans une variable l'ancien mot de passe et le nouveau*/
        let infos = {
            old_password : champs_modifier_password.old_password.get_input(),
            new_password : champs_modifier_password.new_password1.get_input(),
        };
        //la requète est envoyé et on attend une réponse pour savoir si le mot de passe a bien été changé
        $.ajax({
            type: 'POST',
            url: 'index.php?sous_controleur=gestion_du_compte&option=modifier_mot_de_passe',
            data: JSON.stringify(infos),
            dataType:'json',
            success: function(reponse){     //en cas de reponse, la reponse est testé pour savoir si l'authentification a été accepté   
            if(reponse.resultat)
                {
                    dialog_modifier_mot_de_passe.dialog("close");
                }
                else
                {
                    champs_modifier_password.old_password.afficher_erreur_et_focus("Mot de passe incorect")
                }
            },
            error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
                dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open"); 
            },
        });
    }
}