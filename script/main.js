function initMap() {
	const myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
	});

	const Estaciones = [
		[
			"Primer Estación (Plaza Moreno)",
			-34.922302402883496,
			-57.95493732361004
		],
		[
			"Segunda Estación (Estadio Atenas)",
			-34.925389445729145, 
			-57.94945585469184
		],
		[
			"Tercera Estación (Plaza San Martin)",
			-34.93175604944046,
			 -57.96808955054438
		],
		[
			"Cuarta Estación (Plaza Saavedra)",
			-34.932282008849725, 
			-57.94182764344423
		]
	]

	for (let i = 0; i < Estaciones.length; i++) {
		const Estacion = Estaciones[i];

		new google.maps.Marker({
			title: Estacion[0],
			position: { lat: Estacion[1], lng: Estacion[2] } ,
			map,
		});
	}
}

