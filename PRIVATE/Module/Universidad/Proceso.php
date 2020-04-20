<?php
 
    include('../../Config/Config.php');

    $Universidad = new Universidad($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Universidad->$proceso($_GET['Universidad']);
 
    print_r(json_encode($Universidad->respuesta));


    class Universidad{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Universidad){

            $this->datos = json_decode($Universidad, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre de la universidad asociada';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Universidad();
            }
            else{
                $this->modificarUniversidad();
            }


        }

        private function almacenar_Universidad(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO registro_universidad( universidad) VALUES ("'.$this->datos['Nombre'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarUniversidad($valor=''){
            $this->db->consultas('SELECT * FROM registro_universidad WHERE registro_universidad.universidad LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarUniversidad($idUniversidad=''){
            $this->db->consultas('DELETE FROM registro_universidad WHERE registro_universidad.id_universidad = '. $idUniversidad);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarUniversidad(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE registro_universidad SET universidad = "'.$this->datos['Nombre'].'" WHERE registro_universidad.id_universidad =  '.$this->datos['idUniversidad']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>