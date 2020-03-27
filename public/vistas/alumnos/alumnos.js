var $ = el => document.querySelector(el), 
    id = el => document.getElementById(el),
    classAll = el => document.querySelectorAll(el);

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

            modulo();

            let btnCerrar = id(`btn-close-buscar-alumnos`);

            btnCerrar.addEventListener("click", event => {
                console.log("cerrado");
                
                $(`.modulo-vista-alumnos`).innerHTML = "";

            });

        });

});

function modulo(){
    var modificarAlumno = (alumno)=>{
        id("frmAlumnos").dataset.accion = 'modificar';
        id("frmAlumnos").dataset.idalumno = alumno.id_Alumno;
        id("txtCodigoAlumno").value = alumno.codigo;
        id("txtNombreAlumno").value = alumno.nombre;
        id("txtDireccionAlumno").value = alumno.direccion;
        id("txtTelefonoAlumno").value = alumno.telefono;
    };
    var eliminarAlumno = (idAlumno)=>{
        fetch(`private/Modulos/alumnos/procesos.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp=>resp.json()).then(resp=>{
            traerDatos('');
        });
    };
    var traerDatos = (valor)=>{
        fetch(`private/Modulos/Alumnos/procesos.php?proceso=buscarAlumno&alumno=${valor}`).then(resp=>resp.json()).then(resp=>{
            let filas = '';
            console.log(resp);
            
            resp.forEach(alumno => {
                filas += `
                    <tr class="filas" data-idalumno='${alumno.id_Alumno}' data-alumno='${JSON.stringify(alumno)}'>
                        <td>${alumno.codigo}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.direccion}</td>
                        <td>${alumno.telefono}</td>
                        <td>
                            <input type="button" class="btn btn-outline-danger text-white" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-alumnos > tbody").innerHTML = filas;
            $("#tbl-buscar-alumnos > tbody").addEventListener("click",e=>{
                
                var Modulos = classAll(".filas");

                for (let i = 0; i < Modulos.length; i++) {
                    Modulos[i].addEventListener("click",enviarDatos);
                    
                }

                
            });
        });
    };

    function enviarDatos(){
        console.log(this.dataset.alumno);

        this.dataset.alumno = '';

        //modificarAlumno(JSON.parse(this.dataset.alumno));
    }

    traerDatos('');
}

