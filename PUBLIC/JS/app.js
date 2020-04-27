const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

document.addEventListener("DOMContentLoaded", e=>{

  obtenerSesion();
  $("#Mostrar-Sub-Contenidos").hide("fold", "slow");

  setTimeout(function () {
    $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/Noticias/vista-Noticias.html`, function() {
    
    }).show("scale", "slow");
  },1500);
})

$( "[class*='Mostrar']" ).click(function() {
  
  let Modulo = $(this).data("modulo");
  $("#Mostrar-Sub-Contenidos").hide("fold", "slow");

  setTimeout(function () {
    $("#Mostrar-Sub-Contenidos").load(`public/vistas/${Modulo}/vista-${Modulo}.html`, function() {
    
    }).show("scale", "slow");
  },1500);

});

$( "[class*='navegacion']" ).click(function() {
  
    let Modulo = $(this).data("navegar");
    $("#ContenedorPrincipal").hide("fold", "slow");
  
    setTimeout(function () {
      $("#ContenedorPrincipal").load(`PUBLIC/Module/${Modulo}/${Modulo}.html`, function() {
      
      }).show("scale", "slow");
    },1500);
    console.log(Modulo);
    
  
  });

hamburger.addEventListener("click", () => {

  navLinks.classList.toggle("open");

  links.forEach(link => {

    link.classList.toggle("fade");
  });

});

function obtenerSesion(){

  var nombreUsuario = sessionStorage.getItem('nombre');
  return (nombreUsuario ===null || nombreUsuario === undefined)?window.location='../programacionIV_A1Clase/login.html':false;
  
}

function cerrarSesion(){
  alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
      
      sessionStorage.clear();
      window.location = '../programacionIV_A1Clase/login.html';
      
  }, function() {
      alertify.error('Cancelado');
      
  });
}