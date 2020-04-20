<?php
 
    include('../../Config/Config.php');

    $Puestos = new Puestos($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Puestos->$proceso($_GET['Puestos']);
 
    print_r(json_encode($Puestos->respuesta));


    class Puestos{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Puestos){

            $this->datos = json_decode($Puestos, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre del puesto a desempeñar';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Puestos();
            }
            else{
                $this->modificarPuestos();
            }


        }

        private function almacenar_Puestos(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO puesto( puesto) VALUES ("'.$this->datos['Nombre'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarPuestos($valor=''){
            $this->db->consultas('SELECT * FROM puesto WHERE puesto.puesto LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarPuestos($idPuestos=''){
            $this->db->consultas('DELETE FROM puesto WHERE puesto.id_puesto = '. $idPuestos);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarPuestos(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE puesto SET puesto = "'.$this->datos['Nombre'].'" WHERE puesto.id_puesto =  '.$this->datos['idPuestos']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>