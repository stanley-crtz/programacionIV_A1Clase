<?php

    include('../../config/config.php');
    
    $docente = new alumno($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $docente -> $proceso( $_GET['docente'] );
    
    print_r(json_encode($docente->respuesta));


    class alumno{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($docente){

            $this->datos = json_decode($docente, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del estudiante';

            }

            if ( empty( $this->datos['direccion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del estudiante';

            }

            $this->almacenar_docente();

        }

        private function almacenar_docente(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO docentes (nombre, direccion, telefono) VALUES (
                        "'. $this->datos['nombre'] .'", 
                        "'. $this->datos['direccion'] .'", 
                        "'. $this->datos['telefono'] .'"
                        )'
                    );

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }

    }

?>