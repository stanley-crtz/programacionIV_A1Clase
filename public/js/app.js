var $ = el => document.querySelector(el);

document.addEventListener("DOMContentLoaded", event => {
    
    event.preventDefault();

    let mostrarVista = $("[class*='mostrar']");

    mostrarVista.addEventListener("click", e=>{
        
        e.stopPropagation();

        let modulo = "alumnos";

        fetch('public/vistas/alumnos/alumnos.html').then( resp => resp.text()).then( resp => {

            document.getElementById('vista-alumnos').innerHTML = resp;
            let btnCerrar = $(".close");

            btnCerrar.addEventListener("click", event => {

                $(`#vista-${modulo}`).innerHTML = "";

            });

            let cuerpo = $("body"), script = document.createElement("script");

            script.src = `public/vistas/Alumnos/${modulo}.js`;

            cuerpo.appendChild(script);
                
        });

    });

});