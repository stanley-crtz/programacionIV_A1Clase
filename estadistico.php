<?php

    if( $_GET && isset($_GET['Opcion']) && isset($_GET['Valores']) ){

        $Opcion = $_GET['Opcion'];
        $Valores = $_GET['Valores'];

        $array = explode(",",$Valores);

        switch($Opcion){
            case 'Media':
                echo Media($array);
                break;
            case 'des_Estandar':
                echo Des_Estandar($array);
                break;
            case 'des_Tipica':
                echo Des_Tipica($array);
                break;
            case 'Moda':
                echo Moda($array);
                break;
            case 'Mediana':
                echo Mediana($array);
                break;
            case 'Armonica':
                echo Armonica($array);
                break;
        }

    } else{

        header('location:index.html');

    }

    function Media($matriz){
        $suma = 0;
        $cont = 0;
        for ($i=0; $i < sizeof($matriz); $i++) { 

            $suma = $suma + intval($matriz["$i"]);
            $cont++;
        }

        $total = $suma / $cont;

        return $total;
    }

    function Des_Estandar($matriz){
        $media = Media($matriz);
        $cont = 0;
        $x_x = 0;
        $x_x2 = 0;
        for ($i=0; $i < sizeof($matriz); $i++) { 
            $x_x = $x_x + pow((intval($matriz["$i"])-$media),2);
            $cont++;
        }

        $x_x2 = sqrt(($x_x/($cont-1)));
        return round($x_x2,2);
    }

    function Des_Tipica($matriz){
        $media = Media($matriz);
        $cont = 0;
        $x_x = 0;
        $x_x2 = 0;
        for ($i=0; $i < sizeof($matriz); $i++) { 
            $x_x = $x_x + pow((intval($matriz["$i"])-$media),2);
            $cont++;
        }

        $x_x2 = sqrt(($x_x/($cont)));
        return round($x_x2,2);
    }

    function Moda($matriz){

        $cont = 0;
        $valor = 0;
        $repeticiones = 0;

        for ($i=0; $i < sizeof($matriz); $i++) { 

            for ($j=0; $j < sizeof($matriz); $j++) { 

                if($matriz["$i"] == $matriz["$j"]){
                    $cont++;
                }

                if($cont > $repeticiones){

                    $repeticiones = $cont;
                    $valor = $matriz["$i"];
                }
            }
            $cont = 0;
        }

        return $valor;
    }

    function Mediana($matriz){

        $valorTemporal = 0;
        $Size = sizeof($matriz)-1;

        for ($i=0; $i < $Size; $i++) { 
            
            for ($j=0; $j < $Size; $j++) { 

                $jM = $j + 1;

                if($matriz["$j"] > $matriz["$jM"]){

                    $valorTemporal = $matriz["$j"];

                    $matriz["$j"] = $matriz["$jM"];

                    $matriz["$jM"] = $valorTemporal;

                }

            }
        }

        $registros = number_format((sizeof($matriz))/2,0)-1;

        return $matriz["$registros"];
        
    }

    function Armonica($matriz){

        $sumas = 0;
        for ($i=0; $i < sizeof($matriz); $i++) { 
            
            $sumas = $sumas + ( 1 / intval($matriz["$i"]));
        }

        $total = number_format(sizeof($matriz) / number_format($sumas,2),2);

        return $total;
    }

?>