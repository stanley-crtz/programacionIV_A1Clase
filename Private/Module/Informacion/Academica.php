<?php
 
    include('../../Config/Config.php');

    $RegistrarUsuario = new RegistrarUsuario($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $RegistrarUsuario->$proceso($_GET['RegistrarUsuario']);
 
    print_r(json_encode($RegistrarUsuario->respuesta));


    class RegistrarUsuario{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($RegistrarUsuario){

            $this->datos = json_decode($RegistrarUsuario, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_RegistrarUsuario();
            }
            elseif( $this->datos['accion'] == 'login'){
                $this->validarUsuario();
            }
            else{
                $this->modificarRegistrarUsuario();
            }


        }

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {
                    
                    $ruta = "file:///home/stanley/Imágenes/".$this->datos['Titulo'];
                    
                    $data = fopen($ruta, 'rb');

                    $size = filesize ($ruta);

                    $contents = fread ($data, $size);

                    fclose ($data);

                    $encoded = base64_encode($contents);

                    $this->db->consultas('INSERT INTO imformacion_academica( id_perfil, id_universidad, id_carrera, titulo_universitario, CUM) VALUES ('.$this->datos['IdPerfil'].', '.$this->datos['Universidad'].', '.$this->datos['Carrera'].', "'.$encoded.'", '.$this->datos['CUM'].')');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }

        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT imformacion_academica.id_academica as idInformacion, registro_universidad.universidad as Universidad, registro_de_carrera.carrera as Carrera, imformacion_academica.titulo_universitario as Titulo, imformacion_academica.CUM as CUM FROM imformacion_academica, registro_universidad, registro_de_carrera WHERE imformacion_academica.id_universidad = registro_universidad.id_universidad AND imformacion_academica.id_carrera = registro_de_carrera.id_carrera AND imformacion_academica.id_perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }

        public function traer_para_vselect(){

            $this->db->consultas('SELECT * FROM registro_universidad ORDER BY registro_universidad.universidad ASC');
            $Universidad = $this->db->obtener_data();

            $imprimirUniversidad = [];
            $imprimirUniversidadIDs = [];

            for ($i=0; $i < count($Universidad); $i++) { 
                $imprimirUniversidadIDs[] = $Universidad[$i]['id_universidad'];
                $imprimirUniversidad[] = $Universidad[$i]['universidad'];
            }

            $this->db->consultas('SELECT * FROM Categoria_Docente');
            $CateDocente = $this->db->obtener_data();

            $imprimirCateDocente = [];
            $imprimirCateDocenteIDs = [];

            for ($i=0; $i < count($CateDocente); $i++) { 
                $imprimirCateDocenteIDs[] = $CateDocente[$i]['id_Categoria_Docente'];
                $imprimirCateDocente[] = $CateDocente[$i]['Categoria_Docente'];
            }

            $this->db->consultas('SELECT * FROM Nivel_Docente');
            $NivelDocente = $this->db->obtener_data();

            $imprimirNivelDocente = [];
            $imprimirNivelDocenteIDs = [];

            for ($i=0; $i < count($NivelDocente); $i++) { 
                $imprimirNivelDocenteIDs[] = $NivelDocente[$i]['id_Nivel_Docente'];
                $imprimirNivelDocente[] = $NivelDocente[$i]['Nivel_Docente'];
            }

            $this->db->consultas('SELECT registro_de_carrera.carrera, registro_de_carrera.id_carrera FROM `registro_de_carrera` GROUP BY registro_de_carrera.carrera');
            $OthersCarreras = $this->db->obtener_data();

            $imprimirOthersCarreras = [];
            $imprimirOthersCarrerasIDs = [];

            for ($i=0; $i < count($OthersCarreras); $i++) { 
                $imprimirOthersCarrerasIDs[] = $OthersCarreras[$i]['id_carrera'];
                $imprimirOthersCarreras[] = $OthersCarreras[$i]['carrera'];
            }


            return $this->respuesta = ['Universidad'=>["Universidad" => $imprimirUniversidad, "UniversidadID" => $imprimirUniversidadIDs], "CategoriaDocente" => ["Categoria" => $imprimirCateDocente, "CategoriaDocenteId" => $imprimirCateDocenteIDs], "NivelDocente" => ["NivelDocente" => $imprimirNivelDocente, "NivelDocenteId" => $imprimirNivelDocenteIDs], "OthersCarreras" => ["Carrera" => $imprimirOthersCarreras, "CarreraId" => $imprimirOthersCarrerasIDs]];//array de php en v7+
        }

        public function traer_para_vselect_Carreras ($id = ''){

            $this->db->consultas('SELECT * FROM registro_de_carrera WHERE registro_de_carrera.id_universidad = '. $id);
            $Carrera = $this->db->obtener_data();

            $ImprimirCarrera = [];
            $ImprimirCarreraIDs = [];

            for ($i=0; $i < count($Carrera); $i++) { 
                $ImprimirCarrera[] = $Carrera[$i]['carrera'];
                $ImprimirCarreraIDs[] = $Carrera[$i]['id_carrera'];
            }

            return $this->respuesta = ['Carrera'=>["Carrera" => $ImprimirCarrera, "CarreraID" => $ImprimirCarreraIDs]];
        }


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    if (empty($this->datos['Titulo'])) {
                        

                        $this->db->consultas('UPDATE imformacion_academica SET  id_universidad = '.$this->datos['Universidad'].', id_carrera = '.$this->datos['Carrera'].', CUM = '.$this->datos['CUM'].' WHERE imformacion_academica.id_academica = '.$this->datos['idInformacion']);

                        $this->respuesta['msg'] = 'Registro modificado correctamente';
                    } else {

                        $ruta = "file:///home/stanley/Imágenes/".$this->datos['Titulo'];
                    
                        $data = fopen($ruta, 'rb');

                        $size = filesize ($ruta);

                        $contents = fread ($data, $size);

                        fclose ($data);

                        $encoded = base64_encode($contents);

                        $this->db->consultas('UPDATE imformacion_academica SET  id_universidad = '.$this->datos['Universidad'].', id_carrera = '.$this->datos['Carrera'].', titulo_universitario = "'.$encoded.'", CUM = '.$this->datos['CUM'].' WHERE imformacion_academica.id_academica = '.$this->datos['idInformacion']);

                        $this->respuesta['msg'] = 'Registro modificado correctamente';

                    }

                }
                
            }
        }

    }

?>