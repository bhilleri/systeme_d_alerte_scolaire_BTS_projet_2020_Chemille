/*
    .secteur_gestion_du_compte
    #code_PIN
    #code_pin_montrer
    #code_pin_modifier
    #dialog_modifier_code_PIN

    #code_PIN
*/
var code_PIN = 0;
var resultat_modification_mot_de_passe;
var nom_popup_ouverte = "";
var popup_erreur_ouverte = false;
const NOMBRE_DE_CHARACTERE_CODE_PIN = 4;
const NOMBRE_MIN_DE_CHARACTERE_MOT_DE_PASSE = 8;

$(document).ready(function(){
    $("#code_pin_montrer").click(function(){
        
        afficher_code_PIN();
    })

    $("#code_pin_modifier").click(function(){
        dialog_modifier_code_PIN.data("val", {titre:'Modification du code PIN', texte:"Ce popup permet de modifier le code PIN"}).dialog("open");
           
    })

    $("#password_modifier").click(function(){
        dialog_modifier_mot_de_passe.data("val", {titre:'Modification du mot de pass', texte:"Ce popup permet de modifier le mot de passe"}).dialog("open");
           
    })


    $(document).keyup(function (e){ //détécte si la touche entrée a été lance une action
        if(e.key==="Enter"){

            if(popup_erreur_ouverte == true)
            {
                dialog_erreur.dialog("close");
            }
            else
            {
                if(nom_popup_ouverte == "dialog_modifier_code_PIN")
                {
                    validation_modification_code_PIN(); 
                    
                }
                else
                {
                    if (nom_popup_ouverte ==  "dialog_modifier_mot_de_passe")
                    {
                        validation_modification_mot_de_passe();
                    }
                }
            }
            
        }
    })

    
    initialisation_popup();
})

