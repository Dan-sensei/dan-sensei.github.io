var firebaseConfig = {
	apiKey: "AIzaSyCQwa2zMFrHq3MV1qFrXbZ7Q5yKoIvLK1I",
	authDomain: "winter-s-crown.firebaseapp.com",
	databaseURL: "https://winter-s-crown.firebaseio.com",
	projectId: "winter-s-crown",
	storageBucket: "winter-s-crown.appspot.com",
	messagingSenderId: "964000776884",
	appId: "1:964000776884:web:69c727e990d6c0d6088de1",
	measurementId: "G-GLFRMKYGLJ"
};

const FACTION2IMG = 
{
	"hms": "https://cdn.discordapp.com/attachments/456503841060421634/715072251195555930/Royal_Navy.png" ,
	"uss": "https://cdn.discordapp.com/attachments/456503841060421634/715072248096096276/Eagle_Union.png" ,
	"ijn": "https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png",
	"kms": "https://cdn.discordapp.com/attachments/456503841060421634/715072249803309086/Ironblood.png",
	"dgn": "https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png"
}

const localData = [["Dna","sandy","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png />","<span class='d-inline-block pl-3'>123</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/709111440665214987/719122090027909221/maxresdefault.jpg' alt ='Image_Starto'/>"],["trotugap205","washington","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/715072252928065616/Sakura_Empire.png />","<span class='d-inline-block pl-3'>225531</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/715233206772957256/719122516131577876/unknown.png' alt ='Image_Starto'/>"],["SpaceDgn","washington","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png />","<span class='d-inline-block pl-3'>0</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/714160573285138444/719616368579969024/Cubo_azur_lane.png' alt ='Image_Starto'/>"],["pedro","avrora","<img class='faction' src=https://cdn.discordapp.com/attachments/456503841060421634/719105888979255366/DGNrados.png />","<span class='d-inline-block pl-3'>1</span>","<img class='init_image' src='https://cdn.discordapp.com/attachments/710215702119841882/719122743727095839/moyi_angry.jpg' alt ='Image_Starto'/>"]];

let points = {
	"hms": 0,
	"uss": 0,
	"ijn": 0,
	"kms": 0
};

let FINALPOINTS = {
	"hms": 0,
	"uss": 0,
	"ijn": 0,
	"kms": 0
}

let table = null;
let Unison = null;

let play = true;
$( document ).ready(function() {

	Unison = document.getElementById("Unison");
	Unison.volume = 0.5;

	$('#sp').click(function(){
		play = !play;
		if(play){
			$("#presp").addClass('d-none');
			Unison.pause();
		}
		else{
			$("#presp").removeClass('d-none');
			Unison.play();
		}
		
	});

	const tilt = $('.js-tilt').tilt();

	$('#servers input').change(function() {

			
		let factions = "ff";
		if($("#amagi_c").prop("checked")) factions += "|amagi";
		if($("#avrora_c").prop("checked")) factions += "|avrora";
		if($("#lexington_c").prop("checked")) factions += "|lexington";
		if($("#sandy_c").prop("checked")) factions += "|sandy";
		if($("#washington_c").prop("checked")) factions += "|washington";

        FilterByFaction(factions);
	});
	
	initDatatbleFromServer();
});

