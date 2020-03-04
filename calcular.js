document.addEventListener("DOMContentLoaded", e => {

    const form = document.querySelector("#frmOperacion");

    form.addEventListener("submit", event => {

        event.preventDefault();
        
        let Opciones = document.querySelector("#Operacion").value;
        let Valores = document.querySelector("#txtDatos").value;

        fetch(`estadistico.php?Opcion=${Opciones}&Valores=${Valores}`)
            .then(resp=>resp.text())
            .then(respuesta=>{
                document.getElementById("lblRespuesta").innerHTML = respuesta;
            });

    });

});