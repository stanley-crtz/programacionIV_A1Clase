var $ = el => document.querySelector(el), 
    id = el => document.getElementById(el),
    classAll = el => document.querySelectorAll(el);

var frmDocentes = $("#frmDocentes"), boton = id("btnBuscar-docentes");

frmDocentes.addEventListener("submit", Guardar);

frmDocentes.addEventListener("reset", Borrar);

function Borrar() {
    this.dataset.accion = 'nuevo';
    this.dataset.iddocente = '';
}

function Guardar() {

    let alumnos = {
        accion    : this.dataset.accion,
        id        : this.dataset.iddocente,
        codigo    : $("#txtCodigoDocente").value,
        nombre    : $("#txtNombreDocente").value,
        direccion : $("#txtDireccionDocente").value,
        telefono  : $("#txtTelefonoDocente").value,
        nit       : $("#txtNITDocente").value
    };

    fetch(`/programacionIV_A1Clase/private/Modulos/Alumnos/procesosDo.php?procesoDo=recibirDatos&docente=${JSON.stringify(alumnos)}`).then( resp=>resp.json() ).then(resp=>{
        $("#respuestaAlumno").innerHTML = `
            <div class="alert alert-success" role="alert">
                ${resp.msg}
            </div>
        `;
    }); 
}

boton.addEventListener("click", event => {

    fetch(`public/vistas/docentes/buscar-docentes.html`).then( resp => resp.text() ).then( resp => {
        
        $(`.modulo-vista-docentes`).innerHTML = resp;

        modulo();

        let btnCerrar = id(`btn-close-buscar-docentes`);

        btnCerrar.addEventListener("click", event => {
            console.log("cerrado");
            
            $(`.modulo-vista-docentes`).innerHTML = "";

        });

    });

});

function modulo(){
    let frmBuscarDocente = id('txtBuscarDocente');

    
    frmBuscarDocente.addEventListener('keyup', e=>{
        traerDatos(frmBuscarDocente.value);
    }); 

    var modificarDocente = (docente)=>{
        id("frmDocentes").dataset.accion = 'modificar';
        id("frmDocentes").dataset.iddocente = docente.id_Docente ;
        id("txtCodigoDocente").value = docente.codigo;
        id("txtNombreDocente").value = docente.nombre;
        id("txtDireccionDocente").value = docente.direccion;
        id("txtTelefonoDocente").value = docente.telefono;
        id("txtNITDocente").value = docente.NIT
    };
    var eliminarDocente = (idDocente)=>{
        fetch(`private/Modulos/Alumnos/procesosDo.php?procesoDo=eliminarDocente&docente=${idDocente}`).then(resp=>resp.json()).then(resp=>{
            traerDatos('');
        });
    };
    var traerDatos = (valor)=>{
        fetch(`private/Modulos/Alumnos/procesosDo.php?procesoDo=buscarDocente&docente=${valor}`).then(resp=>resp.json()).then(resp=>{
            let filas = '';
            console.log(resp);
            
            resp.forEach(docente => {
                filas += `
                    <tr>
                        <td>${docente.codigo}</td>
                        <td>${docente.nombre}</td>
                        <td>${docente.direccion}</td>
                        <td>${docente.telefono}</td>
                        <td>${docente.NIT}</td>
                        <td>
                            <input data-docente='${JSON.stringify(docente)}' type="button" class="btn btn-outline-warning text-white modificar" value="mod">
                        </td>
                        <td>
                            <input data-iddocente='${docente.id_Docente}' type="button" class="btn btn-outline-danger text-white eliminar" value="del">
                        </td>
                    </tr>
                `;
            });
            $("#tbl-buscar-docentes > tbody").innerHTML = filas;
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
        console.log(this.dataset.docente);
        modificarDocente(JSON.parse(this.dataset.docente));
        $(`.modulo-vista-docentes`).innerHTML = "";
    }

    function EliminarDatos(){
        
        valorDelId = this.dataset.iddocente;
        
        alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
            eliminarDocente(valorDelId);
            alertify.success('Registro Eliminado');
            
        }, function() {
            alertify.error('Cancelado');
            
        });
        

    }

    traerDatos('');
}