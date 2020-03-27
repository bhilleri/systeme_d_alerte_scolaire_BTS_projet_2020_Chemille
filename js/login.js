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

$(document).ready(function(){

    $("#login").focus(),
    $("#se_connecter").click(function(){
        bouton_validé();
        
    })
    $(document).keyup(function (e){
        if(e.key==="Enter"){
            bouton_validé();
        }
    })
});



function bouton_validé()
{
    if(verification_champs()){
        validation_connection();
    }
}

function verification_champs()
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

function validation_connection()
{
    infos = {
        login: $("#login").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: 'POST',
        url: 'index.php?sous_controleur=login&option=tentative_de_connexion',
        data: JSON.stringify(infos),
        dataType:'json',
        success: function(reponse){
            resultat_connexion= autoriser(reponse);
        },
        error: function () {
            alert("Erreur serveur");
            resultat_connexion = false;
        },
    });
}

function autoriser(reponse) {
    if (reponse.aquitement == 1){
        if(redirection == "ok"){
            window.location = "index.php?option=accueil";
            return true;
        }
    }
    else{
        $("#message_d_erreur_connexion").text("Login ou mot de passe incorect");
        $("#div_message_d_erreur_connexion").css("display", "block");
        return false;
    }
        
}



/*
function initialisation(){
    $("#login").focus(),
        $("#se_connecter").click(function(){
            window.location = "index.php?sous_controleur=liste_des_alertes";
        if(validation()){
            controler_connexion();

        }
    })
}

function controler_connexion(){
    window.location = "index.php?sous_controleur=liste_des_alertes";

}
*/
/*function controler_connexion(){
    infos = {
        login: $("#login").val(),
        password: $("#password")
    };
    $.ajax({
        type: 'POST',
        url: 'index.php?login=tentative_de_connexion',
        data: JSON.stringify(infos),
        dataType:'json',
        success: function(reponse){
            resultat_cnnexion= autoriser(reponse);
        },
    })
}

function validation(){
    if($('#login').val() == ""){
        $('#login').focus();
        alert("Login non saisit");
        return false;
    } else if ($('#password').val() == ""){
        $('password').focus();
        alert("Mot de passe non saisit")
        return false;
    } else {

        return true;
    }
};

    */
