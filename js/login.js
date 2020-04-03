var infos;
var resultat_connexion;
var redirection = "ok";


/*
liste des champs de la page
    #login
    #password
    #se_connecter

    #div_message_d_erreur_login
    #message_d_erreur_login

    #div_message_d_erreur_password
    #message_d_erreur_password

    #div_message_d_erreur_connexion
    #message_d_erreur_connexion

    .div_message_d_erreur
    .message_d_erreur_connexion
*/


$(document).ready(function(){               //lance l'action quand la page est chargée

    $("#login").focus(),                    //Met le focus sur le champ login
    //lance la fonction bouton_valide quand le bouton se_connecter est cliqué ou quand la touche entrée est préssée
    $("#se_connecter").click(function(){    
        bouton_valide();
        
    })
    $(document).keyup(function (e){
        if(e.key==="Enter"){
            bouton_valide();
        }
    })
});



function bouton_valide()        //regroupe les actions liées à l'action de confirmation de la demande
{
    if(verification_champs()){      //si les champs sont correctement remplis la demande vas être envoyé au serveur
        validation_connection();
    }
}

function verification_champs()      //vérifie que les champs sont correctement remplis et indique quand il manque des informations
{
    $("#div_message_d_erreur_login").css("display", "none");
    $("#div_message_d_erreur_password").css("display", "none");
    $("#div_message_d_erreur_connexion").css("display", "none");
    if($("#login").val() == ""){
        $("#login").focus();
        $("#message_d_erreur_login").text("Nom d'utilisateur non saisie");
        $("#div_message_d_erreur_login").css("display", "block");
        return false;
    } else if ($("#password").val() == "") {
        $("#password").focus();
        $("#message_d_erreur_password").text("Mot de passe non saisie");
        $("#div_message_d_erreur_password").css("display", "block");
        return false;
    }
    return true;

}

function validation_connection()    //envoit de la demande d'authentification au serveur
{
    //place les informations de connexion dans une varibale
    infos = {
        login: $("#login").val(),
        password: $("#password").val()
    };
    //envoit de la variable contenant les informations de connexion vers le serveur
    $.ajax({
        type: 'POST',
        url: 'index.php?sous_controleur=login&option=tentative_de_connexion',
        data: JSON.stringify(infos),
        dataType:'json',
        success: function(reponse){     //en cas de reponse, la reponse est testé pour savoir si l'authentification a été accepté
            resultat_connexion= autoriser(reponse);
        },
        error: function () {        //Si aucune reponse n'est renvoyée, alors le message Erreur serveur apparait
            alert("Erreur serveur");
            resultat_connexion = false;
        },
    });
}

function autoriser(reponse) {       //verifie si l'authentification a été accepté
    if (reponse.aquitement == true){
        //si la réponse est valide, la page d'accueil vas s'afficher
        window.location = "index.php?sous_controleur=accueil";

    }
    else{
        //si la reponse ne valide pas la connexion, alors un message indiquera que le mot de passe ou le login est incorrect
        $("#message_d_erreur_connexion").text("Login ou mot de passe incorect");
        $("#div_message_d_erreur_connexion").css("display", "block");
    }
        
}
