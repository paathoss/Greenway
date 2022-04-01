var punto = document.getElementsByClassName('.gm-style img')
var ubicacion = document.getElementById('ubicacion')

var cargarPagina = (id) => {
	document.getElementById("homePage").style.display = "none"
	document.getElementById("estacionesPage").style.display = "none"
	document.getElementById("guiaPage").style.display = "none"
	document.getElementById("aboutPage").style.display = "none"
	document.getElementById("contactPage").style.display = "none"
	document.getElementById(id).style.display = "block"
}
cargarPagina("contactPage")


var app = new Vue({
	el: '#app',
	data: {
		estaciones: {
			paradas: [],
			paradasActivas: [],
			paradasActivasInfo: [],
			coordenadas: []
		},
		map: {
			mapita: [],
			puntos: []
		},
		ubicacionActual: [],
	}
});



function initMap() {
	var myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
		disableDefaultUI: true,
		streetViewControl: true,
	});

	app.map.mapita = map;

	const Estaciones = [
		[
			"Plaza Moreno",
			-34.922302402883496,
			-57.95493732361004,
			"Información basica de la parada 1"
		],
		[
			"Estado Atenea",
			-34.925389445729145,
			-57.94945585469184,
			"Información basica de la parada 2"
		],
		[
			"Parque San Martín",
			-34.93175604944046,
			-57.96808955054438,
			"Información basica de la parada 3"
		],
		[
			"Parque Saavedra",
			-34.932282008849725,
			-57.94182764344423,
			"Información basica de la parada 4"
		]
	]

	for (let i = 0; i < Estaciones.length; i++) {
		const Estacion = Estaciones[i];

		var puntos = new google.maps.Marker({
			title: Estacion[0],
			position: { lat: Estacion[1], lng: Estacion[2] },
			info: Estacion[3],
			map,
		})

	var puntos2 = new google.maps.Marker({
			title: 'title',
			position: { lat: 123, lng: 321 },
			info: 'info',
			map,
		})

		app.map.puntos = puntos2;

		const puntosTitle = puntos.title;
		const puntosInfo = puntos.info;
		const puntosPosition = puntos.position;

		puntos.addListener("click", () => {
			map.setZoom(15);
			map.setCenter(puntosPosition);
			map.panTo(puntosPosition)
		});
		console.log(puntos)

		puntos.addListener("click", show);

		function show() {
			document.getElementById('sidebar').classList.toggle('active');
			var blur = document.getElementById("blur");

			blur.style.display = 'block';
			blur.classList.add('blureado');
			blur.style.zIndex = 1200;

			var paradaActiva = [];
			var paradaActivaInfo = [];

			for (let u = 0; u < Estaciones.length; u++) {
				if (Estaciones[u][0] === puntosTitle) {
					paradaActiva.push(puntosTitle)
					paradaActivaInfo.push(puntosInfo)
				}
			}
			app.estaciones.paradasActivas = paradaActiva;
			app.estaciones.paradasActivasInfo = paradaActivaInfo;
		};
	}
	app.estaciones.paradas = Estaciones;
}

function currentPosition() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.")
	}
}



function showPosition(position) {
	var ubicacionActual = [];
	var mapaActual = app.map.mapita;
	var puntoActual = app.map.puntos

	for (let q = 0; q < 1; q++) {
		ubicacionActual.push({ lat: position.coords.latitude, lng: position.coords.longitude })
	}
	app.ubicacionActual = ubicacionActual;

	mapaActual.setCenter(app.ubicacionActual[0])
	mapaActual.setZoom(17)
	puntoActual.setPosition({ lat: app.ubicacionActual[0].lat, lng: app.ubicacionActual[0].lng })
	puntoActual.setTitle("apa")


	document.getElementById('comoLlegar').innerHTML = '';
}


function shownt() {
	var toggle = document.getElementById('sidebar')
	var blur = document.getElementById("blur");

	toggle.classList.toggle('active');
	blur.style.display = "none";
}