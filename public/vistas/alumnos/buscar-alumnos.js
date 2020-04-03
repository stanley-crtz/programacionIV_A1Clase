var appBuscarAlumnos = new Vue({
    el:'#frm-buscar-alumnos',
    data:{
        misalumnos:[],
        valor:''
    },
    methods:{
        buscarAlumno:function(){
            fetch(`private/Modulos/Alumnos/procesos.php?proceso=buscarAlumno&alumno=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.misalumnos = resp;
            });
        },
        modificarAlumno:function(alumno){
            this.cerrarBuscarAlumnos();
            appalumno.alumno = alumno;
            appalumno.alumno.accion = 'modificar';
            
        },
        verificacionEliminacion:function(idAlumno){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarAlumnos.eliminarAlumno(idAlumno);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarAlumno(id){
            console.log(id);
            
            fetch(`private/Modulos/Alumnos/procesos.php?proceso=eliminarAlumno&alumno=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarAlumno();
            });
        },
        cerrarBuscarAlumnos:function(){
            $(`#modulo-vista-alumnos`).html("");
        }
    },
    created:function(){
        this.buscarAlumno();
    }
});