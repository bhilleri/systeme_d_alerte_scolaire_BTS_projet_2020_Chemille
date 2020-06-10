
let popup_erreur_ouverte = false;

$(document).ready(function(){

        $("#ajouter_categorie_d_alerte").click(function(){   //ouverture boite de dialogue
            dialog_ajouter_une_categorie_d_alerte.data("val", {titre:"Ajout d'une nouvelle catégorie d'alerte", texte:"Ce popup permet d'ajouter une categorie d'alerte"}).dialog("open");
        })
});


let table = $('#tableau_liste_categorie_d_alerte').DataTable({
    processing: true,
    serverSide: true,
    serverMethod: 'post',
    ajax: {
        url: 'index.php?sous_controleur=categorie_d_alerte&option=chargement_liste_categorie_d_alerte'
    },

    columns: [ 
        {
            data: 'nomAlerte',
            orderable: false
        },
        {
            data: 'couleurAlerte',
            orderable: false
        },
      ],


    language: {
        url: './configuration/fr_FR.json',
    },



   // paging: false,
   // info: false,
   // searching: false,
   // ordering: false,

    lengthMenu : [[5, 10, 15, 20, 25, 30,-1], [5, 10, 15, 20, 25, 30, "Tout"]],

    //displayLength : 5,

});




$(document).ready(function () {

});


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

let dialog_ajouter_une_categorie_d_alerte = $('#dialog_ajouter_categorie_d_alerte').dialog({ 
    dialogClass: 'dialog_modfier_datatable',
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