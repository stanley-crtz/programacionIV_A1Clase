<?php
 
    include('../../config/config.php');

    $alumno = new alumno($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $alumno->$proceso($_GET['alumno']);
 
    print_r(json_encode($alumno->respuesta));


    class alumno{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($alumno){

            $this->datos = json_decode($alumno, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['codigo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo del estudiante';

            }

            if ( empty( $this->datos['nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del estudiante';

            }

            if ( empty( $this->datos['direccion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del estudiante';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_alumno();
            }
            else{
                $this->modificarAlumno();
            }


        }

        private function almacenar_alumno(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO alumnos (codigo, nombre, direccion, telefono) VALUES (
                        "'. $this->datos['codigo'] .'", 
                        "'. $this->datos['nombre'] .'", 
                        "'. $this->datos['direccion'] .'", 
                        "'. $this->datos['telefono'] .'"
                        )'
                    );

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarAlumno($valor=''){
            $this->db->consultas('SELECT alumnos.id_Alumno, alumnos.codigo, alumnos.nombre, 
                alumnos.direccion, alumnos.telefono from alumnos
                where alumnos.codigo like "%'.$valor.'%" or alumnos.nombre like "%'.$valor.'%"
            ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarAlumno($idAlumno=''){
            $this->db->consultas('
                delete alumnos
                from alumnos
                where alumnos.id_Alumno = "'.$idAlumno.'"
            ');
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarAlumno(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas("UPDATE alumnos SET ".
                        "codigo = '". $this->datos['codigo'] ."',".
                        "direccion = '". $this->datos['direccion'] ."',".
                        "nombre = '". $this->datos['nombre'] ."',".
                        "telefono = '". $this->datos['telefono'] ."' ".
                        "WHERE id_Alumno = ". $this->datos['id']
                    );

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>