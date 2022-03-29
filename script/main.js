var punto = document.getElementsByClassName('.gm-style img')

if (punto) {
    console.log("patata")
}

var cargarPagina = (id) => {
    document.getElementById("homePage").style.display = "none"
    document.getElementById("estacionesPage").style.display = "none"
    document.getElementById("guiaPage").style.display = "none"
    document.getElementById("aboutPage").style.display = "none"
    document.getElementById("contactPage").style.display = "none"
    document.getElementById(id).style.display = "block"
  }
  cargarPagina("contactPage")