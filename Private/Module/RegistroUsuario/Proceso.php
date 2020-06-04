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


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre';

            }

            if ( empty( $this->datos['Apellido']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el apellido';

            }

            if ( empty( $this->datos['Genero']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el genero';

            }

            if ( empty( $this->datos['Estatus']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el Estatus';

            }

            if ( empty( $this->datos['Fecha']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la Fecha';

            }

            if ( empty( $this->datos['DUI']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el DUI';

            }

            if ( empty( $this->datos['NIT']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el NIT';

            }

            if ( empty( $this->datos['Usuario']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el Usuario';

            }

            if ( empty( $this->datos['Password']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la contraseña';

            }

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

                    $this->db->consultas('INSERT INTO registro_cuenta_usuario( nombres_completos, apellidos_completo, id_genero, id_estatus, fecha_de_nacimiento, DUI, NIT, usuario, contraseña) VALUES ("'.$this->datos['Nombre'].'", "'.$this->datos['Apellido'].'", '.$this->datos['Genero'].', '.$this->datos['Estatus'].', "'.$this->datos['Fecha'].'", "'.$this->datos['DUI'].'", "'.$this->datos['NIT'].'", "'.$this->datos['Usuario'].'", "'.$this->datos['Password'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT perfil_de_usuario.id_perfil, perfil_de_usuario.Nombre, perfil_de_usuario.img, genero.genero, estatus.estatus, perfil_de_usuario.Fecha_Nacimiento, perfil_de_usuario.DUI, perfil_de_usuario.Usuario, perfil_de_usuario.Pass FROM perfil_de_usuario, genero, estatus WHERE genero.id_genero = perfil_de_usuario.id_genero AND perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.Nombre LIKE "%'.$valor.'%" ');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function buscarUsuarioMSGR ($valor =''){
            $this->db->consultas('SELECT registro_cuenta_usuario.msgR FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }

        public function buscarUsuarioMSGE ($valor =''){
            $this->db->consultas('SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.msgE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.nombres_completos LIKE "%'.$valor.'%" ORDER BY registro_cuenta_usuario.msgE DESC');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function buscarRegistrarUsuarioAvanzado($valor=''){
            $this->db->consultas('SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.apellidos_completo, genero.genero, estatus.estatus, registro_cuenta_usuario.fecha_de_nacimiento, registro_cuenta_usuario.DUI, registro_cuenta_usuario.NIT, registro_cuenta_usuario.usuario, registro_cuenta_usuario.contraseña FROM registro_cuenta_usuario,genero,estatus WHERE genero.id_genero = registro_cuenta_usuario.id_genero AND registro_cuenta_usuario.id_estatus = estatus.id_estatus AND registro_cuenta_usuario.nombres_completos LIKE "%'.$valor.'%" OR estatus.estatus LIKE "%'.$valor.'%" GROUP BY registro_cuenta_usuario.id_perfil');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function validarUsuario(){
            $this->db->consultas('SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.usuario = "'.$this->datos['Usuario'].'" AND registro_cuenta_usuario.contraseña = "'.$this->datos['Password'].'"');

            $Usuario = $this->db->obtener_data();

            // $imprimirUsuario = '';
            // $imprimirUsuarioId = '';

            // for ($i=0; $i < count($Usuario); $i++) { 
            //     $imprimirUsuario = $Usuario[$i]['nombres_completos'];
            //     $imprimirUsuarioId = $Usuario[$i]['id_perfil'];
            // }

            return $this->respuesta = ["nombre" => $Usuario, "cont" => count($Usuario)];
        }

        public function traer_para_vselect(){
            $this->db->consultas('SELECT * FROM estatus');
            $RegistrarUsuario = $this->db->obtener_data();
            $imprimirRegistrarUsuario = [];
            $imprimirRegistrarUsuarioIDs = [];
            for ($i=0; $i < count($RegistrarUsuario); $i++) { 
                $imprimirRegistrarUsuario[] = $RegistrarUsuario[$i]['estatus'];
                $imprimirRegistrarUsuarioIDs[] = $RegistrarUsuario[$i]['id_estatus'];
            }
            // echo json_encode($imprimirRegistrarUsuario);

            $this->db->consultas('SELECT * FROM genero');
            $Genero = $this->db->obtener_data();

            $ImprimirGenero = [];
            $ImprimirGeneroIDs = [];

            for ($i=0; $i < count($Genero); $i++) { 
                $ImprimirGenero[] = $Genero[$i]['genero'];
                $ImprimirGeneroIDs[] = $Genero[$i]['id_genero'];
            }
            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = ['Status'=>$imprimirRegistrarUsuario, 'StatusID'=>$imprimirRegistrarUsuarioIDs , 'Genero'=>$ImprimirGenero, 'IDRegistrarUsuario'=>$ImprimirGeneroIDs];//array de php en v7+
        }

        public function TraerUsuario($id='')
        {
            $this->db->consultas("SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.apellidos_completo, genero.genero, estatus.estatus, registro_cuenta_usuario.fecha_de_nacimiento, registro_cuenta_usuario.DUI, registro_cuenta_usuario.NIT, registro_cuenta_usuario.usuario, registro_cuenta_usuario.contraseña FROM registro_cuenta_usuario, genero, estatus WHERE registro_cuenta_usuario.id_genero = genero.id_genero AND registro_cuenta_usuario.id_estatus = estatus.id_estatus AND registro_cuenta_usuario.id_perfil = ".$id);

            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE registro_cuenta_usuario SET nombres_completos= "'.$this->datos['Nombre'].'",apellidos_completo= "'.$this->datos['Apellido'].'",id_genero= '.$this->datos['Genero'].',id_estatus= '.$this->datos['Estatus'].', fecha_de_nacimiento= "'.$this->datos['Fecha'].'", DUI= "'.$this->datos['DUI'].'", NIT= "'.$this->datos['NIT'].'",usuario= "'.$this->datos['Usuario'].'", contraseña= "'.$this->datos['Password'].'" WHERE registro_cuenta_usuario.id_perfil = '.$this->datos['idRegistrarUsuario']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

        public function EliminarSMGR($id = '')
        {
            $this->db->consultas('UPDATE registro_cuenta_usuario SET msgR= 0 WHERE registro_cuenta_usuario.id_perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

        public function EliminarSMGE($id = '')
        {
            $this->db->consultas('UPDATE registro_cuenta_usuario SET msgE = 0 WHERE registro_cuenta_usuario.id_perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

        public function AgregarSMGR($id = '')
        {
            $this->db->consultas('UPDATE registro_cuenta_usuario SET msgR= msgR + 1 WHERE registro_cuenta_usuario.id_perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

        public function AgregarSMGE($id = '')
        {
            $this->db->consultas('UPDATE registro_cuenta_usuario SET msgE = msgE + 1 WHERE registro_cuenta_usuario.id_perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

    }

?>