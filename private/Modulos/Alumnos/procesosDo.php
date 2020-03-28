<?php

    include('../../config/config.php');
    
    $docente = new alumno($conexion);

    $proceso = '';

    if ( isset( $_GET['procesoDo'] ) && strlen( $_GET['procesoDo'] ) > 0) {
        $proceso = $_GET['procesoDo'];
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

            if ( empty( $this->datos['codigo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo del docente';

            }

            if ( empty( $this->datos['nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del docente';

            }

            if ( empty( $this->datos['direccion']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la direccion del docente';

            }

            if ( empty( $this->datos['telefono']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo del docente';

            }

            if ( empty( $this->datos['nit']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nit del docente';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_docente();
            }
            else{
                $this->modificarDocente();
            }

        }

        private function almacenar_docente(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO docentes (codigo,nombre, direccion, telefono, NIT) VALUES (
                        "'. $this->datos['codigo'] .'", 
                        "'. $this->datos['nombre'] .'", 
                        "'. $this->datos['direccion'] .'", 
                        "'. $this->datos['telefono'] .'",
                        "'. $this->datos['nit'] .'"
                        )'
                    );

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }

        public function buscarDocente($valor=''){
            $this->db->consultas('SELECT docentes.id_Docente, docentes.codigo, docentes.nombre,
                docentes.direccion, docentes.telefono, docentes.NIT FROM docentes
                where docentes.codigo like "%'.$valor.'%" or docentes.nombre like "%'.$valor.'%" 
                    or docentes.NIT like "%'.$valor.'%"     
            ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarDocente($idAlumno=''){
            $this->db->consultas('
                delete docentes
                from docentes
                where docentes.id_Docente = "'.$idAlumno.'"
            ');
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarDocente(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas("UPDATE docentes SET ".
                        "codigo = '". $this->datos['codigo'] ."',".
                        "direccion = '". $this->datos['direccion'] ."',".
                        "nombre = '". $this->datos['nombre'] ."',".
                        "telefono = '". $this->datos['telefono'] ."',".
                        "NIT = '". $this->datos['nit'] ."' ".
                        "WHERE id_Docente = ". $this->datos['id']
                    );

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>