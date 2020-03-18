<?php

    include('../Conexion/DB.php');
    $conexion = new DB('localhost','root','','db_academica');

    print_r($conexion);
    
?>