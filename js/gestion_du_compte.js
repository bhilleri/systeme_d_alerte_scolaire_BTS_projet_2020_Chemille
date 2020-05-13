/*
    .secteur_gestion_du_compte
    #code_PIN
    #code_pin_montrer
    #code_pin_modifier
    #dialog_modifier_code_PIN

    #code_PIN
*/
var code_PIN;


$(document).ready(function(){
    $("#code_pin_montrer").click(function(){
        
        afficher_code_PIN();
    })

    $("#code_pin_modifier").click(function(){
        dialog_modifier_code_PIN.data("val", {titre:'Modification du code PIN', texte:"Ce popup permet de modifier le code PIN"}).dialog("open");
           
    })
    initialisation_popup();
})

function afficher_code_PIN(){
    if($("#code_pin_montrer").text() == "Montrer")
    {
        if(code_PIN==null)
        {
            $.ajax({
                type: 'POST',
                url: 'index.php?sous_controleur=gestion_du_compte&option=visualiser_le_code_PIN',
                dataType:'json',
                success: function(reponse){
                    code_PIN = reponse;

                    $("#code_PIN").text(code_PIN.code_pin);
                    $("#code_pin_montrer").text("cacher");
                    code_PIN_afficher = true;
                },
                error: function () {
                    dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open");
                    resultat_connexion = false;
                },
            });

        }
        else
        {
            $("#code_PIN").text(code_PIN.code_pin);
            $("#code_pin_montrer").text("cacher");
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
				text:"Valider",
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
        },
    });


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
                text:"Ok",
                class:"validation",
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
        },
    });



};

function validation_modification_code_PIN(){
    //verification du remplissage des champs
    let champs_correctement_remplit = true;
    $("#div_message_d_erreur_ancien_password").css("display", "none");
    $("#div_message_d_erreur_PIN_1").css("display", "none");
    $("#div_message_d_erreur_PIN_2").css("display", "none");

    if($("#hold_password").val()=="")
    {
        champs_correctement_remplit = false;
        $("#message_d_erreur_ancien_password").text("Mot de passe non saisie");
        $("#div_message_d_erreur_ancien_password").css("display", "block");
    }
    else
    {
        if($("#PIN_1").val() == "")
        {
            champs_correctement_remplit = false;
            $("#message_d_erreur_PIN_1").text("Code PIN non saisie");
            $("#div_message_d_erreur_PIN_1").css("display", "block");
        }
        else
        {
            if($("#PIN_2").val() == "")
            {
                champs_correctement_remplit = false;
                $("#message_d_erreur_PIN_2").text("Code PIN de vérification non saisie");
                $("#div_message_d_erreur_PIN_2").css("display", "block");
            }
            else
            {
                if($("#PIN_1").val() != $("#PIN_2").val())
                {
                    $("#message_d_erreur_PIN_1").text("Les codes PIN entrés ne sont pas identique");
                    $("#div_message_d_erreur_PIN_1").css("display", "block");
                    champs_correctement_remplit = false;
                }
            }

        }
    }
    if(champs_correctement_remplit==true)
    {
        infos = {
            password : $("#password").val(),
            nouveau_code_PIN : $("#PIN_1").val(),
        };
        
        $.ajax({
            type: 'POST',
            url: 'index.php?sous_controleur=gestion_du_compte&option=modifier_code_PIN',
            data: JSON.stringify(infos),
            dataType:'json',
            success: function(reponse){     //en cas de reponse, la reponse est testé pour savoir si l'authentification a été accepté
                if(reponse)
                {
                    
                }
            },
            error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
                dialog_erreur.data("val", {titre:"Erreur", texte:"Ce popup affiche une érreur"}).dialog("open");
            },
        });
    }   
}