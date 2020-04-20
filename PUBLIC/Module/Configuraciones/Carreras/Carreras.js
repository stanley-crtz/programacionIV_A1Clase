
Vue.component('v-select', VueSelect.VueSelect);

var appCarreras = new Vue({

    el:'#frmCarreras',

    data:{

        Carreras:{

            idCarreras          :   '',
            accion              :   $("#frmCarreras").data("accion"),
            Nombre              :   '',
            Universidad         :   '',
            msg                 :   ''

        },
        Universidad : [],
        UniversidadId : []

    },
    methods:{

        guardarCarreras:function(){

            for (let index = 0; index < this.Universidad.length; index++) {
                if (this.Universidad[index] == this.Carreras.Universidad) {
                    this.Carreras.Universidad = this.UniversidadId[index];
                }
            }

            console.log(JSON.stringify(this.Carreras));
            
            fetch(`PRIVATE/Module/Carreras/Proceso.php?proceso=recibirDatos&Carreras=${JSON.stringify(this.Carreras)}`).then( resp=>resp.json() ).then(resp=>{
                this.Carreras.msg = resp.msg;
                this.Carreras.idCarreras = 0;
                this.Carreras.Nombre = '';
                this.Carreras.Universidad = '';
                this.Carreras.accion = 'nuevo';
                
            });

        },
        buscarCarreras:function(){

            appBuscarCarreras.buscarCarreras();

        }

    },
    created: function(){
        fetch(`PRIVATE/Module/Carreras/Proceso.php?proceso=traer_para_vselect&Carreras=`).then(resp=>resp.json()).then(resp=>{
            appCarreras.Universidad = resp.Universidad;
            appCarreras.UniversidadId = resp.UniversidadID;
            
            
        });

    }
    
});

var appBuscarCarreras = new Vue({

    el:'#frm-buscar-Carreras',

    data:{
        Carrerases:[],
        valor:''
    },
    methods:{

        buscarCarreras:function(){
            fetch(`PRIVATE/Module/Carreras/Proceso.php?proceso=buscarCarreras&Carreras=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Carrerases = resp;
            });
        },
        modificarCarreras:function(Carreras){

                appCarreras.Carreras.idCarreras = Carreras.id_carrera;
                appCarreras.Carreras.Nombre = Carreras.carrera;
                appCarreras.Carreras.Universidad = Carreras.universidad;
                appCarreras.Carreras.accion =  'modificar';
            
        },
        verificacionEliminacion:function(idCarreras){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarCarreras.eliminarCarreras(idCarreras);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarCarreras(id){
            console.log(id);
            
            fetch(`PRIVATE/Module/Carreras/Proceso.php?proceso=eliminarCarreras&Carreras=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarCarreras();
            });
        }
    },
    created:function(){
        this.buscarCarreras();
    }

    
});