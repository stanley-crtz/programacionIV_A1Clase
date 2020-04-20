
Vue.component('v-select', VueSelect.VueSelect);

var appMunicipio = new Vue({

    el:'#frmMunicipio',

    data:{

        Municipio:{

            idMunicipio  :   '',
            accion              :   $("#frmMunicipio").data("accion"),
            Nombre              :   '',
            msg                 :   ''

        }

    },
    methods:{

        guardarMunicipio:function(){

            console.log(JSON.stringify(this.Municipio));
            
            fetch(`PRIVATE/Module/Departamentos/Proceso.php?proceso=recibirDatos&Municipio=${JSON.stringify(this.Municipio)}`).then( resp=>resp.json() ).then(resp=>{
                this.Municipio.msg = resp.msg;
                this.Municipio.idMunicipio = 0;
                this.Municipio.Nombre = '';
                this.Municipio.accion = 'nuevo';
                
            });

        },
        buscarMunicipio:function(){

            appBuscarMunicipio.buscarMunicipio();

        }

    }
    
});

var appBuscarMunicipio = new Vue({

    el:'#frm-buscar-Municipio',

    data:{
        Municipioes:[],
        valor:''
    },
    methods:{

        buscarMunicipio:function(){
            fetch(`PRIVATE/Module/Departamentos/Proceso.php?proceso=buscarMunicipio&Municipio=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.Municipioes = resp;
            });
        },
        modificarMunicipio:function(Municipio){

                appMunicipio.Municipio.idMunicipio = Municipio.id_numero_departamento;
                appMunicipio.Municipio.Nombre = Municipio.departamento;
                appMunicipio.Municipio.accion =  'modificar';
            
        },
        verificacionEliminacion:function(idMunicipio){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarMunicipio.eliminarMunicipio(idMunicipio);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarMunicipio(id){
            console.log(id);
            
            fetch(`PRIVATE/Module/Departamentos/Proceso.php?proceso=eliminarMunicipio&Municipio=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarMunicipio();
            });
        }
    },
    created:function(){
        this.buscarMunicipio();
    }

    
});