//fonction charé d'afficher le code PIN
function afficher_code_PIN(){



    //Le bouton permettant de demander la visualisation du code PIN va alterner entre Montrer et Cacher
    //On detecte la situation actuelle en lisant le bouton
    if($("#code_pin_montrer").text() == "Montrer")
    {
        //Si le bouton est sur Montrer alors le code PIn est caché
        if(code_PIN== 0)
        {
            //Si la variable code_PIN est à 0 alors elle n'a pas été définit et il faut envoyer une requète au serveur pour l'obtenir
            $.ajax({
                type: 'POST',
                url: 'index.php?sous_controleur=gestion_du_compte&option=visualiser_le_code_PIN',
                dataType:'json',
                success: function(reponse){
                    //on place la réponse dans la varaible code PIN
                    code_PIN = reponse;

                    $("#code_PIN").text(code_PIN.code_pin);
                    $("#code_pin_montrer").text("Cacher");
                    //on met à true la variable code_Pin_afficher pour indiquer que le code PIN ai désormais connue
                    code_PIN_afficher = true;
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
            code_PIN_afficher = true;
        }


    }
    else
    {
        $("#code_PIN").text("*****");
        $("#code_pin_montrer").text("Montrer");
        code_PIN_afficher = false;
    }
}

//function contenant les différentes boites de dialogues ouvrable sur la page gestion du compte
function initialisation_popup(){
    dialog_modifier_code_PIN = $('#dialog_modifier_code_PIN').dialog({
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

                    validation_modification_code_PIN();     //fonction chargé de changer le code PIN

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
            nom_popup_ouverte = "dialog_modifier_code_PIN";

            //lors de la fermeture de la fenêtre les champs doivent être réinitialiser
            $('#dialog_modifier_code_PIN').on('dialogclose', function(event){
                nom_popup_ouverte = "";
                $("#div_message_d_erreur_password").css("display", "none");
                $("#div_message_d_erreur_PIN_1").css("display", "none");
                $("#div_message_d_erreur_PIN_2").css("display", "none");
                $("#PIN_2").val("");
                $("#PIN_1").val("");
                $("#password").val("");
            })

        },
    });




    dialog_modifier_mot_de_passe = $('#dialog_modifier_mot_de_passe').dialog({
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

                    validation_modification_mot_de_passe();     //fonction chargé de changer le code mot de passe

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
            nom_popup_ouverte = "dialog_modifier_mot_de_passe";
            
            //lors de la fermeture de la fenêtre les champs doivent être réinitialiser
            $('#dialog_modifier_mot_de_passe').on('dialogclose', function(event){
                $("#div_message_d_erreur_old_password").css("display", "none");
                $("#div_message_d_erreur_new_password_1").css("display", "none");
                $("#div_message_d_erreur_new_password_2").css("display", "none");
                $("#new_password_1").val("");
                $("#new_password_2").val("");
                $("#old_password").val("");
            })

        },
    });

//boite de dialogue pour gérer les erreurs
    dialog_erreur = $('#dialog_erreur').dialog({ 
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



};




/**
 * validation_modification_code_PIN est une fonction
 */
function validation_modification_code_PIN(){
    //verification du remplissage des champs
    let champs_correctement_remplit = true;
    //Retrait des précédent messages d'erreurs
    $("#div_message_d_erreur__password").css("display", "none");
    $("#div_message_d_erreur_PIN_1").css("display", "none");
    $("#div_message_d_erreur_PIN_2").css("display", "none");

    // On commance par teste les valeur du code PIN pour pouvoir mettre le focus ensuite sur le mot de passe si il n'est pas renseigné
    //la validité du mot de passe est vérifié aprés mais nécessite une réponse du serveur


    //verifie si le premier champ code PIN est complété
    if($("#PIN_1").val() == "")
    {
        champs_correctement_remplit = false;
        $("#message_d_erreur_PIN_1").text("Code PIN non saisie");
        $("#div_message_d_erreur_PIN_1").css("display", "block");
        $("#PIN_1").focus();

        //Si le premier est vide le deuxième doit être vérifié
        if($("#PIN_2").val() !== "")
        {
            //si Il est vide on ne fait rien, si il est remplit mais contient des élément non valide, il doit être éffacé
            //On vérifie si Il contient le bon nombre de charactère
            if($("#PIN_2").val().length != NOMBRE_DE_CHARACTERE_CODE_PIN)
            {
                champs_correctement_remplit = false;
                $("#message_d_erreur_PIN_2").text("Le code PIN doit comporter 4 chiffres");
                $("#div_message_d_erreur_PIN_2").css("display", "block");
                $("#PIN_2").val("");
    
            }
            else
            {
                //Si le code PIN 2 a le bon nombre de charactèren, alors il faut vérifier qu'il s'agit bien chiffre
                if(isNaN($("#PIN_2").val()))
                {
                    champs_correctement_remplit = false;
                    $("#message_d_erreur_PIN_2").text("Le code PIN ne doit comporter que des chiffres");
                    $("#div_message_d_erreur_PIN_2").css("display", "block");
                    $("#PIN_2").val("");
                }
            }
        }

    }
    else
    {
        //Si le code PIN 1 est renseigné, alors il faut vérifié qu'il contienne le bon nombre de charactère
        if($("#PIN_1").val().length != NOMBRE_DE_CHARACTERE_CODE_PIN)
        {
            champs_correctement_remplit = false;
            $("#message_d_erreur_PIN_1").text("Le code PIN doit comporter 4 chiffres");
            $("#div_message_d_erreur_PIN_1").css("display", "block");
            $("#PIN_1").val("");
            $("#PIN_2").val("");
            $("#PIN_1").focus();
        }
        else
        {
            //Si le code PIN 1 a le bon nombre de charactère, alors il faut vérifié qu'ils correspondent bien à des chiffres
            if(isNaN($("#PIN_1").val()))
            {
                champs_correctement_remplit = false;
                $("#message_d_erreur_PIN_1").text("Le code PIN ne doit comporter que des chiffres");
                $("#div_message_d_erreur_PIN_1").css("display", "block");
                $("#PIN_1").val("");
                $("#PIN_2").val("");
                $("#PIN_1").focus();
            }
            else                    
            {
                //Si le champ 1 est correct il faut vérifier le champ 2
                //On commance par vériier qu'il est bien été complété
                if($("#PIN_2").val() == "")
                {
                    champs_correctement_remplit = false;
                    $("#message_d_erreur_PIN_2").text("Code PIN de vérification non saisie");
                    $("#div_message_d_erreur_PIN_2").css("display", "block");
                    $("#PIN_2").focus();
                }
                else
                {
                    //Si il a été complété, il faut vérifié qu'il soit bien identique au code PIN 1
                    //Il est inutile de vérifier sa validité si la code PIN 2 est identique au code PIN 1 qui luis est valide
                    if($("#PIN_1").val() != $("#PIN_2").val())
                    {
                        $("#message_d_erreur_PIN_1").text("Les codes PIN entrés ne sont pas identique");
                        $("#div_message_d_erreur_PIN_1").css("display", "block");
                        champs_correctement_remplit = false;
                        $("#PIN_1").val("");
                        $("#PIN_2").val("");
                        $("#PIN_1").focus();
                    }
                }
            }                    
        }


    }
    //vérification du remplissage du mot de passe
    if($("#password").val()=="")
    {
        champs_correctement_remplit = false;
        $("#message_d_erreur_password").text("Mot de passe non saisie");
        $("#div_message_d_erreur_password").css("display", "block");
        $("#password").focus();
    }


    //si les champs sont correctement remplis alors la requète peut être envoyée
    if(champs_correctement_remplit==true)
    {
        //on renseigne dans une variable le mot de passe et le code PIN
        infos = {
            password : $("#password").val(),
            nouveau_code_PIN : $("#PIN_1").val(),
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
                    code_PIN_afficher = false;          //le mot de passe change et afin d'éviter tout problème il faut réinitialiser les variables
                    code_PIN = 0;
                    
                    $("#code_PIN").text("*****");
                    $("#code_pin_montrer").text("Montrer");

                }
                else
                {
                    //si la modification échoue, alors l'erreur mot de passe incoret s'affiche
                    $("#message_d_erreur_password").text("Mot de passe incorect");
                    $("#div_message_d_erreur_password").css("display", "block");
                    $("#password").val("");
                    $("#password").focus();
                }
            },
            error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
                dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open"); 
            },
        });
    }   
}


