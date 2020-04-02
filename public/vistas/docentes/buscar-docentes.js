var appBuscarDocentes = new Vue({

    el: "#frm-buscar-docentes",

    data: {

        data_docentes:[],
        valor   :''

    },
    methods: {

        buscarDocentes: function () {
            fetch(`private/Modulos/Docentes/procesos.php?proceso=buscarDocente&docente=${this.valor}`).then( resp => resp.json() ).then( resp => {
                this.data_docentes = resp;
            });
        },
        modificarDocente: function (docentes) {
            this.cerrarBuscarDocentes();
            appDocente.docentes = docentes;
            console.log(JSON.stringify(docentes));
            
            appDocente.docentes.accion = 'modificar';
        },
        verificacionEliminacion: function (idDocente) {
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarDocentes.eliminarDocente(idDocente);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarDocente(id){
            console.log(id);
            
            fetch(`private/Modulos/Docentes/procesos.php?proceso=eliminarDocente&docente=${id}`).then(resp=>resp.json()).then(resp=>{
                appBuscarDocentes.buscarDocentes();
            });
        },
        cerrarBuscarDocentes:function(){
            $(`#modulo-vista-docentes`).hide( "puff", "slow" );
        }

    },
    created:function () {
        this.buscarDocentes();
    }

})