var appMateria = new Vue({

    el: "#frmMaterias",
    data: {

        materias: {

            idMaterias   : $("#frmMaterias").data("idmateria"),
            accion      : $("#frmMaterias").data("accion"),
            Codigo      : '',
            Materia     : '',
            msg         : ''

        }

    },
    methods: {

        guardarMaterias: function () {

            console.log(JSON.stringify(this.materias));

            fetch(`private/Modulos/Materias/procesos.php?proceso=recibirDatos&materia=${JSON.stringify(this.materias)}`).then( resp => resp.json() ).then( resp => {

                this.materias.msg = resp.msg;
                this.materias.idMateria = 0;
                this.materias.codigo = '';
                this.materias.materia = '';
                this.materias.accion = 'nuevo';

            })
            
        },
        buscarMaterias: function () {
            
            $(`#modulo-vista-materias`).load(`public/vistas/materias/buscar-materias.html`, function () {
                
                appBuscarMateria.buscarMaterias().show( "scale", 1000 );

            }).draggable().show( "scale", 1000 );

        }

    }

})