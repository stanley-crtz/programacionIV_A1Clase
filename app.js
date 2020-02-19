document.addEventListener("DOMContentLoaded", e => {

    const form = document.querySelector("#frmConversores");

    form.addEventListener("submit",event => {

        event.preventDefault();

        let de = document.querySelector("#cboDe").value, 
            a = document.querySelector("#cboA").value,
            cantidad = document.querySelector("#txtCantidadConversor").value;

        let Monedas = {
            "dolar":1,
            "euro":0.93,
            "quetzal":7.63,
            "lempira":24.9,
            "cordoba":34.19
        };

        let $res = document.querySelector("#lblRespuesta");
        $res.innerHTML = `Respuesta: ` + (Monedas[a]/Monedas[de]*cantidad).toFixed(2);

    });

});

//