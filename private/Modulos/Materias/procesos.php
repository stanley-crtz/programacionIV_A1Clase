<?php
 
    include('../../config/config.php');

    $materia = new alumno($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $materia->$proceso($_GET['materia']);
 
    print_r(json_encode($materia->respuesta));


    class alumno{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($materia){

            $this->datos = json_decode($materia, true);
            $this->validar_datos();

        }

        private function validar_datos(){

            if ( empty( $this->datos['Codigo']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el codigo de la materia';

            }

            if ( empty( $this->datos['Materia']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre de la materia';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_materia();
            }
            else{
                $this->modificarMateria();
            }


        }

        private function almacenar_materia(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas("INSERT INTO materias (Codigo, Materia) VALUES(
                        '". $this->datos['codigo'] ."',
                        '". $this->datos['materia'] ."'
                    )");

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarMateria($valor=''){
            $this->db->consultas('SELECT materias.id_Materias, materias.Codigo, materias.Materia '.
                'FROM materias WHERE materias.Codigo like "%'.$valor.'%" or materias.Materia like "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarMateria($idMateria=''){
            $this->db->consultas("DELETE FROM materias WHERE id_Materias ='".$idMateria."'");
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarMateria(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas("UPDATE materias SET ".
                        "Codigo = '". $this->datos['Codigo']."',".
                        "Materia = '". $this->datos['Materia']."'".
                        "WHERE id_Materias = ". $this->datos['id_Materias']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>