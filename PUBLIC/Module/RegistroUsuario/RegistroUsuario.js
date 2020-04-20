$("#Mostrar-Sub-Contenidos").hide("fold", "slow");

  setTimeout(function () {
    $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/RegistroUsuario/Registrar/RegistrarUsuario.html`, function() {
    
    }).show("scale", "slow");
  },1500);

  $( "[class*='Mostrar']" ).click(function() {
  
    let Modulo = $(this).data("modulo");
    $("#Mostrar-Sub-Contenidos").hide("fold", "slow");
  
    setTimeout(function () {
      $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/RegistroUsuario/${Modulo}/RegistrarUsuario.html`, function() {
      
      }).show("scale", "slow");
    },1500);
    console.log(Modulo);
    
  
  });