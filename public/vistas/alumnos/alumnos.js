var appalumno = new Vue({

    el:'#frm-alumnos',

    data:{

        alumno:{

            idAlumno  : $("#frm-alumnos").data("idalumno"),
            accion    : $("#frm-alumnos").data("accion"),
            codigo    : '',
            nombre    : '',
            direccion : '',
            telefono  : '',
            msg       : ''

        }

    },
    methods:{

        guardarAlumno:function(){

            console.log(JSON.stringify(this.alumno));
            
            fetch(`private/Modulos/Alumnos/procesos.php?proceso=recibirDatos&alumno=${JSON.stringify(this.alumno)}`).then( resp=>resp.json() ).then(resp=>{
                this.alumno.msg = resp.msg;
                this.alumno.idAlumno = 0;
                this.alumno.codigo = '';
                this.alumno.nombre = '';
                this.alumno.direccion = '';
                this.alumno.telefono = '';
                this.alumno.accion = 'nuevo';
                
            });

        },
        buscarAlumno:function(){

            $(`#modulo-vista-alumnos`).load(`public/vistas/alumnos/buscar-alumnos.html`, function () {

                appBuscarAlumnos.buscarAlumno().show( "scale", 1000 );

            }).draggable().show( "scale", 1000 );

        }

    }
    
});