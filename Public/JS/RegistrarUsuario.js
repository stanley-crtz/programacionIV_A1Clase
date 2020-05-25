Vue.component('v-select', VueSelect.VueSelect);

var appRegistrarUsuario = new Vue({

    el:'#frmRegistrarUsuario',

    data:{

        RegistrarUsuario:{

            idRegistrarUsuario  :   '',
            accion              :   $("#frmRegistrarUsuario").data("accion"),
            Nombre              :   '',
            Apellido            :   '',
            Genero              :   '',
            Estatus             :   '',
            Fecha               :   '',
            DUI                 :   '',
            NIT                 :   '',
            Usuario             :   '',
            Password            :   '',
            msg                 :   ''

        },
        Genero : [],
        GeneroId : [],
        Status : [],
        StatusId : []

    },
    methods:{

        guardarRegistrarUsuario:function(){

            var d = new Date();

            console.log("Actual: " + d.getFullYear());
            console.log("Ingresada: " + new Date(this.RegistrarUsuario.Fecha).getFullYear());

            var Age = d.getFullYear() - new Date(this.RegistrarUsuario.Fecha).getFullYear();

            console.log("Edad del usuario" + Age);
            

            if (Age > 24) {
                for (let index = 0; index < this.Genero.length; index++) {
                    if (this.Genero[index] == this.RegistrarUsuario.Genero) {
                        this.RegistrarUsuario.Genero = this.GeneroId[index];
                    }
                }

                for (let index = 0; index < this.Status.length; index++) {
                    if (this.Status[index] == this.RegistrarUsuario.Estatus) {
                        this.RegistrarUsuario.Estatus = this.StatusId[index];
                    }
                }

                console.log(JSON.stringify(this.RegistrarUsuario));
                
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.RegistrarUsuario)}`).then( resp=>resp.json() ).then(resp=>{
                    this.RegistrarUsuario.msg = resp.msg;
                    this.RegistrarUsuario.idRegistrarUsuario = 0;
                    this.RegistrarUsuario.Nombre = '';
                    this.RegistrarUsuario.Apellido = '';
                    this.RegistrarUsuario.Genero  = '';
                    this.RegistrarUsuario.Estatus  = '';
                    this.RegistrarUsuario.Fecha  = '';
                    this.RegistrarUsuario.DUI  = '';
                    this.RegistrarUsuario.NIT  = '';
                    this.RegistrarUsuario.Usuario  = '';
                    this.RegistrarUsuario.Password  = '';
                    this.RegistrarUsuario.accion = 'nuevo';
                    
                });
            }
            else{
                alertify.alert('Error', 'Debe ser mayor de 24 años');
            }

        },
        generarPassword: function () {
            var options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
            let passAleatorio, passGenerado = '';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            console.log(passGenerado);
            document.getElementById("pass").value = passGenerado;
        },
        pass: function () {
            var current = $("#password").data('accion');
				console.log(current);
				

				if (current == 'hide') {
					console.log("ocultar");
					
                    $("#pass").attr('type','text');
                    $("#password").removeClass('fas fa-lock').addClass('fas fa-lock-open');
                    $("#password").data('accion','show');
				}

				if (current == 'show') {
					console.log("Mostrar");
					
					$("#pass").attr('type','password');
                    $("#password").removeClass('fas fa-lock-open').addClass('fas fa-lock');
                    $("#password").data('accion', 'hide');
				}
        },
        buscarRegistrarUsuario:function(){

            appBuscarRegistrarUsuario.buscarRegistrarUsuario();

        }

    },
    created: function(){
        fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp=>resp.json()).then(resp=>{
            appRegistrarUsuario.Status = resp.Status;
            appRegistrarUsuario.StatusId = resp.StatusID;

            appRegistrarUsuario.Genero = resp.Genero;
            appRegistrarUsuario.GeneroId   = resp.IDRegistrarUsuario;

            // console.log(appRegistrarUsuario.Status);
            // console.log(appRegistrarUsuario.options);
            
            
        });

    }
    
});

var appBuscarRegistrarUsuario = new Vue({

    el:'#frm-buscar-RegistrarUsuario',

    data:{
        RegistrarUsuarioes:[],
        valor:''
    },
    methods:{

        buscarRegistrarUsuario:function(){
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.RegistrarUsuarioes = resp;
            });
        },
        modificarRegistrarUsuario:function(RegistrarUsuario){

                appRegistrarUsuario.RegistrarUsuario.idRegistrarUsuario = RegistrarUsuario.id_perfil;
                appRegistrarUsuario.RegistrarUsuario.Nombre = RegistrarUsuario.nombres_completos;
                appRegistrarUsuario.RegistrarUsuario.Apellido = RegistrarUsuario.apellidos_completo;
                appRegistrarUsuario.RegistrarUsuario.Genero  = RegistrarUsuario.genero;
                appRegistrarUsuario.RegistrarUsuario.Estatus  = RegistrarUsuario.estatus;
                appRegistrarUsuario.RegistrarUsuario.Fecha  = RegistrarUsuario.fecha_de_nacimiento;
                appRegistrarUsuario.RegistrarUsuario.DUI  = RegistrarUsuario.DUI;
                appRegistrarUsuario.RegistrarUsuario.NIT  = RegistrarUsuario.NIT;
                appRegistrarUsuario.RegistrarUsuario.Usuario  = RegistrarUsuario.usuario;
                appRegistrarUsuario.RegistrarUsuario.Password  = RegistrarUsuario.contraseña;
                appRegistrarUsuario.RegistrarUsuario.accion =  'modificar';
            
        },
        verificacionEliminacion:function(idRegistrarUsuario){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarRegistrarUsuario.eliminarRegistrarUsuario(idRegistrarUsuario);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarRegistrarUsuario(id){
            console.log(id);
            
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=eliminarRegistrarUsuario&RegistrarUsuario=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarRegistrarUsuario();
            });
        }
    },
    created:function(){
        this.buscarRegistrarUsuario();
    }

    
});
