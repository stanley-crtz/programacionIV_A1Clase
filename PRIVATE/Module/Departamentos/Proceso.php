<?php
 
    include('../../Config/Config.php');

    $Municipio = new Municipio($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Municipio->$proceso($_GET['Municipio']);
 
    print_r(json_encode($Municipio->respuesta));


    class Municipio{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Municipio){

            $this->datos = json_decode($Municipio, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del departamento';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Municipio();
            }
            else{
                $this->modificarMunicipio();
            }


        }

        private function almacenar_Municipio(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO departamento( departamento) VALUES ("'.$this->datos['Nombre'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarMunicipio($valor=''){
            $this->db->consultas('SELECT * FROM departamento WHERE departamento.departamento LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarMunicipio($idMunicipio=''){
            $this->db->consultas('DELETE FROM departamento WHERE departamento.id_numero_departamento = '. $idMunicipio);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarMunicipio(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE departamento SET departamento = "'.$this->datos['Nombre'].'" WHERE departamento.id_numero_departamento =  '.$this->datos['idMunicipio']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>