import {gestion_champs_input} from "./gestion_champs_input.js";





let infos;
let resultat_connexion;
let redirection = "ok";


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


let champs_de_connexion = {
    login : new gestion_champs_input($("#login"),$("#message_d_erreur_login"), $("#div_message_d_erreur_login")),
    password : new gestion_champs_input($("#password"), $("#message_d_erreur_password"), $("#div_message_d_erreur_password"))
};

function vider_erreur_connexion()
{
    champs_de_connexion.login.masquer_erreur();
    champs_de_connexion.password.masquer_erreur();
}


$(document).ready(function(){               //lance l'action quand la page est chargée

    champs_de_connexion.login.focus();                 //Met le focus sur le champ login
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
    vider_erreur_connexion()
    if(champs_de_connexion.login.get_input() == ""){
        champs_de_connexion.login.afficher_erreur_et_focus("nom d'utilisateur non saisi")
        return false;
    } else if (champs_de_connexion.password.get_input() == "") {
        champs_de_connexion.password.afficher_erreur_et_focus("Mot de passe non saisie");
        return false;
    }
    return true;

    
}

function validation_connection()    //envoit de la demande d'authentification au serveur
{
    //place les informations de connexion dans une varibale
    infos = {
        login: champs_de_connexion.login.get_input(),
        password: champs_de_connexion.password.get_input(),
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
        champs_de_connexion.login.afficher_erreur_et_focus("Login ou mot de passe incorect");
        champs_de_connexion.password.vider_input();
    }
    
        
}
