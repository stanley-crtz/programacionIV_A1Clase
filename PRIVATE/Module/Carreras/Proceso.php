<?php
 
    include('../../Config/Config.php');

    $Carreras = new Carreras($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $Carreras->$proceso($_GET['Carreras']);
 
    print_r(json_encode($Carreras->respuesta));


    class Carreras{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($Carreras){

            $this->datos = json_decode($Carreras, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre de la Carreras asociada';

            }

            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_Carreras();
            }
            else{
                $this->modificarCarreras();
            }


        }

        private function almacenar_Carreras(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO registro_de_carrera(id_universidad, carrera) VALUES ('.$this->datos['Universidad'].', "'.$this->datos['Nombre'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarCarreras($valor=''){
            $this->db->consultas('SELECT registro_de_carrera.id_carrera, registro_universidad.universidad, registro_de_carrera.carrera FROM registro_universidad, registro_de_carrera WHERE registro_de_carrera.id_universidad = registro_universidad.id_universidad AND registro_de_carrera.carrera LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarCarreras($idCarreras=''){
            $this->db->consultas('DELETE FROM registro_de_carrera WHERE registro_de_carrera.id_carrera = '. $idCarreras);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function traer_para_vselect(){
            $this->db->consultas('SELECT * FROM registro_universidad');
            $RegistrarUsuario = $this->db->obtener_data();
            $imprimirRegistrarUsuario = [];
            $imprimirRegistrarUsuarioIDs = [];
            for ($i=0; $i < count($RegistrarUsuario); $i++) { 
                $imprimirRegistrarUsuario[] = $RegistrarUsuario[$i]['universidad'];
                $imprimirRegistrarUsuarioIDs[] = $RegistrarUsuario[$i]['id_universidad'];
            }

            return $this->respuesta = ['Universidad'=>$imprimirRegistrarUsuario, 'UniversidadID'=>$imprimirRegistrarUsuarioIDs ];
        }

        public function modificarCarreras(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE registro_de_carrera SET id_universidad = '.$this->datos['Universidad'].',carrera = "'.$this->datos['Nombre'].'" WHERE registro_de_carrera.id_carrera = '.$this->datos['idCarreras']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>