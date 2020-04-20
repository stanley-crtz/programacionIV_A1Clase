$("#Mostrar-Sub-Contenidos").hide("fold", "slow");

  setTimeout(function () {
    $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/Configuraciones/Departamento/Departamento.html`, function() {
    
    }).show("scale", "slow");
  },1500);

  $( "[class*='Mostrar']" ).click(function() {
  
    let Modulo = $(this).data("modulo");
    $("#Mostrar-Sub-Contenidos").hide("fold", "slow");
  
    setTimeout(function () {
      $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/Configuraciones/${Modulo}/${Modulo}.html`, function() {
      
      }).show("scale", "slow");
    },1500);
    console.log(Modulo);
    
  
  });