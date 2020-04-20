const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

document.addEventListener("DOMContentLoaded", e=>{
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