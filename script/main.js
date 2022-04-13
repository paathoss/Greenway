var punto = document.getElementsByClassName('.gm-style img')
var ubicacion = document.getElementById('ubicacion')

var cargarPagina = (id) => {
    document.getElementById("menuPage").style.display = "none"
    document.getElementById("homePage").style.display = "none"
    document.getElementById("estacionesPage").style.display = "none"
    document.getElementById("guiaPage").style.display = "none"
    document.getElementById("aboutPage").style.display = "none"
    document.getElementById("contactPage").style.display = "none"
    document.getElementById("premiosPage").style.display = "none"

    document.getElementById(id).style.display = "contents"
}
cargarPagina("menuPage")


//////////Loader
// var preloader = document.getElementById("page-splash")
// setTimeout(function() {
//     preloader.style.display = "none"
// }, 1000);
////////////////

var app = new Vue({
	el: '#app',
	data: {
		estaciones: {
			paradas: [],
			paradasActivasNombre: [],
			paradasActivasInfo: [],
			paradasActivasCoords: [],
			coordenadas: [],
			destinoActual: []
		},
		map: {
			mapita: [],
			puntos: []
		},
		ubicacionActual: [],
	}
});


function initMap() {
	const directionsService = new google.maps.DirectionsService();
	const directionsRenderer = new google.maps.DirectionsRenderer();
	var myLatLng = { lat: -34.921719670338945, lng: -57.95368585242721 };
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 14,
		center: myLatLng,
		disableDefaultUI: true,
		streetViewControl: true,
	});
	directionsRenderer.setMap(map);

	/* const onChangeHandler = function () {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
		console.log("ASFASOB")
	};

	document.getElementById("start").addEventListener("click", onChangeHandler);
	document.getElementById("end").addEventListener("click", onChangeHandler); */

	app.map.mapita = map;

	const Estaciones = [
		[
			"Plaza Moreno",
			-34.922302402883496,
			-57.95493732361004,
			"Información basica de la parada 1",
			"32HW+32G La Plata, Provincia de Buenos Aires, Argentina"
		],
		[
			"Estado Atenea",
			-34.925389445729145,
			-57.94945585469184,
			"Información basica de la parada 2",
			"33F2+R6V La Plata, Provincia de Buenos Aires, Argentina"
		],
		[
			"Parque San Martín",
			-34.93175604944046,
			-57.96808955054438,
			"Información basica de la parada 3",
			"329J+7QV La Plata, Provincia de Buenos Aires, Argentina"
		],
		[
			"Parque Saavedra",
			-34.932282008849725,
			-57.94182764344423,
			"Información basica de la parada 4",
			"3395+37M La Plata, Provincia de Buenos Aires, Argentina"
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

		puntos.addListener("click", show);

		function show() {
			document.getElementById('sidebar').classList.toggle('active');
			var blur = document.getElementById("blur");

			blur.style.display = 'block';
			blur.classList.add('blureado');
			blur.style.zIndex = 1200;


			var paradaActivaNombre = [];
			var paradaActivaInfo = [];
			var paradasActivasCoords = [];

			for (let u = 0; u < Estaciones.length; u++) {
				if (Estaciones[u][0] === puntosTitle) {
					paradaActivaNombre.push(puntosTitle)
					paradaActivaInfo.push(puntosInfo)
					paradasActivasCoords.push(Estaciones[u][4])
				}
			}
			app.estaciones.paradasActivasNombre = paradaActivaNombre;
			app.estaciones.paradasActivasInfo = paradaActivaInfo;
			app.estaciones.paradasActivasCoords = paradasActivasCoords;



			var destinoActual = [];
			if (navigator.geolocation) {
				destinoActual.push(app.estaciones.paradasActivasCoords[0])	
				app.estaciones.destinoActual = destinoActual
				calculateAndDisplayRoute(directionsService, directionsRenderer)
			}
			
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
	document.getElementById('sidebar').classList.toggle('active');
	var blur = document.getElementById("blur");

	blur.style.display = 'block';
	blur.classList.add('blureado');
	blur.style.zIndex = 1200;

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

	/* document.getElementById('infoParadas').style.display = 'none'
	document.getElementById('comoLlegar').style.display = 'block' */
}


function shownt() {
	var toggle = document.getElementById('sidebar')
	var blur = document.getElementById("blur");

	toggle.classList.toggle('active');
	blur.style.display = "none";
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	var dondeEstoy = "32FF+W8 La Plata, Provincia de Buenos Aires";

	directionsService
		.route({
			origin: {
				query: dondeEstoy,
			},
			destination: {
				query: app.estaciones.destinoActual[0]/* document.getElementById("end").value */,
			},
			travelMode: google.maps.TravelMode.DRIVING,
		})
		.then((response) => {
			directionsRenderer.setDirections(response);
		})
		.catch((e) => window.alert("Directions request failed due to " + status));
}


/////Premios
var premio =
    [
       
		{
            "cantEcoins": "7000",
            "img": "https://cdn.shopify.com/s/files/1/0390/9527/1556/products/ECO03-Taupe_0_1_600x.jpg?v=1641942413",
            "descripcion": "Zapatillas Greenway",
            "id": "1",
        },        
		{
            "cantEcoins": "1500",
            "img": "https://www.nurorganic.com/wp-content/uploads/2019/09/copa-menstrual-nur.jpg",
            "descripcion": "Copita Menstrual",
            "id": "2",
        },
		{
            "cantEcoins": "300",
            "img": "https://www.hola.com/imagenes/estar-bien/20191212155436/cepillos-dientes-bambu-inconvenientes-gt/0-753-977/dientes-t.jpg?filter=w600",
            "descripcion": "Cepillo de bambu",
            "id": "3",
        },
		{
            "cantEcoins": "250",
            "img": "https://www.supergutierrez.com/img_blog/porque-debo-usas-bolsas-ecologicas.jpg",
            "descripcion": "Bolsas Ecologicas",
            "id": "4",
        },
		{
            "cantEcoins": "700",
            "img": "https://www.misharastrera.com/wp-content/uploads/2018/11/WEB-Shampoo-Solido-Rulos-II-70g-.jpg",
            "descripcion": "Shampoo Solido",
            "id": "5",
        },
        {
            "cantEcoins": "300",
            "img": "https://th.bing.com/th/id/R.e1b1020b67b2eab8a8c9a27dfceed30d?rik=6MGRdPgiExahww&pid=ImgRaw&r=0",
            "descripcion": "Agua Villavicencio Sport 750ml",
            "id": "6",
        },
        {
            "cantEcoins": "500",
            "img": "https://www.elite.cl/assets/uploads/images/5f946-cl-banner-panuelos-faciales-desktop.png",
            "descripcion": "Panuelitos Elite x6",
            "id": "7",
        },
		{
            "cantEcoins": "650",
            "img": "https://static-01.daraz.pk/p/362a89e71c35a9ac654cf589505044ed.jpg",
            "descripcion": "Taza de madera",
            "id": "8",
        },
		{
 "id": "9",
            "cantEcoins": "300",
            "img": "https://www.hods.eu/wp-content/uploads/vasopla_hods_web_01.jpg",
            "descripcion": "Vasos Reciclables X12 (ECO)",
        },
		{
            "cantEcoins": "700",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/gorragw_img.jpg?alt=media&token=b6974455-07f5-43a3-9acf-efe54f88063b",
            "descripcion": "Gorra Greenway",
            "id": "10",
        },        
		{
            "cantEcoins": "1000",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/remeragw_img.jpg?alt=media&token=9ec40c14-699f-4895-a383-d626596056d5",
            "descripcion": "Remera Greenway",
            "id": "11",
        },
		{
            "cantEcoins": "150",
            "img": "https://firebasestorage.googleapis.com/v0/b/genbrug-1ff7a.appspot.com/o/llavero_img.jpg?alt=media&token=756945a1-526b-4919-9fd0-6dfd10dc7f32",
            "descripcion": "Llavero Greenway",
            "id": "12",
        }, 
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_716341-MLA49195073584_022022-O.webp",
        //     "descripcion": "Pendrive 16gb Con Figuras Personajes",
        //     "id": "13",
        // },
        // {
        //     "cantEcoins": "1000", "id": "14",
    		
        //     "descripcion": "PARLANTE Bluetooth Gatito LED",
        //     "img": "https://i.ytimg.com/vi/ZgNk5yD3EZQ/maxresdefault.jpg"
        // },
        // {
        //     "cantEcoins": "520",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_719817-MLA48711411906_122021-O.webp",
        //     "descripcion": "Parlante Portátil Bluetooth Forma De Perro Bull Dog","id": "15"
			
        // },
        // {
        //     "cantEcoins": "200", "id": "16",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_751486-MLA43126884549_082020-O.webp",
        //     "descripcion": "Pendrive Usb 16gb De Marvel",
        // },
        // {
        //     "cantEcoins": "200",  "id": "17",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_959445-MLA48451496063_122021-O.webp",
        //     "descripcion": "PEN DRIVE STAR WARS 64 GB ",
        // },
        // {
        //     "cantEcoins": "200",  "id": "18",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_687993-MLA48137226317_112021-O.webp",
        //     "descripcion": "Parlante Bluetooth Bitty Boomers Star Wars: The Mandalorian",
        // },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://i.pinimg.com/564x/b8/c2/c8/b8c2c8414a269a2327677f8b82f3c611.jpg",
        //     "descripcion": "Pendrive Harry Potter USB",
        //     "": ""
        // },
        // {
        //     "cantEcoins": "3500",  "id": "19",
        //     "img": "https://i.pinimg.com/564x/53/2e/fd/532efd8d8f2eda802ce55b882799cdfa.jpg",
        //     "descripcion": "Pendrive Harry Potter USB",
        //     "": ""
        // },
        // {
        //     "cantEcoins": "3500",  "id": "20",
        //     "img": "https://m.media-amazon.com/images/I/31OS6DHQVoL._SL500_.jpg",
        //     "descripcion":  "Pendrive Harry Potter USB",
        //     "": ""
        // },
    ]


premioCoins = new Vue({
    el: "#winner",
    data: { premio: [] }
})
premioCoins.premio = premio

hola = new Vue({
    el: "#prueba",
    data: { recom: [] }
})
hola.recom = premio

let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')


let buyThings = [];
let totalCard = 0;
let countProduct = 0;

//functions
loadEventListenrs();
function loadEventListenrs(){
allContainerCart.addEventListener('click', addProduct); // AGREGA ELEMENTOS

 containerBuyCart.addEventListener('click', deleteProduct); //DELETE
} 

function addProduct(e){
e.preventDefault();
if (e.target.classList.contains('btn-add-cart')) {
	const selectProduct = e.target.parentElement; 
	readTheContent(selectProduct);
}
}

function deleteProduct(e) {
if (e.target.classList.contains('delete-product')) {
	const deleteId = e.target.getAttribute('data-id');

	buyThings.forEach(value => {
		if (value.id == deleteId) {
			let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
			totalCard =  totalCard - priceReduce;
			totalCard = totalCard.toFixed(2);
		}
	});
	buyThings = buyThings.filter(product => product.id !== deleteId);
	
	countProduct--;
}
loadHtml();
}


function readTheContent(product){
const infoProduct = {
	title: product.querySelector('.card-text').textContent,
	price: product.querySelector('.card-title').textContent,
	id: product.querySelector('a').getAttribute('data-id'),
	amount: 1
}


totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
totalCard = totalCard.toFixed(2);

const exist = buyThings.some(product => product.id === infoProduct.id);
if (exist) {
	const pro = buyThings.map(product => {
		if (product.id === infoProduct.id) {
			product.amount++;
			return product;
		} else {
			return product
		}
	});
	buyThings = [...pro];
} else {
	buyThings = [...buyThings, infoProduct]
	countProduct++;
}
loadHtml();
console.log(infoProduct);
}

  function loadHtml(){
  clearHtml();
buyThings.forEach(product => {
	 const {title, price, amount, id} = product;
	 
	 var row = document.createElement('tr');
	 row.classList.add('item');
	 row.innerHTML = `
	 <td>hola</td>
			 <td>${title}</td>
							  <td class="cart-price">${price}$</td>
			 <td> ${amount}</td>
		 
			 <td>  <span class="delete-product" data-id="${id}">X</span></td>

	 `;


	 containerBuyCart.appendChild(row);

	  priceTotal.innerHTML = totalCard;
 });
}
function clearHtml(){
containerBuyCart.innerHTML = '';
}



// /////Login
// const auth = firebase.auth()
// const fs = firebase.firestore()

// //Links
// const loggedOutLinks = document.querySelectorAll('.logged-out')
// const loggedInLinks = document.querySelectorAll('.logged-in')

// const loginCheck = user => {
//     if (user){
//         console.log("funca1")
//         loggedInLinks.forEach(link => link.style.display = 'block')
//         loggedOutLinks.forEach(link => link.style.display = 'none')
//     }
//     else{
//       console.log("funca2")
//         loggedInLinks.forEach(link => link.style.display = 'none')
//         loggedOutLinks.forEach(link => link.style.display = 'block')
//     }
// }
// //SignUp

// const signUpForm = document.querySelector('#signUp-form')

// signUpForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const email = document.querySelector('#signUp-email').value
//     const password = document.querySelector('#signUp-password').value

//     console.log(email,password)

//     auth
//         .createUserWithEmailAndPassword(email, password)
//         .then(userCredentential => {

//             //Clear the form
//             signUpForm.reset() 

//             //close the modal
//             $('#signUpModal').modal('hide')
//             console.log('sign up')
//         })
// })

// //SignIn

// const signInForm = document.querySelector('#login-form')

// signInForm.addEventListener('submit', e => {
//     e.preventDefault()
//     const email = document.querySelector('#login-email').value
//     const password = document.querySelector('#login-password').value
//     console.log(email,password)
//     auth
//         .signInWithEmailAndPassword(email, password)
//         .then(userCredentential => {

//             //Clear the form
//             signUpForm.reset()

//             //close the modal
//             $('#signUpModal').modal('hide')
//             console.log('sign in')
//         })
// })

// //LogOut

// const logOut = document.querySelector('#logOut')

// logOut.addEventListener('click', e => {
//     e.preventDefault()
//     auth.signOut().then(() => {
//         console.log('sign out')
//     })
// })
// //Google Login

// const googleBtn = document.querySelector('#googleLogin-btn')

// googleBtn.addEventListener('click', e => {
//     const provider = new firebase.auth.GoogleAuthProvider()
//     auth.signInWithPopup(provider)
//         .then(result => {
//             console.log("google sig in")

//             //Clear the form
//             signUpForm.reset()

//             //close the modal
//             $('#signUpModal').modal('hide')
//         })
// })

// //Facebook Login

// const facebookBtn = document.querySelector('#facebookLogin-btn')

// facebookBtn.addEventListener('click', e => {
//     e.preventDefault()
//     const provider = new firebase.auth.FacebookAuthProvider()
//     auth.signInWithPopup(provider)
//         .then(result => {
//             console.log(result)
//             console.log('facebook sign in')
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

// //list for auth state changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         console.log('auth: sign in')
//         fs.collection('posts')
//             .get()
//             .then((snapshot) => {
//               loginCheck(user)
//                 /* setUpPosts(snapshot.docs) */
//             }) 
//     }
//     else {
//       loginCheck(user)
//         /* setUpPosts([]) */
//     }
// })

//////LoadingPage