function initDatatbleFromServer() {

	firebase.initializeApp(firebaseConfig);

	firebase.database().ref().once('value').then(function(data) {
		const d_val = data.val();
		let Output = [];
		if(d_val != null) {

			let DATA = Object.entries(data.val());
			DATA.forEach(function(e) {
				e = e[1];
				
				if(e.id) {				
					let pts_end = '-';
					if(e.pts_end){
						pts_end = e.pts_end;
					}
					

					let img_end = '-';
					if(e.image_end){
						let filename_e = e.image_end.substring(e.image_end.lastIndexOf('/')+1);
						img_end = "<img class='init_image' src='" + e.image_end + "' alt='" + filename_e + "' />"
					}
					
					let filename_s = e.image_start.substring(e.image_start.lastIndexOf('/')+1);

					let content = [
						e.username,
						"<img class='faction' src="+FACTION2IMG[e.faccion]+" />",
						"<span class='d-inline-block pl-3'>" + e.pts_start + "</span>",
						"<img class='init_image' src='" + e.image_start + "' alt ='" + filename_s + "' />",
						pts_end,
						img_end
					];
					
					if(e.pts_end) {
						FINALPOINTS[e.faccion] += e.pts_end;
					}
					else if(e.pts_start) {
						FINALPOINTS[e.faccion] += e.pts_start;
					}
					points[e.faccion]++;
					Output.push(content);
				}
			});
		}

		FINALPOINTS['uss'] = Math.round((FINALPOINTS['uss'] / 1000) * 10) / 10;
		FINALPOINTS['ijn'] = Math.round((FINALPOINTS['ijn'] / 1000) * 10) / 10;
		FINALPOINTS['hms'] = Math.round((FINALPOINTS['hms'] / 1000) * 10) / 10;
		FINALPOINTS['kms'] = Math.round((FINALPOINTS['kms'] / 1000) * 10) / 10;

		$('#uss_n').html(' ' + points['uss']);
		$('#ijn_n').html(' ' + points['ijn']);
		$('#hms_n').html(' ' + points['hms']);
		$('#kms_n').html(' ' + points['kms']);


		let k = FINALPOINTS['uss'] == 0 ? '' : 'k';
		$('#E_USS').html(' ' + FINALPOINTS['uss'] + k);
		k = FINALPOINTS['ijn'] == 0 ? '' : 'k';
		$('#E_IJN').html(' ' + FINALPOINTS['ijn'] + k);
		k = FINALPOINTS['hms'] == 0 ? '' : 'k';
		$('#E_HMS').html(' ' + FINALPOINTS['hms'] + k);
		k = FINALPOINTS['kms'] == 0 ? '' : 'k';
		$('#E_KMS').html(' ' + FINALPOINTS['kms'] + k);
		
		table = $('#nambawan').DataTable( {
			"data": Output,
			"search": { regex: true },
			"drawCallback": function( settings ) {
				var $image = $('#image');

				$('#nambawan td:nth-child(4)').viewer({
					inline: false,
					viewed: function() {
						$image.viewer('zoomTo', 1);
					},
					navbar: 0,
					toolbar: 0,
				});

				$('#nambawan td:last-child').viewer({
					inline: false,
					viewed: function() {
						$image.viewer('zoomTo', 1);
					},
					navbar: 0,
					toolbar: 0,
				});

				$('tbody tr').tilt({
					scale: 1.008,
					maxTilt: 1
				});
			
			},
			autoWidth: false,
			"columns": [
				{ "width": "20%" },
				{ "width": "10%" },
				{ "width": "20%" },
				{ "width": "10%" },
				{ "width": "15%" },
				{ "width": "10%" },
			  ],
			"language":
			{
				"sProcessing":     "Procesando...",
				"sLengthMenu":     "Mostrar _MENU_ shikikans",
				"sZeroRecords":    "Ningún shikikan a la vista",
				"sEmptyTable":     "Ningún shikikan a la vista",
				"sInfo":           "Mostrando shikikans del _START_ al _END_ de un total de _TOTAL_ shikikans",
				"sInfoEmpty":      "Mostrando shikikans del 0 al 0 de un total de 0 shikikans",
				"sInfoFiltered":   "(filtrado de un total de _MAX_ shikikans)",
				"sInfoPostFix":    "",
				"sSearch":         "Realisar buscación:",
				"sUrl":            "",
				"sInfoThousands":  ",",
				"sLoadingRecords": "Cargando...",
				"oPaginate": {
					"sFirst":    "Primero",
					"sLast":     "Último",
					"sNext":     "Siguiente",
					"sPrevious": "Anterior"
				},
				"oAria": {
					"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
					"sSortDescending": ": Activar para ordenar la columna de manera descendente"
				},
				"buttons": {
					"copy": "Copiar",
					"colvis": "Visibilidad"
				}
			}
		});
	});
}

function initDatatableFromLocal() {

	table = $('#nambawan').DataTable( {
		"data": localData,
		"search": { regex: true },
		"initComplete": function(settings, json) {
			var $image = $('#image');
			$('#nambawan td:last-child').viewer({
				inline: false,
				viewed: function() {
					$image.viewer('zoomTo', 1);
				},
				navbar: 0,
				toolbar: 0,
			});
			
		},
		"language":
		{
			"sProcessing":     "Procesando...",
			"sLengthMenu":     "Mostrar _MENU_ shikikans",
			"sZeroRecords":    "No se encontraron resultados",
			"sEmptyTable":     "Ningún dato disponible en esta tabla",
			"sInfo":           "Mostrando shikikans del _START_ al _END_ de un total de _TOTAL_ shikikans",
			"sInfoEmpty":      "Mostrando shikikans del 0 al 0 de un total de 0 shikikans",
			"sInfoFiltered":   "(filtrado de un total de _MAX_ shikikans)",
			"sInfoPostFix":    "",
			"sSearch":         "Realisar buscación:",
			"sUrl":            "",
			"sInfoThousands":  ",",
			"sLoadingRecords": "Cargando...",
			"oPaginate": {
				"sFirst":    "Primero",
				"sLast":     "Último",
				"sNext":     "Siguiente",
				"sPrevious": "Anterior"
			},
			"oAria": {
				"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
				"sSortDescending": ": Activar para ordenar la columna de manera descendente"
			},
			"buttons": {
				"copy": "Copiar",
				"colvis": "Visibilidad"
			}
		}
	});

}

function FilterByFaction(factions) {
	table
		.column( 1 )
		.search(factions, true, false)
		.draw();
}

function init() {
    for(let i = 0; i < 20; ++i){
        let x = Math.random() * 101;
        let delay = Math.random()*10;
        let size = Math. random()*20 + 20;
        let rotation = Math.random()*91;

        let div = `<div style="

        bottom: -100px;
        opacity: 0.5;
        position: fixed;
        background: #fff;
        box-shadow: 0 0 10px #fff;
        width: ` + size + `px;
        height: ` + size + `px;
        left: ` + x + `%;
        transform: rotation(` + rotation + `deg);
        animation: particle 2s ease-in ` + delay + `s infinite;
        "></div>`;
        $("body").append(div);

    }
}


