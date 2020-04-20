
Vue.component('v-select', VueSelect.VueSelect);

var appPuestos = new Vue({

    el:'#frmPuestos',

    data:{

        Puestos:{

            idPuestos  :   '',
            accion              :   $("#frmPuestos").data("accion"),
            Nombre              :   '',
            msg                 :   ''

        }

    },
    methods:{

        guardarPuestos:function(){

            console.log(JSON.stringify(this.Puestos));
            
            fetch(`PRIVATE/Module/Puestos/Proceso.php?proceso=recibirDatos&Puestos=${JSON.stringify(this.Puestos)}`).then( resp=>resp.json() ).then(resp=>{
                this.Puestos.msg = resp.msg;
                this.Puestos.idPuestos = 0;
                this.Puestos.Nombre = '';
                this.Puestos.accion = 'nuevo';
                
            });

        },
        buscarPuestos:function(){

            appBuscarPuestos.buscarPuestos();

        }

    }
    
});

var appBuscarPuestos = new Vue({

    el:'#frm-buscar-Puestos',

    data:{
        Puestoses:[],
        valor:''
    },
    methods:{

        buscarPuestos:function(){
            fetch(`PRIVATE/Module/Puestos/Proceso.php?proceso=buscarPuestos&Puestos=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Puestoses = resp;
            });
        },
        modificarPuestos:function(Puestos){

                appPuestos.Puestos.idPuestos = Puestos.id_puesto;
                appPuestos.Puestos.Nombre = Puestos.puesto;
                appPuestos.Puestos.accion =  'modificar';
            
        },
        verificacionEliminacion:function(idPuestos){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarPuestos.eliminarPuestos(idPuestos);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarPuestos(id){
            console.log(id);
            
            fetch(`PRIVATE/Module/Puestos/Proceso.php?proceso=eliminarPuestos&Puestos=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarPuestos();
            });
        }
    },
    created:function(){
        this.buscarPuestos();
    }

    
});