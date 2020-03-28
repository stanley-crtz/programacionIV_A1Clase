var $ = el => document.querySelector(el), 
    id = el => document.getElementById(el),
    classAll = el => document.querySelectorAll(el);

var valorDelId = 0;

var frmAlumnos = id("frmAlumnos"), boton = id("btnBuscar-alumnos");


frmAlumnos.addEventListener("submit",Guardar);

frmAlumnos.addEventListener("reset", Borrar);

function Borrar() {
    this.dataset.accion = 'nuevo';
    this.dataset.idalumno = '';
}

function Guardar(){
    
    let alumnos = {
        accion    : this.dataset.accion,
        id        : this.dataset.idalumno,
        codigo    : $("#txtCodigoAlumno").value,
        nombre    : $("#txtNombreAlumno").value,
        direccion : $("#txtDireccionAlumno").value,
        telefono  : $("#txtTelefonoAlumno").value
    };

    console.log(alumnos);
    
    fetch(`private/Modulos/Alumnos/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{

        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;

    });
    
}

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
    let frmBuscarAlumnos = id('txtBuscarAlumno');

    
    frmBuscarAlumnos.addEventListener('keyup', e=>{
        traerDatos(frmBuscarAlumnos.value);
    }); 

    var modificarAlumno = (alumno)=>{
        id("frmAlumnos").dataset.accion = 'modificar';
        id("frmAlumnos").dataset.idalumno = alumno.id_Alumno;
        id("txtCodigoAlumno").value = alumno.codigo;
        id("txtNombreAlumno").value = alumno.nombre;
        id("txtDireccionAlumno").value = alumno.direccion;
        id("txtTelefonoAlumno").value = alumno.telefono;
    };
    var eliminarAlumno = (idAlumno)=>{
        fetch(`private/Modulos/Alumnos/procesos.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp=>resp.json()).then(resp=>{
            traerDatos('');
        });
    };
    var traerDatos = (valor)=>{
        fetch(`private/Modulos/Alumnos/procesos.php?proceso=buscarAlumno&alumno=${valor}`).then(resp=>resp.json()).then(resp=>{
            let filas = '';
            console.log(resp);
            
            resp.forEach(alumno => {
                filas += `
                    <tr>
                        <td>${alumno.codigo}</td>
                        <td>${alumno.nombre}</td>
                        <td>${alumno.direccion}</td>
                        <td>${alumno.telefono}</td>
                        <td>
                            <input data-alumno='${JSON.stringify(alumno)}' type="button" class="btn btn-outline-warning text-white modificar" value="mod">
                        </td>
                        <td>
                            <input data-idalumno='${alumno.id_Alumno}' type="button" class="btn btn-outline-danger text-white eliminar" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-alumnos > tbody").innerHTML = filas;
            let botonModificar = classAll('.modificar');
            let botonEliminar = classAll('.eliminar');

            for (let index = 0; index < botonModificar.length; index++) {
                botonModificar[index].addEventListener('click',ModificarDatos);
                
            }

            for (let index = 0; index < botonEliminar.length; index++) {
                botonEliminar[index].addEventListener('click',EliminarDatos);
                
            }
            
            //$("#tbl-buscar-alumnos > tbody").addEventListener("click",enviarDatos);
        });
    };

    function ModificarDatos(){
        console.log(this.dataset.alumno);
        modificarAlumno(JSON.parse(this.dataset.alumno));
        $(`.modulo-vista-alumnos`).innerHTML = "";
    }

    function EliminarDatos(){
        
        valorDelId = this.dataset.idalumno;
        
        alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
            eliminarAlumno(valorDelId);
            alertify.success('Registro Eliminado');
            
        }, function() {
            alertify.error('Cancelado');
            
        });
        

    }

    traerDatos('');
}