/*              
                $("#old_password")
                $("#new_password_1")
                $("#new_password_2")
                
                $("#div_message_d_erreur_old_password")
                $("#div_message_d_erreur_new_password_1")
                $("#div_message_d_erreur_new_password_2")

                $("message_d_erreur_old_password")
                $("message_d_erreur_new_password_1")
                $("message_d_erreur_new_password_2")


*/


function validation_modification_mot_de_passe(){
    //verification du remplissage des champs
    let champs_correctement_remplit = true;
    //Retrait des précédent messages d'erreurs
    $("#div_message_d_erreur_old_password").css("display", "none");
    $("#div_message_d_erreur_new_password_1").css("display", "none");
    $("#div_message_d_erreur_new_password_2").css("display", "none");

    // On commance par teste les valeur du code PIN pour pouvoir mettre le focus ensuite sur le mot de passe si il n'est pas renseigné
    //la validité du mot de passe est vérifié aprés mais nécessite une réponse du serveur


    //verifie si le premier champ code PIN est complété
    if($("#new_password_1").val() == "")
    {
        champs_correctement_remplit = false;
        $("#message_d_erreur_new_password_1").text("Nouveau mot de passse non saisie");
        $("#div_message_d_erreur_new_password_1").css("display", "block");
        $("#new_password_1").focus();

        //Si le premier est vide le deuxième doit être vérifié
        if($("#new_password_2").val() !== "")
        {
            //si Il est vide on ne fait rien, si il est remplit mais contient des élément non valide, il doit être éffacé
            //On vérifie si Il contient le bon nombre de charactère
            if($("#new_password_2").val().length < NOMBRE_MIN_DE_CHARACTERE_MOT_DE_PASSE)
            {
                champs_correctement_remplit = false;
                $("#message_d_erreur_new_password_2").text("Le mot de passe doit avoir au minimum 8 charactères");
                $("#div_message_d_erreur_new_password_2").css("display", "block");
                $("#new_password_2").val("");
    
            }
        }

    }
    else
    {
        //Si le code PIN 1 est renseigné, alors il faut vérifié qu'il contienne le bon nombre de charactère
        if($("#new_password_1").val().length < NOMBRE_MIN_DE_CHARACTERE_MOT_DE_PASSE)
        {
            champs_correctement_remplit = false;
            $("#message_d_erreur_new_password_1").text("Le mot de passe doit avoir au minimum 8 charactères");
            $("#div_message_d_erreur_new_password_1").css("display", "block");
            $("#new_password_1").val("");
            $("#new_password_2").val("");
            $("#new_password_1").focus();
        }
        else
        {
            //Si le champ 1 est correct il faut vérifier le champ 2
            //On commance par vériier qu'il est bien été complété
            if($("#new_password_2").val() == "")
            {
                champs_correctement_remplit = false;
                $("#message_d_erreur_new_password_2").text("Le nouveau mot de passe n'a pas été resaisi");
                $("#div_message_d_erreur_new_password_2").css("display", "block");
                $("#new_password_2").focus();
            }
            else
            {
                //Si il a été complété, il faut vérifié qu'il soit bien identique au code PIN 1
                //Il est inutile de vérifier sa validité si la code PIN 2 est identique au code PIN 1 qui luis est valide
                if($("#new_password_1").val() != $("#new_password_2").val())
                {
                    $("#message_d_erreur_new_password_1").text("Les nouveaux mots de passes entrés ne sont pas identique");
                    $("#div_message_d_erreur_new_password_1").css("display", "block");
                    champs_correctement_remplit = false;
                    $("#new_password_1").val("");
                    $("#new_password_2").val("");
                    $("#new_password_1").focus();
                }
            }                   
        }


    }
    //vérification du remplissage du mot de passe
    if($("#old_password").val()=="")
    {
        champs_correctement_remplit = false;
        $("#message_d_erreur_old_password").text("Mot de passe non saisie");
        $("#div_message_d_erreur_old_password").css("display", "block");
        $("#old_password").focus();
    }


    //si les champs sont correctement remplis alors la requète peut être envoyée
    if(champs_correctement_remplit==true)
    {
        //on renseigne dans une variable le mot de passe et le code PIN
        infos = {
            old_password : $("#old_password").val(),
            new_password : $("#new_password_1").val(),
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
                    dialog_modifier_mot_de_passe.dialog("close");   //si la modification réhussie, alors la boite de dialog est fermé

                }
                else
                {
                    //si la modification échoue, alors l'erreur mot de passe incoret s'affiche
                    $("#message_d_erreur_old_password").text("Mot de passe incorect");
                    $("#div_message_d_erreur_old_password").css("display", "block");
                    $("#old_password").val("");
                    $("#old_password").focus();
                }
            },
            error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
                dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open"); 
            },
        });
    }   
}