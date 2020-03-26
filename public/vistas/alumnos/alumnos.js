var $ = el => document.querySelector(el), 
    id = el => document.getElementById(el);

var frmAlumnos = id("frmAlumnos"), boton = id("btnBuscar-alumnos");


frmAlumnos.addEventListener("submit",e=>{

    e.preventDefault();
    e.stopPropagation();
    
    let alumnos = {
        accion    : 'nuevo',
        codigo    : $("#txtCodigoAlumno").value,
        nombre    : $("#txtNombreAlumno").value,
        direccion : $("#txtDireccionAlumno").value,
        telefono  : $("#txtTelefonoAlumno").value
    };
    
    fetch(`private/Modulos/Alumnos/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{

        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;

    });
});

boton.addEventListener("click", event => {

        fetch(`public/vistas/alumnos/buscar-alumnos.html`).then( resp => resp.text() ).then( resp => {
            
            $(`.modulo-vista-alumnos`).innerHTML = resp;

            let btnCerrar = id(`btn-close-buscar-alumnos`);

            btnCerrar.addEventListener("click", event => {
                console.log("cerrado");
                
                $(`.modulo-vista-alumnos`).innerHTML = "";

            });

        });

});