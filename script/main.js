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
var preloader = document.getElementById("page-splash")
setTimeout(function() {
    preloader.style.display = "none"
}, 1000);
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
            "cantEcoins": "700",
            "img": "https://th.bing.com/th/id/R.e1b1020b67b2eab8a8c9a27dfceed30d?rik=6MGRdPgiExahww&pid=ImgRaw&r=0",
            "descripcion": "Agua Villavicencio Sport 750ml",
            "": ""
        },
        {
            "cantEcoins": "900",
            "img": "https://www.elite.cl/assets/uploads/images/5f946-cl-banner-panuelos-faciales-desktop.png",
            "descripcion": "Panuelitos Elite x6",
            "": ""
        },
        {
            "cantEcoins": "3500",
            "img": "https://http2.mlstatic.com/D_NQ_NP_716341-MLA49195073584_022022-O.webp",
            "descripcion": "Pendrive 16gb Con Figuras Personajes",
            "": ""
        },
        {
            "cantEcoins": "1000",
    
            "descripcion": "PARLANTE Bluetooth Gatito LED",
            "img": "https://i.ytimg.com/vi/ZgNk5yD3EZQ/maxresdefault.jpg"
        },
        {
            "cantEcoins": "520",
            "img": "https://http2.mlstatic.com/D_NQ_NP_719817-MLA48711411906_122021-O.webp",
            "descripcion": "Parlante Portátil Bluetooth Forma De Perro Bull Dog",
        },
        {
            "cantEcoins": "520",
            "img": "https://m.media-amazon.com/images/I/313xB+Y3hkL._SL500_.jpg",
            "descripcion": "TAZA AMARILLA",
            "": ""
        },
       
        // {
        //     "cantEcoins": "2500",
        //     "img": "data:image/jpeg;base64,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",
        //     "descripcion": "BUZO UNISEX",
        // },
        {
            "cantEcoins": "200",
            "img": "https://http2.mlstatic.com/D_NQ_NP_751486-MLA43126884549_082020-O.webp",
            "descripcion": "Pendrive Usb 16gb De Marvel",
        },
        {
            "cantEcoins": "800",
            "img": "https://m.media-amazon.com/images/I/31CLrB6tffL._SL500_.jpg",
            "descripcion": "Vasos de plastico, variedad de colores X12",
        },
        // {
        //     "cantEcoins": "2500",
        //     "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNmPFg35389B8Aa3nbaPo3KpzIHYjY1x-cF29xnJdU5PwWuBxXBrsJy6RrxY4xjXrod38&usqp=CAU",
        //     "descripcion": "Rallador manual",
        // },
        // {
        //     "cantEcoins": "200",
        //     "img": "https://http2.mlstatic.com/D_NQ_NP_13575-MLA3046599745_082012-O.webp",
        //     "descripcion": "PEN DRIVE STAR WARS 64 GB ",
        // },
        {
            "cantEcoins": "200",
            "img": "https://http2.mlstatic.com/D_NQ_NP_959445-MLA48451496063_122021-O.webp",
            "descripcion": "PEN DRIVE STAR WARS 64 GB ",
        },
        {
            "cantEcoins": "200",
            "img": "https://http2.mlstatic.com/D_NQ_NP_687993-MLA48137226317_112021-O.webp",
            "descripcion": "Parlante Bluetooth Bitty Boomers Star Wars: The Mandalorian",
        },
        // {
        //     "cantEcoins": "3500",
        //     "img": "https://www.memoriaflashonline.com/wp-content/uploads/2019/09/Pendrive-de-Harry-Potter.jpg",
        //     "descripcion": "Pendrive Harry Potter USB",
        //     "": ""
        // },
        {
            "cantEcoins": "3500",
            "img": "https://i.pinimg.com/564x/b8/c2/c8/b8c2c8414a269a2327677f8b82f3c611.jpg",
            "descripcion": "Pendrive Harry Potter USB",
            "": ""
        },
        {
            "cantEcoins": "3500",
            "img": "https://i.pinimg.com/564x/53/2e/fd/532efd8d8f2eda802ce55b882799cdfa.jpg",
            "descripcion": "Pendrive Harry Potter USB",
            "": ""
        },
        {
            "cantEcoins": "3500",
            "img": "https://m.media-amazon.com/images/I/31OS6DHQVoL._SL500_.jpg",
            "descripcion":  "Pendrive Harry Potter USB",
            "": ""
        },
    ]

premioCoins = new Vue({
    el: "#winner",
    data: { premio: [] }
})
premioCoins.premio = premio

let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


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
	id: product.querySelector('button').getAttribute('data-id'),
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
   const row = document.createElement('div');
	 row.classList.add('item');
	 row.innerHTML = `
		 <div class="item-content">
			 <h5>${title}</h5>
							  <h5 class="cart-price">${price}$</h5>
			 <h6>Amount: ${amount}</h6>
		 </div>
		 <span class="delete-product" data-id="${id}">X</span>
	 `;


	 containerBuyCart.appendChild(row);

	 priceTotal.innerHTML = totalCard;

	 amountProduct.innerHTML = countProduct;
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







