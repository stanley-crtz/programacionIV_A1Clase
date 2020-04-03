var appDocente = new Vue({

    el: "#frmDocentes",

    data:{
        
        docentes: {
            idDocente  : $("#frmDocentes").data("iddocente"),
            accion    : $("#frmDocentes").data("accion"),
            codigo    : '',
            nombre    : '',
            direccion : '',
            telefono  : '',
            NIT       : '',
            msg       : ''
        }

    },
    methods:{

        guaradarDocentes: function() {
            console.log(JSON.stringify(this.docentes));

            fetch(`private/Modulos/Docentes/procesos.php?proceso=recibirDatos&docente=${JSON.stringify(this.docentes)}`).then( resp => resp.json()).then( resp => {

                this.docentes.msg           =    resp.msg;
                this.docentes.idDocente     =    0;
                this.docentes.codigo        =    '';
                this.docentes.nombre        =    '';
                this.docentes.direccion     =    '';
                this.docentes.telefono      =    '';
                this.docentes.NIT           =    '';
                this.docentes.accion        =    'nuevo';

            })
            
        },
        buscarDocentes: function () {

            $(`#modulo-vista-docentes`).load(`public/vistas/docentes/buscar-docentes.html`, function () {

                appBuscarDocentes.buscarDocentes().show( "scale", 1000 );

            }).draggable().show( "scale", 1000 );

        }

    }

})