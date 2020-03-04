<?php

if($_GET && isset($_GET['A']) && isset($_GET['DE']) && isset($_GET['Cantidad'])){
    $A = $_GET['A'];
    $DE = $_GET['DE'];
    $Cantidad = $_GET['Cantidad'];

    echo "El servidor a traido la respuesta de:".round((($A/$DE)*$Cantidad),2);


}else{
    header("location: index.html");
}

?>