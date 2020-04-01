var table;

$(document).ready(function () {

    table = $('#tableau_liste_exercice').DataTable({
        processing: true,
        serverSide: true,
        serverMethod: 'post',
        ajax: {
            url: 'index.php?sous_controleur=exercice&option=chargement_liste_exercice'
        },

        columns: [ 
            {
                data: 'nomExercice',
                orderable: false
			},
            {
                data: 'dateExercice',
                orderable: false
			},
			{
                data: 'heureExercice',
                orderable: false
			},
             {
                data: 'typeExercice',
                orderable: false
			},
            {
                data: 'infoExercice'
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

});
