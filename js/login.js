var infos;


function validation_connection()
{
    infos = {
        login: $("#login").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: 'POST',
        url: 'index.php?sous_controleur=login&option=login',
        data: JSON.stringify(infos),
        dataType:'json',
        success: function(reponse){
            resultat_cnnexion= autoriser(reponse);
        },
    })
}
};

/*$(document).ready(function(){
    $("#login").innerHTML = "blablabla";
    window.location = "index.php?sous_controleur=liste_des_alertes";
    //initialisation()
});*/
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
