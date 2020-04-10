/*
    .secteur_gestion_du_compte
    #code_PIN
    #code_pin_montrer
    #code_pin_modifier

    #code_PIN
*/
var code_PIN;
var code_PIN_afficher = false;


$(document).ready(function(){
    $("#code_pin_montrer").click(function(){
        if(code_PIN_afficher == false)
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
                        alert("Erreur serveur");
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
            $("#code_pin_montrer").text("montrer");
            code_PIN_afficher = false;
        }
    })
})

