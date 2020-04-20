
Vue.component('v-select', VueSelect.VueSelect);

var appUniversidad = new Vue({

    el:'#frmUniversidad',

    data:{

        Universidad:{

            idUniversidad  :   '',
            accion              :   $("#frmUniversidad").data("accion"),
            Nombre              :   '',
            msg                 :   ''

        }

    },
    methods:{

        guardarUniversidad:function(){

            console.log(JSON.stringify(this.Universidad));
            
            fetch(`PRIVATE/Module/Universidad/Proceso.php?proceso=recibirDatos&Universidad=${JSON.stringify(this.Universidad)}`).then( resp=>resp.json() ).then(resp=>{
                this.Universidad.msg = resp.msg;
                this.Universidad.idUniversidad = 0;
                this.Universidad.Nombre = '';
                this.Universidad.accion = 'nuevo';
                
            });

        },
        buscarUniversidad:function(){

            appBuscarUniversidad.buscarUniversidad();

        }

    }
    
});

var appBuscarUniversidad = new Vue({

    el:'#frm-buscar-Universidad',

    data:{
        Universidades:[],
        valor:''
    },
    methods:{

        buscarUniversidad:function(){
            fetch(`PRIVATE/Module/Universidad/Proceso.php?proceso=buscarUniversidad&Universidad=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Universidades = resp;
            });
        },
        modificarUniversidad:function(Universidad){

                appUniversidad.Universidad.idUniversidad = Universidad.id_universidad;
                appUniversidad.Universidad.Nombre = Universidad.universidad;
                appUniversidad.Universidad.accion =  'modificar';
            
        },
        verificacionEliminacion:function(idUniversidad){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarUniversidad.eliminarUniversidad(idUniversidad);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarUniversidad(id){
            console.log(id);
            
            fetch(`PRIVATE/Module/Universidad/Proceso.php?proceso=eliminarUniversidad&Universidad=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarUniversidad();
            });
        }
    },
    created:function(){
        this.buscarUniversidad();
    }

    
});